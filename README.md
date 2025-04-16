# MoveFlow App

A real estate investment analysis tool that helps investors evaluate properties and market conditions.

## Features

- ROI Calculator
- Market Analysis
- Property Comparables
- Neighborhood Insights

## Tech Stack

- Frontend: React.js with Vite
- Backend: Node.js with Express
- Styling: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd moveflow_app
```

2. Install dependencies:
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
```

3. Create a `.env` file in the root directory with your API keys:
```
MOVEFLOW_API_KEY=your_api_key_here
```

### Running the Application

1. Start the backend server:
```bash
npm run server
```

2. Start the frontend development server:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Project Structure

```
moveflow_app/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.jsx
│   └── package.json
├── server/           # Express backend
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 