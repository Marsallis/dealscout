import express from 'express';
import cors from 'cors';
import { fetch } from 'undici';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Get current directory (needed for ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend files from the "public" folder
app.use(express.static(path.join(__dirname, '../public')));

// Enable CORS
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://rvsxvt-8000.csb.app',
        'https://marsallis.github.io',
        'https://marsallis.github.io/dealscout',
        'https://dealscout.github.io'
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// ---------- Your existing routes below ----------

// POST /api/zillow
app.post('/api/zillow', async (req, res) => {
    const zillowLink = req.body.link;

    if (!zillowLink || !zillowLink.includes('zillow.com/homedetails/')) {
        return res.status(400).json({ 
            error: 'Invalid Zillow URL',
            details: 'Please provide a valid Zillow property URL'
        });
    }

    try {
        console.log('Sending request to Zapier with link:', zillowLink);
        
        const response = await fetch('https://hooks.zapier.com/hooks/catch/21003315/20bpgjt/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ link: zillowLink })
        });

        const responseText = await response.text();
        console.log('Raw Zapier response:', responseText);

        const urlMatch = responseText.match(/https:\/\/www\.zillow\.com\/[^"\s]*/);
        if (urlMatch && urlMatch[0]) {
            return res.json({ success: true, link: urlMatch[0], message: 'Comparable properties found successfully' });
        }

        try {
            const data = JSON.parse(responseText);
            const comparablesLink = data.link || data.Link || data.output?.link || data.data?.link;

            if (comparablesLink?.includes('zillow.com')) {
                return res.json({ success: true, link: comparablesLink, message: 'Comparable properties found successfully' });
            }

            if (data.status === 'success') {
                return res.json({ success: true, message: 'Request received and being processed', processing: true, requestId: data.id || data.request_id });
            }

            throw new Error('Could not find comparable properties URL in response');
        } catch (parseError) {
            console.error('Error parsing Zapier response:', parseError);
            return res.status(500).json({ error: 'Invalid response format', details: 'Could not extract comparable properties URL from the response' });
        }
    } catch (error) {
        console.error('Error forwarding request:', error);
        return res.status(500).json({ error: 'Error fetching comparable properties', details: error.message });
    }
});

// POST /api/market-analysis
app.post('/api/market-analysis', async (req, res) => {
    const { latitude, longitude, radius_miles } = req.body;

    if (!latitude || !longitude || !radius_miles) {
        return res.status(400).json({
            error: 'Missing required parameters',
            details: 'Please provide latitude, longitude, and radius_miles'
        });
    }

    if (!process.env.MOVEFLOW_API_KEY) {
        return res.status(500).json({
            error: 'Server configuration error',
            details: 'MoveFlow API key is not configured'
        });
    }

    try {
        console.log('Making request to MoveFlow API with:', {
            latitude,
            longitude,
            radius_miles,
            apiKey: process.env.MOVEFLOW_API_KEY.substring(0, 10) + '...' // Log partial key for security
        });

        const response = await fetch('https://api.moveflow.ai/neighborhood/insights', {
            method: 'POST',
            headers: {
                'X-API-Key': process.env.MOVEFLOW_API_KEY,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                radius_miles: parseFloat(radius_miles)
            })
        });

        console.log('API Response Status:', response.status);
        console.log('API Response Headers:', response.headers);

        const responseText = await response.text();
        console.log('API Response Body:', responseText);

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}: ${responseText}`);
        }

        try {
            const data = JSON.parse(responseText);
            res.json(data);
        } catch (parseError) {
            console.error('Error parsing API response:', parseError);
            throw new Error('Invalid JSON response from API');
        }
    } catch (error) {
        console.error('Error fetching market insights:', error);
        res.status(500).json({ error: 'Error fetching market insights', details: error.message });
    }
});

// GET /health
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
