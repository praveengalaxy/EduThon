import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

// Create motion components using the correct syntax
const MotionButton = motion.button;
const MotionDiv = motion.div;

// Types
interface Story {
  id: number;
  title: string;
  videoUrl: string;
  category: 'Honesty' | 'Kindness' | 'Courage' | 'Respect' | 'Friendship' | 'Perseverance' | 'Gratitude';
  description: string;
  ageGroup: '3-6' | '7-12' | '13+';
  duration: string;
  learningSection?: string;
}

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  videoUrl: string;
}

interface YouTubeResponse {
  items: Array<{
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
  }>;
}

// Sample data
const stories: Story[] = [
  {
    id: 1,
    title: 'The Honest Woodcutter',
    videoUrl: 'https://www.youtube.com/embed/8QZ2DfFKy3Y',
    category: 'Honesty',
    description: 'A classic tale about the value of honesty and how it always pays off in the end.',
    ageGroup: '7-12',
    duration: '5:30'
  },
  {
    id: 2,
    title: 'The Kind Elephant',
    videoUrl: 'https://www.youtube.com/embed/8QZ2DfFKy3Y',
    category: 'Kindness',
    description: 'Learn how small acts of kindness can make a big difference in others\' lives.',
    ageGroup: '3-6',
    duration: '4:15'
  },
  {
    id: 3,
    title: 'Brave Little Mouse',
    videoUrl: 'https://www.youtube.com/embed/8QZ2DfFKy3Y',
    category: 'Courage',
    description: 'A tale about facing fears and finding courage within yourself.',
    ageGroup: '7-12',
    duration: '6:00'
  },
  {
    id: 4,
    title: 'Respect for Elders',
    videoUrl: 'https://www.youtube.com/embed/8QZ2DfFKy3Y',
    category: 'Respect',
    description: 'Understanding the importance of respecting our elders and their wisdom.',
    ageGroup: '7-12',
    duration: '5:45'
  },
  {
    id: 5,
    title: 'The Truthful Shepherd',
    videoUrl: 'https://www.youtube.com/embed/8QZ2DfFKy3Y',
    category: 'Honesty',
    description: 'A shepherd learns the importance of telling the truth, even when it\'s difficult.',
    ageGroup: '7-12',
    duration: '4:30'
  },
  {
    id: 6,
    title: 'Sharing is Caring',
    videoUrl: 'https://www.youtube.com/embed/8QZ2DfFKy3Y',
    category: 'Kindness',
    description: 'A story about the joy of sharing with others and making friends.',
    ageGroup: '3-6',
    duration: '3:45'
  },
  {
    id: 7,
    title: 'The Power of Friendship',
    videoUrl: 'https://www.youtube.com/embed/8QZ2DfFKy3Y',
    category: 'Friendship',
    description: 'Discover how true friendship helps us overcome challenges together.',
    ageGroup: '7-12',
    duration: '6:15'
  },
  {
    id: 8,
    title: 'Never Give Up',
    videoUrl: 'https://www.youtube.com/embed/8QZ2DfFKy3Y',
    category: 'Perseverance',
    description: 'A story about determination and never giving up on your dreams.',
    ageGroup: '13+',
    duration: '7:00'
  },
  {
    id: 9,
    title: 'Thank You, Thank You!',
    videoUrl: 'https://www.youtube.com/embed/8QZ2DfFKy3Y',
    category: 'Gratitude',
    description: 'Learn the importance of being grateful for what we have.',
    ageGroup: '3-6',
    duration: '4:00'
  }
];

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #e0f7fa 0%, #f3e5f5 100%);
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Header = styled(MotionDiv)`
  text-align: center;
  margin-bottom: 3rem;
  h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
    font-family: 'Comic Sans MS', cursive;
  }
  p {
    font-size: 1.2rem;
    color: #7f8c8d;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ProfileButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: white;
  color: #2c3e50;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ProfileIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #64b5f6 0%, #1976d2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const StudentName = styled.span`
  font-weight: 500;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(MotionButton)<{ active: string }>`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  background: ${props => props.active === 'true' ? '#64b5f6' : 'white'};
  color: ${props => props.active === 'true' ? 'white' : '#2c3e50'};
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const VideoCard = styled(MotionDiv)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const VideoContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background: #f5f6fa;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '▶';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    color: #64b5f6;
    opacity: 0.8;
    z-index: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
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
    margin-bottom: 1rem;
  }
`;

const VideoMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const MetaTag = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  background: #e3f2fd;
  color: #1976d2;
  margin-right: 0.5rem;
`;

const Duration = styled.span`
  font-size: 0.8rem;
  color: #7f8c8d;
  background: #f5f6fa;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
`;

const Quote = styled(MotionDiv)`
  text-align: center;
  margin-top: 4rem;
  padding: 2rem;
  font-size: 1.2rem;
  color: #2c3e50;
  font-style: italic;
`;

const SearchContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 2rem;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
  font-size: 1.2rem;
`;

const FeaturedSection = styled(MotionDiv)`
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #fff 0%, #f8f9fa 100%);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const FeaturedTitle = styled.h2`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
`;

const FeaturedContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedVideo = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FeaturedInfo = styled.div`
  h3 {
    color: #2c3e50;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  p {
    color: #7f8c8d;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`;

const FeaturedMeta = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const LoadMoreButton = styled(motion.button)`
  background: linear-gradient(135deg, #4299E1 0%, #2B6CB0 100%);
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 2rem auto;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(66, 153, 225, 0.2);

  &:hover {
    background: linear-gradient(135deg, #3182CE 0%, #2C5282 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(66, 153, 225, 0.3);
  }

  &:disabled {
    background: #CBD5E0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const RefreshButton = styled(motion.button)`
  background: linear-gradient(135deg, #48BB78 0%, #2F855A 100%);
  color: white;
  border: none;
  padding: 1.2rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-left: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(72, 187, 120, 0.2);

  &:hover {
    background: linear-gradient(135deg, #38A169 0%, #276749 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(72, 187, 120, 0.3);
  }

  &:disabled {
    background: #CBD5E0;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const ButtonContainer = styled(MotionDiv)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin: 2.5rem 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  backdrop-filter: blur(8px);
`;

const FallbackImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e0f7fa 0%, #f3e5f5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64b5f6;
  font-size: 1.5rem;
  text-align: center;
  padding: 1rem;
`;

const MoralStories: React.FC = () => {
  const { childName } = useParams<{ childName: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Stories');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('All Ages');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayedVideos, setDisplayedVideos] = useState<number>(3);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState<boolean>(false);
  const [searchLanguage, setSearchLanguage] = useState<string>('en');

  const categories = ['All Stories', 'Honesty', 'Kindness', 'Courage', 'Respect', 'Friendship', 'Perseverance', 'Gratitude'];
  const ageGroups = ['All Ages', '3-6', '7-12', '13+'];

  // Featured story (you can rotate this based on different criteria)
  const featuredStory = stories[0];

  const fetchYouTubeVideos = async (query: string) => {
    try {
      setIsLoadingVideos(true);
      const YOUTUBE_API_KEY = 'AIzaSyDL28YpXiS4266hCGO8oxZWBFPXJyEMr54';
      
      // Enhanced search query for moral stories
      const searchQuery = `${query} moral story for kids educational`;
      console.log('Fetching videos with query:', searchQuery);
      
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(searchQuery)}&type=video&key=${YOUTUBE_API_KEY}&videoEmbeddable=true&videoDuration=short`
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
      console.log('YouTube API Response:', data);
      
      if (!data.items || data.items.length === 0) {
        console.log('No videos found for query:', searchQuery);
        return [];
      }

      const videos = data.items.map(item => {
        const videoId = item.id.videoId;
        const thumbnail = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

        return {
          id: videoId,
          title: item.snippet.title,
          thumbnail,
          channelTitle: item.snippet.channelTitle,
          publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
          videoUrl: `https://www.youtube.com/embed/${videoId}`
        };
      });

      console.log('Processed videos:', videos);
      return videos;
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      return [];
    } finally {
      setIsLoadingVideos(false);
    }
  };

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      const newVideos = await fetchYouTubeVideos(selectedCategory === 'All Stories' ? 'moral story' : selectedCategory);
      if (newVideos.length > 0) {
        setYoutubeVideos(prevVideos => [...prevVideos, ...newVideos]);
        setDisplayedVideos(prev => prev + 10);
      } else {
        console.log('No new videos to load');
      }
    } catch (error) {
      console.error('Error loading more videos:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoadingVideos(true);
    setYoutubeVideos([]);
    try {
      const videos = await fetchYouTubeVideos(selectedCategory === 'All Stories' ? 'moral story' : selectedCategory);
      if (videos.length > 0) {
        setYoutubeVideos(videos);
        setDisplayedVideos(3);
      } else {
        console.log('No videos found on refresh');
      }
    } catch (error) {
      console.error('Error refreshing videos:', error);
    } finally {
      setIsLoadingVideos(false);
    }
  };

  // Initial load of videos
  useEffect(() => {
    console.log('Initial load of videos for category:', selectedCategory);
    handleRefresh();
  }, [selectedCategory]);

  return (
    <Container>
      <HeaderContainer>
        <Header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>🌟 Moral Stories for {childName}</h1>
          <p>Watch and learn from these handpicked moral stories.</p>
        </Header>

        <ProfileButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ProfileIcon>👤</ProfileIcon>
          <StudentName>{childName}</StudentName>
        </ProfileButton>
      </HeaderContainer>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search stories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon>🔍</SearchIcon>
      </SearchContainer>

      <FilterContainer>
        <FilterRow>
          {categories.map(category => (
            <FilterButton
              key={category}
              active={selectedCategory === category ? 'true' : 'false'}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </FilterButton>
          ))}
        </FilterRow>
      </FilterContainer>

      <VideoGrid>
        {youtubeVideos.slice(0, displayedVideos).map((video, index) => (
          <VideoCard
            key={`${video.id}-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
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
                loading="lazy"
                onError={() => {
                  console.error('Error loading video:', video.title);
                }}
              />
            </VideoContainer>
            <VideoInfo>
              <h3>{video.title}</h3>
              <p>Channel: {video.channelTitle}</p>
              <VideoMeta>
                <div>
                  <MetaTag>{selectedCategory}</MetaTag>
                  <MetaTag>📅 {video.publishedAt}</MetaTag>
                </div>
              </VideoMeta>
            </VideoInfo>
          </VideoCard>
        ))}
      </VideoGrid>

      <ButtonContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LoadMoreButton
          onClick={handleLoadMore}
          disabled={isLoadingMore}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoadingMore ? (
            <>
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="20" />
              </motion.svg>
              Loading...
            </>
          ) : (
            <>
              <span role="img" aria-label="load more">📚</span>
              Load 10 More Stories
            </>
          )}
        </LoadMoreButton>
        <RefreshButton
          onClick={handleRefresh}
          disabled={isLoadingVideos}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoadingVideos ? (
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="20" />
            </motion.svg>
          ) : (
            <span role="img" aria-label="refresh">🔄</span>
          )}
          Refresh Videos
        </RefreshButton>
      </ButtonContainer>

      <Quote
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        "Small acts of kindness create big waves of change 🌊"
      </Quote>
    </Container>
  );
};

export default MoralStories; 