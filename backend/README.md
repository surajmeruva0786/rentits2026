# 30-Second Student Load Backend

A minimal, stateless, production-ready backend API for calculating student workload.

## 🚀 Features

- **Stateless Architecture**: No database required, purely functional calculations.
- **Strict Validation**: Zod-based input validation for all requests.
- **Deterministic Scoring**: Consistent load scoring based on effort and urgency.
- **Production Ready**: Security headers, rate limiting, and CORS enabled.
- **TypeScript**: Fully typed codebase for reliability.

## 🛠️ Technology Stack

- **Runtime**: Node.js (LTS)
- **Framework**: Express.js
- **Language**: TypeScript
- **Validation**: Zod
- **Security**: Helmet, CORS, Express Rate Limit
- **Testing**: Jest

## 📦 Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Run in development mode with hot-reload
npm run dev
```

The server will start at `http://localhost:3000`.

### Building for Production

```bash
# Compile TypeScript to JavaScript
npm run build

# Start production server
npm start
```

## 📡 API Documentation

### Base URL

```
/api/v1
```

### Health Check

```http
GET /health
```

**Response:**
```json
{ "status": "ok" }
```

### Calculate Load

```http
POST /api/v1/calculate
```

**Request Body:**

```json
{
  "items": [
    {
      "title": "Data Structures Assignment",
      "dueInDays": 1,
      "effortLevel": "high"
    }
  ]
}
```

**Fields:**
- `title` (string): 3-60 characters
- `dueInDays` (number): 0-6 (0 = Today)
- `effortLevel` (string): "low" | "medium" | "high"
- Items list limited to max 20 items.

**Response:**

```json
{
  "totalEstimatedHours": 14,
  "loadScore": 31,
  "loadCategory": "light",
  "insightSentence": "You're operating within a sustainable workload.",
  "recommendedAction": {
    "ctaLabel": "Lock This Week",
    "description": "Avoid adding unnecessary commitments."
  }
}
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run tests with coverage report
npm run test:coverage
```

## 🐳 Docker Deployment

### Build Image

```bash
docker build -t student-load-backend .
```

### Run Container

```bash
docker run -p 3000:3000 -e PORT=3000 student-load-backend
```

## 🛡️ Security

This API implements:
- Helmet for secure HTTP headers
- Rate limiting (100 requests per 15 minutes per IP)
- CORS restrictions
- Request size limiting (10kb)
- Input sanitization via Zod

## 📝 License

MIT
