# EduThon: Empowering Parents to Guide Their Child’s Learning Journey with AI

EduThon is a transformative learning platform that reimagines how families approach education. Unlike traditional edtech tools, EduThon places parents at the heart of their child’s learning process. Here’s how it works:

- **Children Learn & Play:** Kids engage with interactive lessons, quizzes, and stories designed to make learning fun and memorable. As they progress, the platform intelligently tracks their performance, highlighting both strengths and areas needing improvement.

- **Insightful Analytics:** EduThon doesn’t just stop at scores. It pinpoints the exact concepts where a child struggles, providing a clear roadmap for targeted improvement.

- **Parents Learn First:** Instead of leaving parents in the dark, EduThon delivers AI-powered, easy-to-understand explanations and resources for the specific topics their child finds challenging. Parents can quickly master these concepts themselves, regardless of their own educational background.

- **Guided Teaching:** Armed with new knowledge, parents are empowered to teach and support their children more effectively, turning every challenge into a shared learning opportunity and strengthening the parent-child bond.

- **AI at the Core:** The platform leverages advanced AI (Google Gemini) to generate personalized explanations, tips, and learning materials in multiple languages, ensuring accessibility for diverse families.

EduThon is more than just a tool—it’s a movement towards collaborative, family-driven education, where technology bridges the gap between home and school, and every parent becomes their child’s best teacher.

---

## Backend Overview

This is the Python backend service for EduThon. It integrates with the Gemini AI API and provides a RESTful interface for the frontend to:
- Request concept explanations in various languages
- Retrieve key learning points and teaching tips
- Power the parent and child learning workflows

## Setup

1. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure API keys:**
   Create a `.env` file with your Gemini API key:
   ```
   GOOGLE_API_KEY=your_gemini_api_key_here
   ```

4. **Run the server:**
   ```bash
   python app.py
   ```
   The server will start on http://localhost:5000

## API Endpoints

### POST /api/explain
Get an AI-generated explanation for any concept, tailored to your preferred language.

**Request body:**
```json
{
  "topic": "string",
  "language": "string"
}
```

**Response:**
```json
{
  "explanation": "string",
  "keyPoints": ["string"],
  "tips": "string"
}
``` 