from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure Gemini API
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY', 'AIzaSyDd4tDhNJMIO5SrbJ0c1gS8MKjjYGAsM7o')
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize Gemini model
model = genai.GenerativeModel('gemini-pro')

@app.route('/api/explain', methods=['POST'])
def explain_concept():
    try:
        data = request.json
        topic = data.get('topic')
        language = data.get('language', 'english')

        prompt = f"""You are a friendly AI tutor. Explain the concept of {topic} in {language}. Focus on:
1. A clear definition
2. Key points to understand
3. Tips for teaching this concept

Respond in JSON format with these exact keys:
{{
  "explanation": "string",
  "keyPoints": ["string"],
  "tips": "string"
}}"""

        response = model.generate_content(prompt)
        
        # Parse the response text as JSON
        import json
        try:
            response_json = json.loads(response.text)
            return jsonify(response_json)
        except json.JSONDecodeError:
            return jsonify({
                "error": "Failed to parse AI response as JSON",
                "raw_response": response.text
            }), 500

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 