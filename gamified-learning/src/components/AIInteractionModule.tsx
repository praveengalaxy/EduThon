import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

interface WeakTopic {
  id: number;
  name: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
}

interface VideoSuggestion {
  id: number;
  title: string;
  thumbnail: string;
  language: string;
  duration: string;
  views: string;
  channel: string;
}

interface AIInteractionModuleProps {
  childName: string;
}

interface AIResponse {
  explanation: string;
  keyPoints: string[];
  tips: string;
}

// Add SpeechRecognition interface
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// Add new interfaces for YouTube
interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
}

interface YouTubeResponse {
  items: Array<{
    id: { videoId: string };
    snippet: {
      title: string;
      thumbnails: {
        high: { url: string };
      };
      channelTitle: string;
      publishedAt: string;
    };
  }>;
}

const Container = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const Title = styled.h2`
  color: #2d3748;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Comic Sans MS', cursive;
`;

const WeakTopicsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TopicCard = styled(motion.div)`
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LearnButton = styled.button`
  background: #4299e1;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;

  &:hover {
    background: #3182ce;
    transform: translateY(-2px);
  }
`;

const AIInputSection = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }
`;

const LanguageSelect = styled.select`
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
`;

const MicButton = styled.button<{ isListening: boolean }>`
  background: ${props => props.isListening ? '#e53e3e' : '#4299e1'};
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.isListening ? '#c53030' : '#3182ce'};
    transform: scale(1.05);
  }

  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  background: #48bb78;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background: #38a169;
    transform: translateY(-2px);
  }
`;

const DifficultyBadge = styled.span<{ difficulty: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${props => {
    switch (props.difficulty) {
      case 'Easy': return '#C6F6D5';
      case 'Medium': return '#FEEBC8';
      case 'Hard': return '#FED7D7';
      default: return '#E2E8F0';
    }
  }};
  color: ${props => {
    switch (props.difficulty) {
      case 'Easy': return '#2F855A';
      case 'Medium': return '#C05621';
      case 'Hard': return '#C53030';
      default: return '#4A5568';
    }
  }};
`;

const TopicDescription = styled.p`
  color: #718096;
  font-size: 0.875rem;
  margin: 0.5rem 0;
`;

const VideoInfo = styled.div`
  padding: 0.75rem;
  background: #F7FAFC;
  border-top: 1px solid #E2E8F0;
`;

const VideoMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #718096;
  font-size: 0.75rem;
  margin-top: 0.5rem;
`;

const ChannelName = styled.span`
  color: #4A5568;
  font-weight: 500;
`;

const AIResponse = styled.div`
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  font-size: 1rem;
  line-height: 1.6;

  h4 {
    color: #2D3748;
    margin: 0 0 1rem;
    font-size: 1.1rem;
  }

  p {
    margin: 0 0 1rem;
    color: #4A5568;
  }

  ul {
    margin: 0;
    padding-left: 1.5rem;
    color: #4A5568;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

const LoadingDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;

  span {
    width: 8px;
    height: 8px;
    background: #4299E1;
    border-radius: 50%;
    animation: bounce 0.5s infinite alternate;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  @keyframes bounce {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-4px);
    }
  }
`;

const VideoSuggestions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const VideoCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-4px);
  }
`;

const VideoThumbnail = styled.div`
  position: relative;
  padding-top: 56.25%; // 16:9 aspect ratio
  background: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const VideoTitle = styled.h3`
  padding: 1rem;
  font-size: 1rem;
  color: #2d3748;
  margin: 0;
`;

const YouTubeSection = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 12px;
`;

const RefreshButton = styled.button`
  background: #4299E1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: #3182CE;
  }

  &:disabled {
    background: #CBD5E0;
    cursor: not-allowed;
  }
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const VideoCardYouTube = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const VideoThumbnailYouTube = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const VideoInfoYouTube = styled.div`
  padding: 1rem;
`;

const VideoTitleYouTube = styled.h4`
  margin: 0;
  font-size: 1rem;
  color: #2d3748;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const VideoMetaYouTube = styled.div`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #718096;
`;

const VoiceControls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const VoiceSelect = styled.select`
  padding: 0.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
  min-width: 200px;
`;

const RateControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RateLabel = styled.span`
  font-size: 0.875rem;
  color: #4A5568;
`;

const RateInput = styled.input`
  width: 100px;
`;

const ReadAloudButton = styled(motion.button)`
  background: #4299E1;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  margin-bottom: 1rem;

  &:hover {
    background: #3182CE;
  }

  &:disabled {
    background: #CBD5E0;
    cursor: not-allowed;
  }

  span {
    font-size: 1.2rem;
  }
`;

const LanguageVoiceMap = {
  'english': ['en-US', 'en-GB'],
  'kannada': ['kn-IN'],
  'hindi': ['hi-IN'],
  'telugu': ['te-IN'],
  'tamil': ['ta-IN']
};

const AIInteractionModule: React.FC<AIInteractionModuleProps> = ({ childName }) => {
  const [selectedTopic, setSelectedTopic] = useState<WeakTopic | null>(null);
  const [question, setQuestion] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [showResponse, setShowResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAIResponse] = useState<AIResponse | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(false);
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [speechRate, setSpeechRate] = useState<number>(0.9);
  const [speechPitch, setSpeechPitch] = useState<number>(1);

  // Enhanced dummy data
  const weakTopics: WeakTopic[] = [
    {
      id: 1,
      name: 'Division',
      subject: 'Mathematics',
      difficulty: 'Medium',
      description: 'Understanding how to divide numbers into equal groups'
    },
    {
      id: 2,
      name: 'Phonics',
      subject: 'English',
      difficulty: 'Easy',
      description: 'Learning letter sounds and their combinations'
    },
    {
      id: 3,
      name: 'Fractions',
      subject: 'Mathematics',
      difficulty: 'Hard',
      description: 'Working with parts of a whole number'
    },
    {
      id: 4,
      name: 'Grammar',
      subject: 'English',
      difficulty: 'Medium',
      description: 'Understanding sentence structure and parts of speech'
    },
    {
      id: 5,
      name: 'Algebra',
      subject: 'Mathematics',
      difficulty: 'Hard',
      description: 'Solving equations with variables'
    }
  ];

  const videoSuggestions: VideoSuggestion[] = [
    {
      id: 1,
      title: 'Easy Division for Parents',
      thumbnail: 'https://via.placeholder.com/320x180',
      language: 'English',
      duration: '10:15',
      views: '1.2M views',
      channel: 'Math Made Easy'
    },
    {
      id: 2,
      title: 'Teaching Phonics at Home – Hindi Guide',
      thumbnail: 'https://via.placeholder.com/320x180',
      language: 'Hindi',
      duration: '15:30',
      views: '850K views',
      channel: 'Learn Hindi'
    },
    {
      id: 3,
      title: 'Understanding Fractions – Tamil Tutorial',
      thumbnail: 'https://via.placeholder.com/320x180',
      language: 'Tamil',
      duration: '12:45',
      views: '500K views',
      channel: 'Tamil Education'
    },
    {
      id: 4,
      title: 'Basic Grammar Rules – English',
      thumbnail: 'https://via.placeholder.com/320x180',
      language: 'English',
      duration: '8:20',
      views: '2.1M views',
      channel: 'English Learning'
    }
  ];

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuestion(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, []);

  // Initialize speech synthesis and voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      speechSynthesisRef.current = window.speechSynthesis;
      
      // Load voices
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Set default voice based on selected language
        const languageCodes = LanguageVoiceMap[selectedLanguage as keyof typeof LanguageVoiceMap] || ['en-US'];
        const preferredVoice = voices.find(voice => 
          languageCodes.some(code => voice.lang.includes(code)) ||
          (selectedLanguage === 'kannada' && voice.lang.includes('kn')) ||
          (selectedLanguage === 'english' && (voice.name.includes('Google') || voice.name.includes('Microsoft')))
        );
        
        if (preferredVoice) {
          setSelectedVoice(preferredVoice.name);
        }
      };

      // Chrome loads voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
      loadVoices();
    }
  }, [selectedLanguage]);

  const startListening = () => {
    if (recognition) {
      try {
        recognition.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setIsListening(false);
      }
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleTopicSelect = (topic: WeakTopic) => {
    setSelectedTopic(topic);
    setShowResponse(false);
    setQuestion('');
  };

  const getAIResponse = async (): Promise<AIResponse> => {
    try {
      const GEMINI_API_KEY = 'AIzaSyDd4tDhNJMIO5SrbJ0c1gS8MKjjYGAsM7o';

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a friendly AI tutor. The student is asking in ${selectedLanguage}: "${question}"

                Please provide a helpful response in ${selectedLanguage} using JSON format with these exact keys:
                {
                  "explanation": "A clear and detailed explanation of the concept in ${selectedLanguage}. If ${selectedLanguage} is Kannada, write in Kannada script (ಕನ್ನಡ).",
                  "keyPoints": ["List of important points to remember in ${selectedLanguage}. If ${selectedLanguage} is Kannada, write in Kannada script (ಕನ್ನಡ)."],
                  "tips": "Practical tips for understanding and teaching this concept in ${selectedLanguage}. If ${selectedLanguage} is Kannada, write in Kannada script (ಕನ್ನಡ)."
                }

                Important: If ${selectedLanguage} is Kannada:
                1. Use proper Kannada script (ಕನ್ನಡ)
                2. Use proper Kannada grammar and sentence structure
                3. Use Kannada words and expressions
                4. Ensure proper word spacing and punctuation
                5. Make it natural and easy to read in Kannada`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.8,
              maxOutputTokens: 1024,
            }
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`Failed to get AI response: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response structure');
      }

      const responseText = data.candidates[0].content.parts[0].text;
      try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No JSON found in response');
        }
        const parsedResponse = JSON.parse(jsonMatch[0]);
        if (!parsedResponse.explanation || !Array.isArray(parsedResponse.keyPoints) || !parsedResponse.tips) {
          throw new Error('Invalid response format');
        }
        return parsedResponse;
      } catch (parseError) {
        console.error('Failed to parse JSON response:', responseText);
        return {
          explanation: responseText,
          keyPoints: ["Please review the explanation above"],
          tips: "Try asking a more specific question if you need clarification"
        };
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      return {
        explanation: `Error getting response. Please try again.`,
        keyPoints: ["Please try again"],
        tips: "Please try again"
      };
    }
  };

  // Add YouTube search function
  const searchYouTubeVideos = async (query: string) => {
    try {
      setIsLoadingVideos(true);
      const YOUTUBE_API_KEY = 'AIzaSyDL28YpXiS4266hCGO8oxZWBFPXJyEMr54';
      
      // Add language to the search query
      const languageQuery = `${query} ${selectedLanguage} tutorial`;
      
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${encodeURIComponent(languageQuery)}&type=video&relevanceLanguage=${getLanguageCode(selectedLanguage)}&key=${YOUTUBE_API_KEY}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('YouTube API Error:', errorData);
        if (response.status === 403) {
          throw new Error('YouTube API access denied. Please check API key and enable YouTube Data API v3.');
        }
        throw new Error(`Failed to fetch YouTube videos: ${errorData.error?.message || 'Unknown error'}`);
      }

      const data: YouTubeResponse = await response.json();
      
      if (!data.items || data.items.length === 0) {
        setYoutubeVideos([]);
        return;
      }

      const videos = data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString()
      }));

      setYoutubeVideos(videos);
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      setYoutubeVideos([]);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch videos';
      setAIResponse(prev => prev ? {
        ...prev,
        tips: `${prev.tips}\n\nNote: ${errorMessage}`
      } : null);
    } finally {
      setIsLoadingVideos(false);
    }
  };

  // Add helper function to convert language names to YouTube language codes
  const getLanguageCode = (language: string): string => {
    const languageMap: { [key: string]: string } = {
      'english': 'en',
      'hindi': 'hi',
      'telugu': 'te',
      'tamil': 'ta',
      'kannada': 'kn'
    };
    return languageMap[language.toLowerCase()] || 'en';
  };

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    // Reset voice selection when language changes
    setSelectedVoice('');
  };

  const getContentInLanguage = async (content: string, targetLanguage: string): Promise<string> => {
    if (targetLanguage === 'english') return content;

    try {
      const GEMINI_API_KEY = 'AIzaSyDd4tDhNJMIO5SrbJ0c1gS8MKjjYGAsM7o';
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Translate the following text to ${targetLanguage}. 
                Important: 
                1. Use proper ${targetLanguage} script (e.g., ಕನ್ನಡ for Kannada)
                2. Keep the same meaning and structure
                3. Make it natural in ${targetLanguage}
                4. Ensure proper word spacing and punctuation
                5. Use proper ${targetLanguage} grammar

                Text to translate:
                ${content}`
              }]
            }],
            generationConfig: {
              temperature: 0.3,
              topK: 40,
              topP: 0.8,
              maxOutputTokens: 1024,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Translation error:', error);
      return content;
    }
  };

  const handleReadAloud = async () => {
    if (!speechSynthesisRef.current || !aiResponse) return;

    if (isSpeaking) {
      speechSynthesisRef.current.cancel();
      setIsSpeaking(false);
      return;
    }

    setIsLoading(true);

    try {
      // Combine all content for reading
      const contentToRead = `
        ${aiResponse.explanation}
        Key Points: ${aiResponse.keyPoints.join('. ')}
        Tips for Teaching: ${aiResponse.tips}
      `;

      // Create utterance with proper language settings
      const utterance = new SpeechSynthesisUtterance(contentToRead);
      utterance.rate = speechRate;
      utterance.pitch = speechPitch;
      utterance.volume = 1;

      // Set language and voice for Kannada
      if (selectedLanguage === 'kannada') {
        utterance.lang = 'kn-IN';
        
        // Try to find Kannada voice
        const kannadaVoice = availableVoices.find(voice => 
          voice.lang.includes('kn') || 
          voice.name.toLowerCase().includes('kannada') ||
          voice.name.toLowerCase().includes('google kannada')
        );

        if (kannadaVoice) {
          utterance.voice = kannadaVoice;
        } else {
          // Fallback: Try to find any Indian voice
          const indianVoice = availableVoices.find(voice => 
            voice.lang.includes('hi') || // Hindi
            voice.lang.includes('te') || // Telugu
            voice.lang.includes('ta')    // Tamil
          );
          
          if (indianVoice) {
            utterance.voice = indianVoice;
            console.log('Using fallback Indian voice:', indianVoice.name);
          } else {
            // If no Indian voice found, use default voice but keep Kannada language setting
            console.log('No Indian voice found, using default voice with Kannada language setting');
          }
        }
      } else {
        const languageCodes = LanguageVoiceMap[selectedLanguage as keyof typeof LanguageVoiceMap] || ['en-US'];
        utterance.lang = languageCodes[0];
        const voice = availableVoices.find(v => 
          v.name === selectedVoice || 
          languageCodes.some(code => v.lang.includes(code))
        );
        if (voice) {
          utterance.voice = voice;
        }
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsLoading(false);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsLoading(false);
      };
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsSpeaking(false);
        setIsLoading(false);
        // Show error message to user
        alert('Unable to read in Kannada. Please try using a different language or browser.');
      };

      speechSynthesisRef.current.speak(utterance);
    } catch (error) {
      console.error('Error in text-to-speech:', error);
      setIsLoading(false);
      setIsSpeaking(false);
      alert('Unable to read in Kannada. Please try using a different language or browser.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await getAIResponse();
      setAIResponse(response);
      setShowResponse(true);
      
      // Search for relevant YouTube videos using only the question
      await searchYouTubeVideos(question);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>Your Child's Weak Concepts</Title>
      <WeakTopicsGrid>
        {weakTopics.map((topic) => (
          <TopicCard
            key={topic.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div>
              <h3 style={{ margin: 0, color: '#2d3748' }}>{topic.name}</h3>
              <TopicDescription>{topic.description}</TopicDescription>
              <DifficultyBadge difficulty={topic.difficulty}>
                {topic.difficulty}
              </DifficultyBadge>
            </div>
            <LearnButton onClick={() => handleTopicSelect(topic)}>
              Learn This Topic
            </LearnButton>
          </TopicCard>
        ))}
      </WeakTopicsGrid>

      {selectedTopic && (
        <AIInputSection>
          <Title>Teach Yourself First – Ask AI</Title>
          <InputContainer>
            <TextInput
              type="text"
              placeholder={`Ask about ${selectedTopic.name}...`}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <LanguageSelect
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              <option value="english">English</option>
              <option value="kannada">ಕನ್ನಡ</option>
              <option value="hindi">हिंदी</option>
              <option value="telugu">తెలుగు</option>
              <option value="tamil">தமிழ்</option>
            </LanguageSelect>
            <MicButton
              onClick={isListening ? stopListening : startListening}
              isListening={isListening}
              disabled={!recognition}
            >
              <span role="img" aria-label="microphone">
                {isListening ? '🔴' : '🎤'}
              </span>
            </MicButton>
          </InputContainer>
          <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>

          <AnimatePresence>
            {isLoading && (
              <LoadingDots>
                <span></span>
                <span></span>
                <span></span>
              </LoadingDots>
            )}

            {showResponse && !isLoading && aiResponse && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <VoiceControls>
                  <LanguageSelect
                    value={selectedLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                  >
                    <option value="english">English</option>
                    <option value="kannada">ಕನ್ನಡ</option>
                    <option value="hindi">हिंदी</option>
                    <option value="telugu">తెలుగు</option>
                    <option value="tamil">தமிழ்</option>
                  </LanguageSelect>

                  <VoiceSelect
                    value={selectedVoice}
                    onChange={(e) => setSelectedVoice(e.target.value)}
                  >
                    <option value="">Select a voice</option>
                    {selectedLanguage === 'kannada' ? (
                      <>
                        {availableVoices
                          .filter(voice => 
                            voice.lang.includes('kn') || 
                            voice.name.toLowerCase().includes('kannada') ||
                            voice.name.toLowerCase().includes('google kannada') ||
                            voice.lang.includes('hi') || // Include Hindi voices as fallback
                            voice.lang.includes('te') || // Include Telugu voices as fallback
                            voice.lang.includes('ta')    // Include Tamil voices as fallback
                          )
                          .map((voice) => (
                            <option key={voice.name} value={voice.name}>
                              {voice.name} ({voice.lang}) {voice.lang.includes('kn') ? '(Kannada)' : '(Fallback)'}
                            </option>
                          ))}
                        {availableVoices.filter(voice => 
                          voice.lang.includes('kn') || 
                          voice.name.toLowerCase().includes('kannada')
                        ).length === 0 && (
                          <option value="" disabled>
                            No Kannada voices available. Will use fallback voices.
                          </option>
                        )}
                      </>
                    ) : (
                      availableVoices
                        .filter(voice => {
                          const languageCodes = LanguageVoiceMap[selectedLanguage as keyof typeof LanguageVoiceMap] || ['en-US'];
                          return languageCodes.some(code => voice.lang.includes(code));
                        })
                        .map((voice) => (
                          <option key={voice.name} value={voice.name}>
                            {voice.name} ({voice.lang})
                          </option>
                        ))
                    )}
                  </VoiceSelect>
                  
                  <RateControl>
                    <RateLabel>Speed:</RateLabel>
                    <RateInput
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={speechRate}
                      onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                    />
                    <RateLabel>{speechRate}x</RateLabel>
                  </RateControl>

                  <RateControl>
                    <RateLabel>Pitch:</RateLabel>
                    <RateInput
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={speechPitch}
                      onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
                    />
                    <RateLabel>{speechPitch}x</RateLabel>
                  </RateControl>
                </VoiceControls>

                <ReadAloudButton
                  onClick={handleReadAloud}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!aiResponse || isLoading}
                >
                  <span role="img" aria-label={isSpeaking ? 'stop' : 'speaker'}>
                    {isSpeaking ? '🔇' : '🔊'}
                  </span>
                  {isLoading ? 'Translating...' : isSpeaking ? 'Stop Reading' : 'Read Aloud'}
                </ReadAloudButton>

                <AIResponse>
                  <h4>Your Question: {question}</h4>
                  <p>{aiResponse.explanation}</p>
                  <h4>Key Points:</h4>
                  <ul>
                    {aiResponse.keyPoints.map((point: string, index: number) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                  <h4>Tips for Teaching:</h4>
                  <p>{aiResponse.tips}</p>
                </AIResponse>

                <YouTubeSection>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h4>Recommended Videos in {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)}</h4>
                    <RefreshButton 
                      onClick={() => searchYouTubeVideos(question)}
                      disabled={isLoadingVideos}
                    >
                      <span role="img" aria-label="refresh">🔄</span>
                      Refresh Videos
                    </RefreshButton>
                  </div>
                  {isLoadingVideos ? (
                    <LoadingDots>
                      <span></span>
                      <span></span>
                      <span></span>
                    </LoadingDots>
                  ) : youtubeVideos.length > 0 ? (
                    <VideoGrid>
                      {youtubeVideos.map((video) => (
                        <VideoCardYouTube
                          key={video.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <a
                            href={`https://www.youtube.com/watch?v=${video.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                          >
                            <VideoThumbnailYouTube src={video.thumbnail} alt={video.title} />
                            <VideoInfoYouTube>
                              <VideoTitleYouTube>{video.title}</VideoTitleYouTube>
                              <VideoMetaYouTube>
                                <div>{video.channelTitle}</div>
                                <div>{video.publishedAt}</div>
                              </VideoMetaYouTube>
                            </VideoInfoYouTube>
                          </a>
                        </VideoCardYouTube>
                      ))}
                    </VideoGrid>
                  ) : (
                    <p style={{ color: '#718096', textAlign: 'center', padding: '1rem' }}>
                      {isLoadingVideos ? 'Loading videos...' : `No ${selectedLanguage} videos found for your query. Try a different search or language.`}
                    </p>
                  )}
                </YouTubeSection>
              </motion.div>
            )}
          </AnimatePresence>
        </AIInputSection>
      )}
    </Container>
  );
};

export default AIInteractionModule; 