import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { keyframes } from '@emotion/react';

// Modern color palette
const colors = {
  primary: '#6366f1', // Indigo
  secondary: '#8b5cf6', // Purple
  accent: '#ec4899', // Pink
  background: {
    light: '#f8fafc',
    main: '#f1f5f9',
    dark: '#e2e8f0'
  },
  text: {
    primary: '#1e293b',
    secondary: '#475569',
    light: '#94a3b8'
  }
};

// Animation keyframes
const shimmerAnimation = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${colors.text.secondary};
  text-align: center;
  margin-bottom: 3rem;
`;

const InputCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 24px;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.05),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  margin-bottom: 2rem;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${colors.text.primary};
  margin-bottom: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  border: 2px solid ${colors.background.dark};
  border-radius: 12px;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  &::placeholder {
    color: ${colors.text.light};
  }
`;

const LanguageSelect = styled.select`
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  border: 2px solid ${colors.background.dark};
  border-radius: 12px;
  background: white;
  color: ${colors.text.primary};
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const VoiceButton = styled(motion.button)`
  padding: 1rem;
  border: 2px solid ${colors.background.dark};
  border-radius: 12px;
  background: white;
  color: ${colors.text.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;

  &:hover {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: rotate(45deg);
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
    &::after {
      left: 100%;
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ResponseTable = styled(motion.table)`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.05),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
`;

const TableHeader = styled.th`
  padding: 1.5rem;
  text-align: left;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
`;

const TableCell = styled.td`
  padding: 1.5rem;
  border-bottom: 1px solid ${colors.background.dark};
  color: ${colors.text.primary};
  font-size: 1.1rem;
  line-height: 1.6;

  &:last-child {
    border-bottom: none;
  }
`;

const TableRow = styled.tr`
  &:hover {
    background: rgba(99, 102, 241, 0.05);
  }
`;

const LoadingSpinner = styled(motion.div)`
  width: 24px;
  height: 24px;
  border: 3px solid ${colors.background.dark};
  border-top-color: ${colors.primary};
  border-radius: 50%;
  margin-left: 1rem;
  display: inline-block;
`;

const AITeachingAssistant: React.FC = () => {
  const [concept, setConcept] = useState('');
  const [language, setLanguage] = useState('english');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{
    definition: string;
    examples: string[];
    misconceptions: string[];
    tips: string[];
    practiceQuestions: string[];
  } | null>(null);
  const [connectionStatus, setConnectionStatus] = useState('');
  const [debugInfo, setDebugInfo] = useState<string>('');

  const handleSubmit = async () => {
    if (!concept.trim()) return;

    // Clear any previous response and debug info
    setResponse(null);
    setDebugInfo('');
    setIsLoading(true);
    setConnectionStatus('Initializing connection to Gemini AI...');
    
    try {
      setConnectionStatus('Sending request to Gemini API...');
      console.log('Sending request to Gemini API with concept:', concept); // Debug log

      const GEMINI_API_KEY = 'AIzaSyDd4tDhNJMIO5SrbJ0c1gS8MKjjYGAsM7o';

      // Log the full request details
      const requestBody = {
        messages: [
          { 
            author: "system", 
            content: "You are a friendly AI tutor that explains concepts in a clear and structured way." 
          },
          { 
            author: "user", 
            content: `You are an AI teaching assistant. 
Generate a complete learning assistant output for the concept: "${concept}", in "${language}" language. 
Return a structured breakdown with the following sections:

1. **Definition** – A clear and concise explanation of the concept.
2. **Examples** – Give 3 relevant examples that help in understanding the concept.
3. **Common Misconceptions** – List at least 3 common mistakes or misunderstandings.
4. **Tips to Remember** – Provide 3 to 5 tips to master this concept easily.
5. **Practice Questions** – Generate 5 high-quality practice questions (MCQs or short answers) for the learner to test understanding.

The output must be well-organized and written in simple, clear language suitable for a student.

Respond in JSON format with these keys:
- definition (string)
- examples (array of strings)
- misconceptions (array of strings)
- tips (array of strings)
- practiceQuestions (array of strings)

Do not include any extra commentary outside the JSON.

Begin.`
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      };

      console.log('Request URL:', `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateMessage?key=${GEMINI_API_KEY}`);
      console.log('Request Body:', JSON.stringify(requestBody, null, 2));

      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateMessage?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        }
      );

      console.log('Response status:', geminiResponse.status); // Debug log
      console.log('Response headers:', Object.fromEntries(geminiResponse.headers.entries())); // Debug log
      
      if (!geminiResponse.ok) {
        const errorData = await geminiResponse.json();
        console.error('Gemini API Error Response:', errorData); // Debug log
        setDebugInfo(`Error: ${JSON.stringify(errorData, null, 2)}`);
        throw new Error(`Gemini API Error: ${errorData.error?.message || 'Unknown error'}`);
      }

      setConnectionStatus('Processing AI response...');
      console.log('Processing response...'); // Debug log

      const data = await geminiResponse.json();
      console.log('Raw API Response:', data); // Debug log
      setDebugInfo(`Raw Response: ${JSON.stringify(data, null, 2)}`);
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        console.error('Invalid response structure:', data); // Debug log
        throw new Error('Invalid response structure from Gemini API');
      }

      const responseText = data.candidates[0].content.parts[0].text;
      console.log('Response text before parsing:', responseText); // Debug log

      try {
        // Parse the response text as JSON
        const aiOutput = JSON.parse(responseText);
        console.log('Parsed AI output:', aiOutput); // Debug log
        
        // Validate the response structure
        if (!aiOutput.definition || !Array.isArray(aiOutput.examples) || 
            !Array.isArray(aiOutput.misconceptions) || !Array.isArray(aiOutput.tips) || 
            !Array.isArray(aiOutput.practiceQuestions)) {
          console.error('Invalid response structure:', aiOutput); // Debug log
          throw new Error('Invalid response structure from AI');
        }

        // Clear any cached data and set new response
        setResponse(null);
        setTimeout(() => {
          setResponse(aiOutput);
          setConnectionStatus('Response received successfully!');
          setTimeout(() => setConnectionStatus(''), 2000);
        }, 100);
      } catch (error: unknown) {
        console.error('Error parsing response:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown parsing error';
        setDebugInfo(`Parse Error: ${errorMessage}\nResponse Text: ${responseText}`);
        // Try to extract any JSON-like content from the response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            const extractedJson = JSON.parse(jsonMatch[0]);
            setResponse(null);
            setTimeout(() => {
              setResponse(extractedJson);
              setConnectionStatus('Response received (extracted JSON)');
              setTimeout(() => setConnectionStatus(''), 2000);
            }, 100);
          } catch (extractError: unknown) {
            console.error('Error extracting JSON:', extractError);
            const extractErrorMessage = extractError instanceof Error ? extractError.message : 'Unknown extraction error';
            setDebugInfo(`Extraction Error: ${extractErrorMessage}\nResponse Text: ${responseText}`);
            setResponse(null);
            setTimeout(() => {
              setResponse({
                definition: responseText,
                examples: [],
                misconceptions: [],
                tips: [],
                practiceQuestions: []
              });
              setConnectionStatus('Response received (text only)');
              setTimeout(() => setConnectionStatus(''), 2000);
            }, 100);
          }
        } else {
          setResponse(null);
          setTimeout(() => {
            setResponse({
              definition: responseText,
              examples: [],
              misconceptions: [],
              tips: [],
              practiceQuestions: []
            });
            setConnectionStatus('Response received (text only)');
            setTimeout(() => setConnectionStatus(''), 2000);
          }, 100);
        }
      }
    } catch (error: unknown) {
      console.error('Detailed error:', error); // Debug log
      setResponse(null);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to connect to Gemini AI. Please try again.';
      setConnectionStatus(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <SectionTitle>Teach Me the Concept</SectionTitle>
      <SectionSubtitle>Ask your doubt and let AI explain it in a simple way</SectionSubtitle>

      <InputCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <InputLabel>What concept do you want to understand?</InputLabel>
        <InputGroup>
          <TextInput
            type="text"
            placeholder="Type your concept here..."
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
          />
          <VoiceButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled
          >
            🎤 Speak
          </VoiceButton>
        </InputGroup>

        <InputLabel>Preferred Language</InputLabel>
        <LanguageSelect
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
          <option value="tamil">Tamil</option>
          <option value="telugu">Telugu</option>
        </LanguageSelect>

        <SubmitButton
          onClick={handleSubmit}
          disabled={!concept.trim() || isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Explain Simply
          {isLoading && (
            <LoadingSpinner
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
        </SubmitButton>
        
        {connectionStatus && (
          <div style={{ 
            textAlign: 'center', 
            marginTop: '1rem', 
            color: connectionStatus.includes('Error') ? '#ef4444' : colors.text.secondary,
            fontSize: '1rem',
            padding: '0.5rem',
            borderRadius: '8px',
            backgroundColor: connectionStatus.includes('Error') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)'
          }}>
            {connectionStatus}
          </div>
        )}

        {debugInfo && (
          <div style={{ 
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            fontSize: '0.875rem',
            color: colors.text.secondary,
            whiteSpace: 'pre-wrap',
            overflowX: 'auto'
          }}>
            <strong>Debug Info:</strong>
            <pre>{debugInfo}</pre>
          </div>
        )}
      </InputCard>

      <AnimatePresence>
        {response && (
          <ResponseTable
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <thead>
              <tr>
                <TableHeader>Category</TableHeader>
                <TableHeader>Explanation</TableHeader>
              </tr>
            </thead>
            <tbody>
              <TableRow>
                <TableCell>Definition</TableCell>
                <TableCell>{response.definition}</TableCell>
              </TableRow>
              {response.examples.length > 0 && (
                <TableRow>
                  <TableCell>Examples</TableCell>
                  <TableCell>
                    <ul>
                      {response.examples.map((example, index) => (
                        <li key={index}>{example}</li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              )}
              {response.misconceptions.length > 0 && (
                <TableRow>
                  <TableCell>Common Misconceptions</TableCell>
                  <TableCell>
                    <ul>
                      {response.misconceptions.map((misconception, index) => (
                        <li key={index}>{misconception}</li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              )}
              {response.tips.length > 0 && (
                <TableRow>
                  <TableCell>Tips for Understanding</TableCell>
                  <TableCell>
                    <ul>
                      {response.tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              )}
              {response.practiceQuestions.length > 0 && (
                <TableRow>
                  <TableCell>Practice Questions</TableCell>
                  <TableCell>
                    <ul>
                      {response.practiceQuestions.map((question, index) => (
                        <li key={index}>{question}</li>
                      ))}
                    </ul>
                  </TableCell>
                </TableRow>
              )}
            </tbody>
          </ResponseTable>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default AITeachingAssistant; 