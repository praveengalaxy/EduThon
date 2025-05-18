import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { subjects } from '../data/questions';

// Types
interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  videoUrl: string;
  lesson?: number;
}

interface YouTubeResponseItem {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: {
      high: { url: string };
      medium: { url: string };
      default: { url: string };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

interface YouTubeResponse {
  items: Array<YouTubeResponseItem>;
}

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #e0f7fa 0%, #f3e5f5 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Hero = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
  h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
    font-family: 'Comic Sans MS', cursive;
  }
`;

const SelectionContainer = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #64b5f6;
  }
`;

const ContentContainer = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const VideoCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  position: relative;
  overflow: hidden;
`;

const VideoInfo = styled.div`
  padding: 1.5rem;
  h3 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  p {
    color: #7f8c8d;
    font-size: 0.9rem;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #2c3e50;
`;

interface LearningSectionProps {
  onStartQuiz: (subject: string, lesson: number) => void;
}

const LearningSection: React.FC<LearningSectionProps> = ({ onStartQuiz }) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedLesson, setSelectedLesson] = useState<number>(0);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState<boolean>(false);
  const [recommendedVideos, setRecommendedVideos] = useState<YouTubeVideo[]>([]);

  const fetchYouTubeVideos = async (subject: string, lesson: number) => {
    try {
      setIsLoadingVideos(true);
      const YOUTUBE_API_KEY = 'AIzaSyDL28YpXiS4266hCGO8oxZWBFPXJyEMr54';
      
      // Construct search query based on subject and lesson
      const searchQuery = `3rd grade ${subject} lesson ${lesson} educational video for kids`;
      
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=${encodeURIComponent(searchQuery)}&type=video&key=${YOUTUBE_API_KEY}&videoEmbeddable=true&videoDuration=short`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }

      const data: YouTubeResponse = await response.json();
      
      if (!data.items || data.items.length === 0) {
        return [];
      }

      return data.items.map(item => {
        const videoId = item.id.videoId;
        return {
          id: videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          channelTitle: item.snippet.channelTitle,
          publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
          videoUrl: `https://www.youtube.com/embed/${videoId}`
        };
      });
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      return [];
    } finally {
      setIsLoadingVideos(false);
    }
  };

  const fetchRecommendedVideos = async (subject: string) => {
    try {
      const YOUTUBE_API_KEY = 'AIzaSyDL28YpXiS4266hCGO8oxZWBFPXJyEMr54';
      
      // Fetch videos for both lesson 1 and 2
      const lesson1Query = `3rd grade ${subject} lesson 1 educational video for kids`;
      const lesson2Query = `3rd grade ${subject} lesson 2 educational video for kids`;
      
      const [lesson1Response, lesson2Response] = await Promise.all([
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(lesson1Query)}&type=video&key=${YOUTUBE_API_KEY}&videoEmbeddable=true&videoDuration=short`),
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(lesson2Query)}&type=video&key=${YOUTUBE_API_KEY}&videoEmbeddable=true&videoDuration=short`)
      ]);

      const [lesson1Data, lesson2Data] = await Promise.all([
        lesson1Response.json(),
        lesson2Response.json()
      ]);

      const videos = [
        ...(lesson1Data.items || []).map((item: YouTubeResponseItem) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          channelTitle: item.snippet.channelTitle,
          publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
          videoUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
          lesson: 1
        })),
        ...(lesson2Data.items || []).map((item: YouTubeResponseItem) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.high.url,
          channelTitle: item.snippet.channelTitle,
          publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
          videoUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
          lesson: 2
        }))
      ];

      return videos;
    } catch (error) {
      console.error('Error fetching recommended videos:', error);
      return [];
    }
  };

  const handleSubjectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subject = e.target.value;
    setSelectedSubject(subject);
    setSelectedLesson(0);
    setYoutubeVideos([]);
    
    if (subject) {
      const videos = await fetchRecommendedVideos(subject);
      setRecommendedVideos(videos);
    }
  };

  const handleLessonChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lessonNumber = Number(e.target.value);
    setSelectedLesson(lessonNumber);
    
    if (selectedSubject && lessonNumber) {
      const videos = await fetchYouTubeVideos(selectedSubject, lessonNumber);
      setYoutubeVideos(videos);
    }
  };

  return (
    <Container>
      <Hero
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Welcome to Smart Learning! 🎓</h1>
        <p>Learn it. Love it. Remember it!</p>
      </Hero>

      <SelectionContainer
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Select value={selectedSubject} onChange={handleSubjectChange}>
          <option value="">Select a Subject</option>
          {subjects.map(subject => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </Select>

        {selectedSubject && (
          <Select value={selectedLesson} onChange={handleLessonChange}>
            <option value="">Select a Lesson</option>
            {subjects
              .find(s => s.id === selectedSubject)
              ?.lessons.map(lesson => (
                <option key={lesson.id} value={lesson.id}>
                  Lesson {lesson.id}
                </option>
              ))}
          </Select>
        )}
      </SelectionContainer>

      {selectedSubject && recommendedVideos.length > 0 && (
        <ContentContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2c3e50' }}>
            Recommended Videos for {subjects.find(s => s.id === selectedSubject)?.name}
          </h2>
          <VideoGrid>
            {recommendedVideos.map((video, index) => (
              <VideoCard
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <VideoContainer>
                  <iframe
                    width="100%"
                    height="100%"
                    src={video.videoUrl}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </VideoContainer>
                <VideoInfo>
                  <h3>{video.title}</h3>
                  <p>Channel: {video.channelTitle}</p>
                  <p>Published: {video.publishedAt}</p>
                  <p style={{ color: '#64b5f6', fontWeight: 'bold' }}>Lesson {video.lesson}</p>
                </VideoInfo>
              </VideoCard>
            ))}
          </VideoGrid>
        </ContentContainer>
      )}

      {selectedSubject && selectedLesson && (
        <ContentContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isLoadingVideos ? (
            <LoadingSpinner>Loading videos...</LoadingSpinner>
          ) : (
            <VideoGrid>
              {youtubeVideos.map((video, index) => (
                <VideoCard
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <VideoContainer>
                    <iframe
                      width="100%"
                      height="100%"
                      src={video.videoUrl}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </VideoContainer>
                  <VideoInfo>
                    <h3>{video.title}</h3>
                    <p>Channel: {video.channelTitle}</p>
                    <p>Published: {video.publishedAt}</p>
                  </VideoInfo>
                </VideoCard>
              ))}
            </VideoGrid>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStartQuiz(selectedSubject, selectedLesson)}
            style={{
              padding: '1rem 2rem',
              background: '#64b5f6',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '2rem'
            }}
          >
            Start Quiz
          </motion.button>
        </ContentContainer>
      )}
    </Container>
  );
};

export default LearningSection; 