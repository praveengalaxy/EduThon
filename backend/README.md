# AI Teaching Assistant Backend

This is the Python backend service for the AI Teaching Assistant application. It handles the Gemini API integration and provides a REST API for the frontend.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a `.env` file:
```
GOOGLE_API_KEY=your_gemini_api_key_here
```

4. Run the server:
```bash
python app.py
```

The server will start on http://localhost:5000

## API Endpoints

### POST /api/explain
Explains a concept using Gemini AI.

Request body:
```json
{
  "topic": "string",
  "language": "string"
}
```

Response:
```json
{
  "explanation": "string",
  "keyPoints": ["string"],
  "tips": "string"
}
``` 