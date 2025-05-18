import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import AIInteractionModule from './AIInteractionModule';

// Types
interface Child {
  id: string;
  name: string;
  secretKey: string;
  latestScore: number;
  weakestConcepts: string[];
  avatar: string;
  age: number;
  totalQuizzes: number;
  averageScore: number;
  completedLessons: number;
  streak: number;
  subjectScores: {
    mathematics: number;
    english: number;
    science: number;
    social: number;
  };
  weeklyProgress: number[];
  settings: {
    notifications: boolean;
    weeklyReport: boolean;
    practiceReminders: boolean;
    progressTracking: boolean;
  };
}

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

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #e0f7fa 0%, #f3e5f5 100%);
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  font-family: 'Comic Sans MS', cursive;
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #2c3e50;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(100, 181, 246, 0.1);
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ParentName = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: #2c3e50;
`;

const ParentRole = styled.span`
  font-size: 0.875rem;
  color: #7f8c8d;
`;

const QuoteSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  padding: 2rem;
  margin: 2rem 0;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '"';
    position: absolute;
    top: -20px;
    left: 20px;
    font-size: 120px;
    color: rgba(255, 255, 255, 0.1);
    font-family: serif;
  }

  &::after {
    content: '"';
    position: absolute;
    bottom: -60px;
    right: 20px;
    font-size: 120px;
    color: rgba(255, 255, 255, 0.1);
    font-family: serif;
  }
`;

const QuoteText = styled.h2`
  font-size: 2rem;
  margin: 0;
  font-family: 'Noto Sans Kannada', sans-serif;
  line-height: 1.4;
`;

const QuoteTranslation = styled.p`
  font-size: 1.1rem;
  margin: 1rem 0 0;
  opacity: 0.9;
  font-style: italic;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-family: 'Comic Sans MS', cursive;
`;

const ChildrenGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ChildCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #64b5f6, #1976d2);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ChildAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, #64b5f6 0%, #1976d2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
`;

const ChildInfo = styled.div`
  text-align: left;
`;

const ChildName = styled.h3`
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ChildAge = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const ChildStats = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const ChildStat = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #666;
`;

const EnterButton = styled(motion.button)`
  background: #64b5f6;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #1976d2;
  }
`;

const AddChildCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #64b5f6, #1976d2);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }
`;

const AddIcon = styled.span`
  font-size: 2rem;
  color: #2c3e50;
`;

const AddText = styled.span`
  color: #2c3e50;
  font-size: 1rem;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
`;

const ModalTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Comic Sans MS', cursive;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #64b5f6;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled.button`
  background: #64b5f6;
  color: white;
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #1976d2;
  }
`;

const DashboardSection = styled(Section)`
  margin-top: 2rem;
`;

const DashboardCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const StatCard = styled.div`
  background: #F7FAFC;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2D3748;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #718096;
  font-size: 0.875rem;
`;

const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 8px;
  background: #E2E8F0;
  border-radius: 4px;
  margin-top: 0.5rem;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    width: ${props => props.progress}%;
    height: 100%;
    background: linear-gradient(90deg, #4299E1, #667EEA);
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? '#4299E1' : '#EDF2F7'};
  color: ${props => props.active ? 'white' : '#4A5568'};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#3182CE' : '#E2E8F0'};
  }
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const ChartTitle = styled.h3`
  color: #2D3748;
  margin: 0 0 1rem;
  font-size: 1.1rem;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
`;

const SubjectCard = styled.div`
  background: #F7FAFC;
  border-radius: 10px;
  padding: 1rem;
`;

const SubjectTitle = styled.h4`
  color: #2D3748;
  margin: 0 0 0.5rem;
  font-size: 1rem;
`;

const SubjectScore = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #4299E1;
`;

const SettingsSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #F7FAFC;
  border-radius: 8px;
`;

const SettingLabel = styled.span`
  color: #4A5568;
  font-weight: 500;
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #CBD5E0;
    transition: .4s;
    border-radius: 24px;

    &:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
  }

  input:checked + span {
    background-color: #4299E1;
  }

  input:checked + span:before {
    transform: translateX(26px);
  }
`;

const SecretKeyModal = styled(Modal)`
  // ... existing modal styles ...
`;

const SecretKeyInput = styled(Input)`
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const VideoSection = styled.section`
  margin: 2rem 0;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const VideoCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const VideoThumbnail = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const VideoInfo = styled.div`
  padding: 1rem;
`;

const VideoTitle = styled.h4`
  margin: 0;
  font-size: 1rem;
  color: #2d3748;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const VideoMeta = styled.div`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #718096;
`;

const LanguageSelector = styled.select`
  padding: 0.5rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  background: white;
  cursor: pointer;
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

const LoadingDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;

  span {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #4299E1;
    border-radius: 50%;
    margin: 0 4px;
    animation: blink 1.4s infinite both;

    @keyframes blink {
      0%, 80%, 100% {
        transform: scale(0.5);
      }
      40% {
        transform: scale(1);
      }
    }
  }
`;

const ParentHome: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [children, setChildren] = useState<Child[]>([
    {
      id: '1',
      name: 'Mourya',
      secretKey: '1234',
      latestScore: 85,
      weakestConcepts: ['Division', 'Phonics', 'Fractions'],
      avatar: '👶',
      age: 8,
      totalQuizzes: 15,
      averageScore: 78,
      completedLessons: 12,
      streak: 5,
      subjectScores: {
        mathematics: 82,
        english: 75,
        science: 88,
        social: 70
      },
      weeklyProgress: [65, 70, 75, 80, 85, 82, 85],
      settings: {
        notifications: true,
        weeklyReport: true,
        practiceReminders: true,
        progressTracking: true
      }
    },
    {
      id: '2',
      name: 'Pavan',
      secretKey: '5678',
      latestScore: 92,
      weakestConcepts: ['Grammar', 'Multiplication'],
      avatar: '👧',
      age: 9,
      totalQuizzes: 12,
      averageScore: 88,
      completedLessons: 15,
      streak: 7,
      subjectScores: {
        mathematics: 90,
        english: 85,
        science: 92,
        social: 88
      },
      weeklyProgress: [85, 88, 90, 92, 90, 88, 92],
      settings: {
        notifications: true,
        weeklyReport: true,
        practiceReminders: true,
        progressTracking: true
      }
    }
  ]);

  const [showAddChildModal, setShowAddChildModal] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildSecretKey, setNewChildSecretKey] = useState('');
  const [showSecretKeyModal, setShowSecretKeyModal] = useState(false);
  const [enteredSecretKey, setEnteredSecretKey] = useState('');
  const [secretKeyError, setSecretKeyError] = useState('');
  const [selectedChildForEntry, setSelectedChildForEntry] = useState<Child | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [parentVideos, setParentVideos] = useState<YouTubeVideo[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(false);
  const [quizResults, setQuizResults] = useState<any[]>([]);
  const [weakConcepts, setWeakConcepts] = useState<Record<string, string[]>>({});

  const allVideoTitles = [
    "How to Make Your Child Love Learning",
    "Evening Talks That Build Confidence",
    "Handling Temper Tantrums with Love",
    "Discipline Without Shouting",
    "Helping Kids Develop Daily Routines",
    "Getting Your Child Ready for School Every Morning",
    "Games That Teach Patience",
    "Boosting Morals Through Daily Habits"
  ];

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim() || !newChildSecretKey.trim()) {
      return;
    }
    const newChildData: Child = {
      id: Date.now().toString(),
      name: newChildName,
      secretKey: newChildSecretKey,
      latestScore: Math.floor(Math.random() * 100),
      weakestConcepts: ['Multiplication', 'Alphabets'].sort(() => Math.random() - 0.5),
      avatar: '👶',
      age: Math.floor(Math.random() * 10) + 5,
      totalQuizzes: 0,
      averageScore: 0,
      completedLessons: 0,
      streak: 0,
      subjectScores: {
        mathematics: 0,
        english: 0,
        science: 0,
        social: 0
      },
      weeklyProgress: [],
      settings: {
        notifications: true,
        weeklyReport: true,
        practiceReminders: true,
        progressTracking: true
      }
    };
    setChildren([...children, newChildData]);
    setShowAddChildModal(false);
    setNewChildName('');
    setNewChildSecretKey('');
  };

  const handleEnterLearning = (child: Child, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedChildForEntry(child);
    setEnteredSecretKey('');
    setSecretKeyError('');
    setShowSecretKeyModal(true);
  };

  const handleSecretKeySubmit = () => {
    if (!selectedChildForEntry) return;

    if (enteredSecretKey === selectedChildForEntry.secretKey) {
      setShowSecretKeyModal(false);
      navigate(`/student/${selectedChildForEntry.name}`);
    } else {
      setSecretKeyError('Invalid secret key. Please try again.');
    }
  };

  const handleRefreshVideos = () => {
    // Shuffle and take 4 random videos
    const shuffled = [...allVideoTitles].sort(() => 0.5 - Math.random());
    setParentVideos(shuffled.slice(0, 4).map(title => ({
      id: title,
      title: title,
      thumbnail: '',
      channelTitle: '',
      publishedAt: ''
    })));
  };

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

  const fetchParentVideos = async () => {
    try {
      setIsLoadingVideos(true);
      const YOUTUBE_API_KEY = 'AIzaSyDL28YpXiS4266hCGO8oxZWBFPXJyEMr54';
      
      const searchQuery = `parenting tips raising happy children ${selectedLanguage}`;
      
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${encodeURIComponent(searchQuery)}&type=video&relevanceLanguage=${getLanguageCode(selectedLanguage)}&key=${YOUTUBE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }

      const data: YouTubeResponse = await response.json();
      
      if (!data.items || data.items.length === 0) {
        setParentVideos([]);
        return;
      }

      const videos = data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString()
      }));

      setParentVideos(videos);
    } catch (error) {
      console.error('Error fetching parent videos:', error);
      setParentVideos([]);
    } finally {
      setIsLoadingVideos(false);
    }
  };

  useEffect(() => {
    fetchParentVideos();
  }, [selectedLanguage]);

  useEffect(() => {
    // Load quiz results and weak concepts from localStorage
    const storedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    const storedWeakConcepts = JSON.parse(localStorage.getItem('weakConcepts') || '{}');
    setQuizResults(storedResults);
    setWeakConcepts(storedWeakConcepts);

    // Update children's data with latest quiz results
    const updatedChildren = children.map(child => {
      const childResults = storedResults.filter((result: any) => result.childName === child.name);
      
      if (childResults.length > 0) {
        // Calculate average score from all results
        const totalScore = childResults.reduce((sum: number, result: any) => sum + result.score, 0);
        const averageScore = Math.round(totalScore / childResults.length);

        // Update subject scores
        const updatedSubjectScores = { ...child.subjectScores };
        const latestResult = childResults[childResults.length - 1];
        
        if (latestResult.subject) {
          const subject = latestResult.subject.toLowerCase() as keyof typeof updatedSubjectScores;
          if (subject in updatedSubjectScores) {
            updatedSubjectScores[subject] = latestResult.score;
          }
        }

        // Analyze weak concepts from all quiz results
        const conceptPerformance: Record<string, { total: number; correct: number }> = {};
        
        childResults.forEach((result: any) => {
          if (result.conceptPerformance) {
            result.conceptPerformance.forEach((concept: any) => {
              if (!conceptPerformance[concept.concept]) {
                conceptPerformance[concept.concept] = { total: 0, correct: 0 };
              }
              conceptPerformance[concept.concept].total += 1;
              if (concept.status !== 'Weak') {
                conceptPerformance[concept.concept].correct += 1;
              }
            });
          }
        });

        // Calculate weak concepts based on overall performance
        const weakConcepts = Object.entries(conceptPerformance)
          .filter(([_, stats]) => {
            const percentage = (stats.correct / stats.total) * 100;
            return percentage < 40; // Consider concepts with less than 40% success rate as weak
          })
          .map(([concept]) => concept);

        // If no weak concepts found in quiz results, use stored weak concepts
        const finalWeakConcepts = weakConcepts.length > 0 
          ? weakConcepts 
          : storedWeakConcepts[child.name] || [];

        return {
          ...child,
          latestScore: latestResult.score,
          totalQuizzes: childResults.length,
          averageScore: averageScore,
          subjectScores: updatedSubjectScores,
          weakestConcepts: finalWeakConcepts
        };
      }
      return child;
    });

    setChildren(updatedChildren);
  }, []);

  const selectedChildData = selectedChild 
    ? children.find(child => child.id === selectedChild)
    : null;

  return (
    <Container>
      <Header>
        <Title>Parent Dashboard</Title>
        <ProfileButton>
          <ProfileInfo>
            <ParentName>Praveen</ParentName>
            <ParentRole>Parent</ParentRole>
          </ProfileInfo>
          <span role="img" aria-label="profile">
            👤
          </span>
        </ProfileButton>
      </Header>

      <QuoteSection>
        <QuoteText>ಗಿಡವಾಗಿ ಬಗ್ಗದ್ದು ಮರವಾಗಿ ಬಗ್ಗೀತೇ</QuoteText>
        <QuoteTranslation>What bends as a sapling will bend as a tree</QuoteTranslation>
      </QuoteSection>

      <Section>
        <SectionTitle>Your Children</SectionTitle>
        <ChildrenGrid>
          {children.map((child) => (
            <ChildCard
              key={child.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedChild(child.id)}
              style={{
                border: selectedChild === child.id ? '2px solid #64b5f6' : 'none'
              }}
            >
              <ChildAvatar>
                <span role="img" aria-label="child">
                  {child.avatar}
                </span>
              </ChildAvatar>
              <ChildInfo>
                <ChildName>{child.name}</ChildName>
                <ChildAge>{child.age} years old</ChildAge>
              </ChildInfo>
              <ChildStats>
                <ChildStat>
                  <span>Latest Score</span>
                  <span>{child.latestScore}%</span>
                </ChildStat>
                <ChildStat>
                  <span>Streak</span>
                  <span>{child.streak} days</span>
                </ChildStat>
              </ChildStats>
              <EnterButton 
                onClick={(e) => handleEnterLearning(child, e)}
              >
                Enter Learning
              </EnterButton>
            </ChildCard>
          ))}
          <AddChildCard
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddChildModal(true)}
          >
            <AddIcon>+</AddIcon>
            <AddText>Add New Child</AddText>
          </AddChildCard>
        </ChildrenGrid>
      </Section>

      {selectedChildData && (
        <>
          <TabsContainer>
            <Tab 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </Tab>
            <Tab 
              active={activeTab === 'progress'} 
              onClick={() => setActiveTab('progress')}
            >
              Progress
            </Tab>
            <Tab 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </Tab>
          </TabsContainer>

          {activeTab === 'dashboard' && (
            <DashboardSection>
              <SectionTitle>Performance Dashboard</SectionTitle>
              <StatsGrid>
                <StatCard>
                  <StatValue>{selectedChildData.totalQuizzes}</StatValue>
                  <StatLabel>Total Quizzes</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{selectedChildData.averageScore}%</StatValue>
                  <StatLabel>Average Score</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{selectedChildData.completedLessons}</StatValue>
                  <StatLabel>Completed Lessons</StatLabel>
                </StatCard>
                <StatCard>
                  <StatValue>{selectedChildData.streak} days</StatValue>
                  <StatLabel>Learning Streak</StatLabel>
                </StatCard>
              </StatsGrid>

              <ChartContainer>
                <ChartTitle>Subject-wise Performance</ChartTitle>
                <ChartGrid>
                  {Object.entries(selectedChildData.subjectScores).map(([subject, score]) => (
                    <SubjectCard key={subject}>
                      <SubjectTitle>{subject.charAt(0).toUpperCase() + subject.slice(1)}</SubjectTitle>
                      <SubjectScore>{score}%</SubjectScore>
                      <ProgressBar progress={score} />
                    </SubjectCard>
                  ))}
                </ChartGrid>
              </ChartContainer>

              {selectedChildData.weakestConcepts.length > 0 && (
                <ChartContainer>
                  <ChartTitle>Areas Needing Attention</ChartTitle>
                  <div style={{ padding: '1rem' }}>
                    <p style={{ color: '#4A5568', marginBottom: '1rem' }}>
                      Based on {selectedChildData.name}'s quiz performance, these concepts need more practice:
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {selectedChildData.weakestConcepts.map((concept: string) => (
                        <span
                          key={concept}
                          style={{
                            background: '#FED7D7',
                            color: '#C53030',
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.875rem',
                            fontWeight: '500'
                          }}
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                    <div style={{ marginTop: '1rem', padding: '1rem', background: '#EBF8FF', borderRadius: '8px' }}>
                      <h4 style={{ color: '#2B6CB0', marginBottom: '0.5rem' }}>Recommended Actions:</h4>
                      <ul style={{ color: '#4A5568', margin: 0, paddingLeft: '1.5rem' }}>
                        <li>Review these concepts with your child regularly</li>
                        <li>Watch educational videos together on these topics</li>
                        <li>Practice with interactive exercises daily</li>
                        <li>Set up regular practice sessions (15-20 minutes daily)</li>
                        <li>Track progress and celebrate improvements</li>
                      </ul>
                    </div>
                  </div>
                </ChartContainer>
              )}
            </DashboardSection>
          )}

          {activeTab === 'progress' && (
            <DashboardSection>
              <SectionTitle>Learning Progress</SectionTitle>
              <ChartContainer>
                <ChartTitle>Weekly Progress</ChartTitle>
                <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
                  {selectedChildData.weeklyProgress.map((score, index) => (
                    <div
                      key={index}
                      style={{
                        flex: 1,
                        height: `${score}%`,
                        background: 'linear-gradient(180deg, #4299E1, #667EEA)',
                        borderRadius: '4px 4px 0 0',
                        position: 'relative'
                      }}
                    >
                      <div style={{
                        position: 'absolute',
                        top: '-25px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: '#4A5568',
                        fontSize: '0.875rem'
                      }}>
                        {score}%
                      </div>
                    </div>
                  ))}
                </div>
              </ChartContainer>
            </DashboardSection>
          )}

          {activeTab === 'settings' && (
            <SettingsSection>
              <SectionTitle>Profile Settings</SectionTitle>
              <SettingsGrid>
                <SettingItem>
                  <SettingLabel>Progress Notifications</SettingLabel>
                  <Toggle>
                    <input
                      type="checkbox"
                      checked={selectedChildData.settings.notifications}
                      onChange={(e) => {
                        const updatedChildren = children.map(child => 
                          child.id === selectedChildData.id 
                            ? {
                                ...child,
                                settings: {
                                  ...child.settings,
                                  notifications: e.target.checked
                                }
                              }
                            : child
                        );
                        setChildren(updatedChildren);
                      }}
                    />
                    <span></span>
                  </Toggle>
                </SettingItem>
                <SettingItem>
                  <SettingLabel>Weekly Progress Report</SettingLabel>
                  <Toggle>
                    <input
                      type="checkbox"
                      checked={selectedChildData.settings.weeklyReport}
                      onChange={(e) => {
                        const updatedChildren = children.map(child => 
                          child.id === selectedChildData.id 
                            ? {
                                ...child,
                                settings: {
                                  ...child.settings,
                                  weeklyReport: e.target.checked
                                }
                              }
                            : child
                        );
                        setChildren(updatedChildren);
                      }}
                    />
                    <span></span>
                  </Toggle>
                </SettingItem>
                <SettingItem>
                  <SettingLabel>Practice Reminders</SettingLabel>
                  <Toggle>
                    <input
                      type="checkbox"
                      checked={selectedChildData.settings.practiceReminders}
                      onChange={(e) => {
                        const updatedChildren = children.map(child => 
                          child.id === selectedChildData.id 
                            ? {
                                ...child,
                                settings: {
                                  ...child.settings,
                                  practiceReminders: e.target.checked
                                }
                              }
                            : child
                        );
                        setChildren(updatedChildren);
                      }}
                    />
                    <span></span>
                  </Toggle>
                </SettingItem>
                <SettingItem>
                  <SettingLabel>Progress Tracking</SettingLabel>
                  <Toggle>
                    <input
                      type="checkbox"
                      checked={selectedChildData.settings.progressTracking}
                      onChange={(e) => {
                        const updatedChildren = children.map(child => 
                          child.id === selectedChildData.id 
                            ? {
                                ...child,
                                settings: {
                                  ...child.settings,
                                  progressTracking: e.target.checked
                                }
                              }
                            : child
                        );
                        setChildren(updatedChildren);
                      }}
                    />
                    <span></span>
                  </Toggle>
                </SettingItem>
              </SettingsGrid>
            </SettingsSection>
          )}

          <VideoSection>
            <SectionTitle>Want to Raise a Strong & Happy Child? Start Learning</SectionTitle>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <LanguageSelector
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="telugu">Telugu</option>
                <option value="tamil">Tamil</option>
                <option value="kannada">Kannada</option>
              </LanguageSelector>
              <RefreshButton 
                onClick={fetchParentVideos}
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
            ) : parentVideos.length > 0 ? (
              <VideoGrid>
                {parentVideos.map((video) => (
                  <VideoCard
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
                      <VideoThumbnail src={video.thumbnail} alt={video.title} />
                      <VideoInfo>
                        <VideoTitle>{video.title}</VideoTitle>
                        <VideoMeta>
                          <div>{video.channelTitle}</div>
                          <div>{video.publishedAt}</div>
                        </VideoMeta>
                      </VideoInfo>
                    </a>
                  </VideoCard>
                ))}
              </VideoGrid>
            ) : (
              <p style={{ color: '#718096', textAlign: 'center', padding: '1rem' }}>
                {isLoadingVideos ? 'Loading videos...' : `No ${selectedLanguage} videos found. Try a different language.`}
              </p>
            )}
          </VideoSection>

          <AIInteractionModule childName={selectedChildData.name} />
        </>
      )}

      <AnimatePresence>
        {showSecretKeyModal && (
          <SecretKeyModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <ModalTitle>Enter Secret Key</ModalTitle>
              <p style={{ marginBottom: '1rem', color: '#4A5568' }}>
                Please enter the secret key for {selectedChildForEntry?.name} to access the learning section.
              </p>
              <SecretKeyInput
                type="password"
                placeholder="Enter Secret Key"
                value={enteredSecretKey}
                onChange={(e) => {
                  setEnteredSecretKey(e.target.value);
                  setSecretKeyError('');
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSecretKeySubmit();
                  }
                }}
              />
              {secretKeyError && <ErrorMessage>{secretKeyError}</ErrorMessage>}
              <ButtonGroup>
                <Button onClick={handleSecretKeySubmit}>Enter</Button>
                <Button onClick={() => setShowSecretKeyModal(false)}>Cancel</Button>
              </ButtonGroup>
            </ModalContent>
          </SecretKeyModal>
        )}

        {showAddChildModal && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <ModalTitle>Add New Child</ModalTitle>
              <Input
                type="text"
                placeholder="Child's Name"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Secret Key (for child to enter)"
                value={newChildSecretKey}
                onChange={(e) => setNewChildSecretKey(e.target.value)}
              />
              <ButtonGroup>
                <Button onClick={handleAddChild}>Add Child</Button>
                <Button onClick={() => setShowAddChildModal(false)}>Cancel</Button>
              </ButtonGroup>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default ParentHome; 