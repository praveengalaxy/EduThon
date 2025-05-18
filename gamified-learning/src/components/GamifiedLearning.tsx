import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { subjects } from '../data/questions';
import { keyframes } from '@emotion/react';

// Types
export interface Question {
  concept: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Lesson {
  id: number;
  questions: Question[];
}

export interface Subject {
  id: string;
  name: string;
  lessons: Lesson[];
}

// Modern color palette
const colors = {
  primary: '#6366f1', // Indigo
  secondary: '#8b5cf6', // Purple
  accent: '#ec4899', // Pink
  success: '#10b981', // Emerald
  warning: '#f59e0b', // Amber
  error: '#ef4444', // Red
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

// Add new animation keyframes
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

// Enhanced Container with animated gradient
const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(
    45deg,
    ${colors.background.light} 0%,
    ${colors.background.main} 50%,
    ${colors.background.light} 100%
  );
  background-size: 200% 200%;
  animation: ${shimmerAnimation} 15s ease infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Enhanced Hero with floating animation
const Hero = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${floatAnimation} 6s ease-in-out infinite;
  
  h1 {
    font-size: 3.5rem;
    color: ${colors.text.primary};
    margin-bottom: 1rem;
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent});
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    animation: ${shimmerAnimation} 8s ease infinite;
  }
  
  p {
    color: ${colors.text.secondary};
    font-size: 1.3rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
`;

// Enhanced SelectionContainer with glassmorphism
const SelectionContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.12),
      0 0 0 1px rgba(255, 255, 255, 0.2);
  }
`;

// Enhanced Select with modern styling
const Select = styled.select`
  width: 100%;
  padding: 1.2rem 1.5rem;
  margin: 1rem 0;
  border: 2px solid ${colors.background.dark};
  border-radius: 16px;
  font-size: 1.1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${colors.text.primary};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  
  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 
      0 0 0 3px rgba(99, 102, 241, 0.1),
      0 4px 12px rgba(99, 102, 241, 0.1);
    transform: translateY(-2px);
  }
  
  &:hover {
    border-color: ${colors.primary};
    transform: translateY(-2px);
  }
`;

// Enhanced QuizCard with 3D effect
const QuizCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 600px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px) rotateX(2deg);
    box-shadow: 
      0 20px 60px rgba(0, 0, 0, 0.12),
      0 0 0 1px rgba(255, 255, 255, 0.2);
  }
`;

const QuestionText = styled.h2`
  color: ${colors.text.primary};
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ConceptText = styled.p`
  color: ${colors.text.secondary};
  font-size: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: ${colors.background.light};
  border-radius: 8px;
  display: inline-block;
`;

// Enhanced OptionButton with gradient hover
const OptionButton = styled(motion.button)`
  width: 100%;
  padding: 1.2rem;
  margin: 0.75rem 0;
  border: 2px solid ${colors.background.dark};
  border-radius: 16px;
  background: white;
  color: ${colors.text.primary};
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }
  
  &:hover {
    color: white;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  span {
    position: relative;
    z-index: 1;
  }
`;

const ResultContainer = styled(motion.div)`
  text-align: center;
  h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  p {
    color: #7f8c8d;
    margin-bottom: 2rem;
  }
`;

// Enhanced ActionButton with gradient and shine effect
const ActionButton = styled(motion.button)`
  padding: 1.2rem 2.5rem;
  margin: 0.5rem;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
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
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.3);
    
    &::after {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Enhanced ProgressBar with gradient and glow
const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 10px;
  background: ${colors.background.dark};
  border-radius: 5px;
  margin: 1rem 0;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary});
    transition: width 0.3s ease;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
  }
`;

const ProgressText = styled.div`
  font-size: 0.875rem;
  color: #64748b;
  text-align: right;
  margin-top: 0.25rem;
`;

const StreakContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.75rem 1.25rem;
  background: ${colors.background.light};
  border-radius: 12px;
  border: 2px solid ${colors.warning};
`;

const StreakIcon = styled.span`
  font-size: 1.5rem;
`;

const StreakText = styled.div`
  font-size: 0.875rem;
  color: #64748b;
`;

const FeedbackMessage = styled(motion.div)`
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
`;

const CorrectFeedback = styled(FeedbackMessage)`
  background: #dcfce7;
  color: #166534;
`;

const IncorrectFeedback = styled(FeedbackMessage)`
  background: #fee2e2;
  color: #991b1b;
`;

const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.75rem 1.25rem;
  background: ${colors.background.light};
  border-radius: 12px;
  border: 2px solid ${colors.primary};
`;

const TimerText = styled.div`
  font-size: 0.875rem;
  color: #64748b;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

// Enhanced StatCard with hover effect
const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.05),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 12px 24px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.2);
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${colors.text.secondary};
  font-weight: 500;
`;

// New styled components for tabs
const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const Tab = styled(motion.button)<{ active: boolean }>`
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  background: ${props => props.active ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` : 'white'};
  color: ${props => props.active ? 'white' : colors.text.secondary};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
`;

const StoryCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
`;

const StoryTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const StoryContent = styled.div`
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const Moral = styled.div`
  background: #f8fafc;
  padding: 1rem;
  border-radius: 10px;
  border-left: 4px solid #64b5f6;
  margin-top: 1rem;
`;

const MoralTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

// New styled components for video recommendations
const VideoSection = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 800px;
  margin-top: 2rem;
  border: 1px solid rgba(99, 102, 241, 0.1);
`;

const VideoTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

// Enhanced VideoCard with 3D hover effect
const VideoCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.05),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
  perspective: 1000px;

  &:hover {
    transform: translateY(-8px) rotateX(2deg);
    box-shadow: 
      0 12px 24px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.2);
    
    img {
      transform: scale(1.1);
    }
  }
`;

// Enhanced VideoThumbnail with overlay effect
const VideoThumbnail = styled.div`
  position: relative;
  padding-top: 56.25%;
  background: ${colors.background.dark};
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::after {
    opacity: 1;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 64px;
    height: 64px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    z-index: 2;

    &:hover {
      background: white;
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
    }
  }
`;

const VideoInfo = styled.div`
  padding: 1rem;
`;

const VideoName = styled.h4`
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const VideoDescription = styled.p`
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.4;
`;

// New styled components for concept explanations
const ConceptSection = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
  border: 1px solid rgba(99, 102, 241, 0.1);
`;

const ConceptTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ConceptContent = styled.div`
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ExampleBox = styled.div`
  background: ${colors.background.light};
  padding: 1.5rem;
  border-radius: 16px;
  border-left: 4px solid ${colors.primary};
  margin: 1rem 0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const ExampleTitle = styled.h4`
  color: #2c3e50;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormulaBox = styled.div`
  background: linear-gradient(135deg, ${colors.background.light}, white);
  padding: 1.25rem;
  border-radius: 12px;
  font-family: 'Fira Code', monospace;
  margin: 1rem 0;
  text-align: center;
  font-size: 1.1rem;
  color: ${colors.primary};
  border: 1px solid rgba(99, 102, 241, 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

// Sample moral stories data
const moralStories = [
  {
    id: 1,
    title: "The Honest Woodcutter",
    content: `Once upon a time, there was a poor woodcutter who lived in a small village. One day, while cutting wood near a river, his axe slipped and fell into the deep water. The woodcutter was very sad as he couldn't afford to buy a new axe.

Just then, a magical fairy appeared and asked what was wrong. The woodcutter explained his problem. The fairy dived into the river and came up with a golden axe. "Is this your axe?" she asked. The woodcutter said no. The fairy then brought a silver axe, but again the woodcutter said it wasn't his. Finally, she brought his old iron axe. "Yes, that's my axe!" the woodcutter exclaimed happily.

The fairy was so impressed by his honesty that she gave him all three axes as a reward.`,
    moral: "Honesty is always the best policy. Being truthful brings its own rewards."
  },
  {
    id: 2,
    title: "The Ant and the Grasshopper",
    content: `In a field one summer's day, a Grasshopper was hopping about, chirping and singing to its heart's content. An Ant passed by, bearing along with great toil an ear of corn he was taking to the nest.

"Why not come and chat with me," said the Grasshopper, "instead of toiling and moiling in that way?"

"I am helping to lay up food for the winter," said the Ant, "and recommend you to do the same."

"Why bother about winter?" said the Grasshopper; "we have got plenty of food at present." But the Ant went on its way and continued its toil.

When the winter came, the Grasshopper had no food and found itself dying of hunger, while it saw the ants distributing every day corn and grain from the stores they had collected in the summer.`,
    moral: "It is best to prepare for the days of necessity. Hard work and planning ahead are important for success."
  },
  {
    id: 3,
    title: "The Lion and the Mouse",
    content: `Once when a Lion was asleep, a little Mouse began running up and down upon him. This soon wakened the Lion, who placed his huge paw upon him and opened his big jaws to swallow him.

"Pardon, O King," cried the little Mouse. "Forgive me this time, I shall never forget it. Who knows but what I may be able to do you a turn some of these days?"

The Lion was so tickled at the idea of the Mouse being able to help him that he lifted up his paw and let him go.

Some time later, the Lion was caught in a trap, and the hunters who desired to carry him alive to the King tied him to a tree while they went in search of a wagon to carry him on. Just then the little Mouse happened to pass by, and seeing the sad plight of the Lion, went up to him and soon gnawed away the ropes that bound the King of the Beasts.`,
    moral: "No act of kindness, no matter how small, is ever wasted. Everyone has something to offer, regardless of their size or status."
  }
];

// Sample video recommendations data
const videoRecommendations = {
  learning: {
    math: [
      {
        id: 1,
        title: "Fun with Numbers: Addition and Subtraction",
        description: "Learn basic math operations through fun animations and real-world examples",
        thumbnail: "https://img.youtube.com/vi/example1/maxresdefault.jpg",
        url: "https://www.youtube.com/watch?v=example1"
      },
      {
        id: 2,
        title: "Math Magic: Multiplication Tables",
        description: "Master multiplication tables with catchy songs and visual aids",
        thumbnail: "https://img.youtube.com/vi/example2/maxresdefault.jpg",
        url: "https://www.youtube.com/watch?v=example2"
      }
    ],
    science: [
      {
        id: 3,
        title: "Amazing Science Experiments for Kids",
        description: "Safe and fun science experiments you can try at home",
        thumbnail: "https://img.youtube.com/vi/example3/maxresdefault.jpg",
        url: "https://www.youtube.com/watch?v=example3"
      },
      {
        id: 4,
        title: "The Solar System Adventure",
        description: "Explore the planets and stars in this exciting space journey",
        thumbnail: "https://img.youtube.com/vi/example4/maxresdefault.jpg",
        url: "https://www.youtube.com/watch?v=example4"
      }
    ]
  },
  stories: [
    {
      id: 5,
      title: "The Honest Woodcutter - Animated Story",
      description: "Watch the classic tale of honesty and its rewards come to life",
      thumbnail: "https://img.youtube.com/vi/example5/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=example5"
    },
    {
      id: 6,
      title: "The Ant and the Grasshopper - Musical Version",
      description: "Enjoy this musical retelling of the famous fable about hard work",
      thumbnail: "https://img.youtube.com/vi/example6/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=example6"
    },
    {
      id: 7,
      title: "The Lion and the Mouse - Puppet Show",
      description: "A delightful puppet show version of the classic story about friendship",
      thumbnail: "https://img.youtube.com/vi/example7/maxresdefault.jpg",
      url: "https://www.youtube.com/watch?v=example7"
    }
  ]
};

// Sample concept explanations data
const conceptExplanations = {
  math: {
    addition: {
      title: "Addition",
      explanation: "Addition is the process of combining two or more numbers to find their total sum. It's one of the basic operations in mathematics and is used in everyday life for counting and combining quantities.",
      examples: [
        {
          title: "Basic Addition",
          description: "When we add two numbers, we combine their values to get a total.",
          example: "5 + 3 = 8",
          explanation: "This means if you have 5 apples and add 3 more apples, you now have 8 apples in total."
        },
        {
          title: "Addition with Carrying",
          description: "When adding numbers that result in a sum greater than 9 in any place value, we need to carry over to the next place.",
          example: "25 + 17 = 42",
          explanation: "First, add the ones place: 5 + 7 = 12. Write down 2 and carry over 1 to the tens place. Then add the tens place: 2 + 1 + 1 = 4. The final answer is 42."
        }
      ]
    },
    multiplication: {
      title: "Multiplication",
      explanation: "Multiplication is a way of adding the same number multiple times. It's a faster way to add when you have groups of the same size.",
      examples: [
        {
          title: "Basic Multiplication",
          description: "Multiplying two numbers means adding one number to itself the other number of times.",
          example: "4 × 3 = 12",
          explanation: "This is the same as adding 4 three times: 4 + 4 + 4 = 12"
        },
        {
          title: "Multiplication with Larger Numbers",
          description: "When multiplying larger numbers, we use the standard algorithm to break down the problem into smaller steps.",
          example: "23 × 4 = 92",
          explanation: "First multiply 20 × 4 = 80, then 3 × 4 = 12. Finally, add 80 + 12 = 92"
        }
      ]
    }
  },
  science: {
    solarSystem: {
      title: "The Solar System",
      explanation: "The Solar System is our cosmic neighborhood, consisting of the Sun and everything that orbits around it, including planets, moons, asteroids, and comets.",
      examples: [
        {
          title: "The Sun",
          description: "The Sun is the center of our Solar System and provides light and heat to all the planets.",
          example: "Distance from Earth: 93 million miles",
          explanation: "The Sun's energy reaches Earth in about 8 minutes, traveling at the speed of light."
        },
        {
          title: "The Planets",
          description: "There are 8 planets in our Solar System, each with unique characteristics.",
          example: "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune",
          explanation: "The first four planets are rocky (terrestrial), while the last four are gas giants."
        }
      ]
    },
    plants: {
      title: "Plant Life Cycle",
      explanation: "Plants go through a life cycle that includes seed germination, growth, reproduction, and death. This cycle ensures the continuation of plant species.",
      examples: [
        {
          title: "Seed Germination",
          description: "The process where a seed begins to grow into a new plant.",
          example: "Steps: Water → Root → Shoot → Leaves",
          explanation: "Seeds need water, warmth, and air to germinate and start growing."
        },
        {
          title: "Photosynthesis",
          description: "The process by which plants make their own food using sunlight.",
          example: "Sunlight + Water + Carbon Dioxide → Glucose + Oxygen",
          explanation: "Plants use chlorophyll to capture sunlight and convert it into energy."
        }
      ]
    }
  }
};

interface ConceptPerformance {
  concept: string;
  correct: number;
  status: 'Strong' | 'Needs Improvement' | 'Weak';
}

const GamifiedLearning: React.FC = () => {
  const { childName } = useParams<{ childName: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'learning' | 'stories'>('learning');
  const [selectedStory, setSelectedStory] = useState<number>(0);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedLesson, setSelectedLesson] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    averageScore: 0,
    highestScore: 0
  });
  const [conceptPerformance, setConceptPerformance] = useState<ConceptPerformance[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ questionIndex: number; selectedOption: number }[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleAnswer(-1); // Time's up
    }
    return () => clearInterval(timer);
  }, [quizStarted, quizCompleted, timeLeft]);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
    setSelectedLesson(0);
  };

  const handleLessonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLesson(Number(e.target.value));
  };

  const startQuiz = () => {
    if (!selectedSubject || !selectedLesson) {
      return;
    }
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setTimeLeft(30);
    setStreak(0);
  };

  const handleAnswer = (selectedOption: number) => {
    const currentSubject = subjects.find(s => s.id === selectedSubject);
    const currentLesson = currentSubject?.lessons.find(l => l.id === selectedLesson);
    const question = currentLesson?.questions[currentQuestion];

    const isAnswerCorrect = Boolean(question && selectedOption === question.correctAnswer);
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    // Store the user's answer
    setUserAnswers(prev => [...prev, { questionIndex: currentQuestion, selectedOption }]);

    if (isAnswerCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < 9) {
        setCurrentQuestion(prev => prev + 1);
        setTimeLeft(30);
      } else {
        setQuizCompleted(true);
        updateStats();
        analyzeConceptPerformance();
      }
    }, 1500);
  };

  const analyzeConceptPerformance = () => {
    const currentSubject = subjects.find(s => s.id === selectedSubject);
    const currentLesson = currentSubject?.lessons.find(l => l.id === selectedLesson);
    if (!currentLesson) return;

    // Group questions by concept
    const conceptGroups = currentLesson.questions.reduce((acc, question, index) => {
      const userAnswer = userAnswers.find(a => a.questionIndex === index);
      if (!userAnswer) return acc;

      if (!acc[question.concept]) {
        acc[question.concept] = {
          total: 0,
          correct: 0
        };
      }

      acc[question.concept].total++;
      if (userAnswer.selectedOption === question.correctAnswer) {
        acc[question.concept].correct++;
      }

      return acc;
    }, {} as Record<string, { total: number; correct: number }>);

    // Calculate performance status for each concept
    const performance = Object.entries(conceptGroups).map(([concept, stats]) => {
      let status: 'Strong' | 'Needs Improvement' | 'Weak';
      const percentage = (stats.correct / stats.total) * 100;
      
      if (percentage >= 80) {
        status = 'Strong';
      } else if (percentage >= 40) {
        status = 'Needs Improvement';
      } else {
        status = 'Weak';
      }

      return {
        concept,
        correct: stats.correct,
        total: stats.total,
        percentage,
        status
      };
    });

    setConceptPerformance(performance);

    // Update weakest concepts in parent dashboard
    const weakConcepts = performance
      .filter(perf => perf.status === 'Weak')
      .map(perf => perf.concept);

    if (weakConcepts.length > 0 && childName) {
      const existingWeakConcepts = JSON.parse(localStorage.getItem('weakConcepts') || '{}');
      existingWeakConcepts[childName] = weakConcepts;
      localStorage.setItem('weakConcepts', JSON.stringify(existingWeakConcepts));
    }
  };

  const updateStats = () => {
    setStats(prev => ({
      totalQuizzes: prev.totalQuizzes + 1,
      averageScore: (prev.averageScore * prev.totalQuizzes + score) / (prev.totalQuizzes + 1),
      highestScore: Math.max(prev.highestScore, score)
    }));

    // Update parent dashboard with quiz results
    const quizResults = {
      childName,
      subject: selectedSubject,
      score: score * 10, // Convert to percentage
      totalQuizzes: stats.totalQuizzes + 1,
      averageScore: ((stats.averageScore * stats.totalQuizzes + score * 10) / (stats.totalQuizzes + 1)),
      conceptPerformance: conceptPerformance.map(perf => ({
        concept: perf.concept,
        status: perf.status,
        correct: perf.correct
      }))
    };

    // Store quiz results in localStorage for parent dashboard
    const existingResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    localStorage.setItem('quizResults', JSON.stringify([...existingResults, quizResults]));
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setStreak(0);
  };

  const getCurrentQuestion = () => {
    const currentSubject = subjects.find(s => s.id === selectedSubject);
    const currentLesson = currentSubject?.lessons.find(l => l.id === selectedLesson);
    return currentLesson?.questions[currentQuestion];
  };

  const handleBackToLearning = () => {
    navigate('/parent-dashboard');
  };

  const getRecommendedVideos = () => {
    if (activeTab === 'learning' && selectedSubject) {
      return videoRecommendations.learning[selectedSubject as keyof typeof videoRecommendations.learning] || [];
    } else if (activeTab === 'stories') {
      return videoRecommendations.stories;
    }
    return [];
  };

  const handleVideoClick = (url: string) => {
    window.open(url, '_blank');
  };

  const getConceptExplanation = () => {
    if (activeTab === 'learning' && selectedSubject) {
      const subject = subjects.find(s => s.id === selectedSubject);
      if (subject) {
        return conceptExplanations[subject.id as keyof typeof conceptExplanations];
      }
    }
    return null;
  };

  return (
    <Container>
      <Hero
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Welcome, {childName}! 🚀</h1>
        <p>Let's have fun while learning!</p>
      </Hero>

      <TabContainer>
        <Tab
          active={activeTab === 'learning'}
          onClick={() => setActiveTab('learning')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learning
        </Tab>
        <Tab
          active={activeTab === 'stories'}
          onClick={() => setActiveTab('stories')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Moral Stories
        </Tab>
      </TabContainer>

      <AnimatePresence mode="wait">
        {activeTab === 'learning' ? (
          <motion.div
            key="learning"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            {!quizStarted && !quizCompleted && (
              <>
                <SelectionContainer
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2>Choose Your Learning Path</h2>
                  <StatsContainer>
                    <StatCard
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <StatValue>{stats.totalQuizzes}</StatValue>
                      <StatLabel>Quizzes Taken</StatLabel>
                    </StatCard>
                    <StatCard
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <StatValue>{Math.round(stats.averageScore)}%</StatValue>
                      <StatLabel>Average Score</StatLabel>
                    </StatCard>
                    <StatCard
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <StatValue>{stats.highestScore}/10</StatValue>
                      <StatLabel>Highest Score</StatLabel>
                    </StatCard>
                  </StatsContainer>
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

                  {selectedSubject && selectedLesson && (
                    <ActionButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startQuiz}
                    >
                      Start Quiz
                    </ActionButton>
                  )}
                </SelectionContainer>

                {selectedSubject && (
                  <>
                    <ConceptSection
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <ConceptTitle>
                        <span role="img" aria-label="book">📚</span>
                        Understanding {subjects.find(s => s.id === selectedSubject)?.name}
                      </ConceptTitle>
                      {Object.entries(getConceptExplanation() || {}).map(([key, concept]: [string, any]) => (
                        <div key={key}>
                          <h4 style={{ color: '#2c3e50', marginBottom: '1rem' }}>{concept.title}</h4>
                          <ConceptContent>{concept.explanation}</ConceptContent>
                          {concept.examples.map((example: any, index: number) => (
                            <ExampleBox key={index}>
                              <ExampleTitle>
                                <span role="img" aria-label="lightbulb">💡</span>
                                {example.title}
                              </ExampleTitle>
                              <p style={{ marginBottom: '0.5rem' }}>{example.description}</p>
                              {example.example && (
                                <FormulaBox>
                                  {example.example}
                                </FormulaBox>
                              )}
                              <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>{example.explanation}</p>
                            </ExampleBox>
                          ))}
                        </div>
                      ))}
                    </ConceptSection>

                    <VideoSection
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <VideoTitle>
                        <span role="img" aria-label="video">🎥</span>
                        Recommended Videos for {subjects.find(s => s.id === selectedSubject)?.name}
                      </VideoTitle>
                      <VideoGrid>
                        {getRecommendedVideos().map(video => (
                          <VideoCard
                            key={video.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleVideoClick(video.url)}
                          >
                            <VideoThumbnail>
                              <img src={video.thumbnail} alt={video.title} />
                              <div className="play-button">
                                <span role="img" aria-label="play">▶️</span>
                              </div>
                            </VideoThumbnail>
                            <VideoInfo>
                              <VideoName>{video.title}</VideoName>
                              <VideoDescription>{video.description}</VideoDescription>
                            </VideoInfo>
                          </VideoCard>
                        ))}
                      </VideoGrid>
                    </VideoSection>
                  </>
                )}
              </>
            )}

            {quizStarted && !quizCompleted && (
              <QuizCard
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <StreakContainer>
                  <StreakIcon>🔥</StreakIcon>
                  <StreakText>Current Streak: {streak}</StreakText>
                </StreakContainer>
                <TimerContainer>
                  <span>⏰</span>
                  <TimerText>Time Left: {timeLeft}s</TimerText>
                </TimerContainer>
                <ProgressBar progress={(currentQuestion / 10) * 100} />
                <ProgressText>Question {currentQuestion + 1} of 10</ProgressText>
                <QuestionText>Question {currentQuestion + 1} of 10</QuestionText>
                <ConceptText>Concept: {getCurrentQuestion()?.concept}</ConceptText>
                <QuestionText>{getCurrentQuestion()?.question}</QuestionText>
                <AnimatePresence>
                  {showFeedback && (
                    isCorrect ? (
                      <CorrectFeedback
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        Correct! 🎉
                      </CorrectFeedback>
                    ) : (
                      <IncorrectFeedback
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        Try again! 💪
                      </IncorrectFeedback>
                    )
                  )}
                </AnimatePresence>
                {getCurrentQuestion()?.options.map((option, index) => (
                  <OptionButton
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(index)}
                    disabled={showFeedback}
                  >
                    {option}
                  </OptionButton>
                ))}
              </QuizCard>
            )}

            {quizCompleted && (
              <ResultContainer
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2>Quiz Completed! 🎉</h2>
                <p>Your score: {score} out of 10</p>
                <p>
                  {score >= 8
                    ? "Amazing job! You're a superstar! 🌟"
                    : score >= 6
                    ? "Great work! Keep practicing! 💪"
                    : "Keep trying, you'll get better! 🌈"}
                </p>

                <h3 style={{ marginTop: '2rem', color: '#2c3e50' }}>Concept Performance</h3>
                <div style={{ 
                  display: 'grid', 
                  gap: '1rem', 
                  marginTop: '1rem',
                  maxWidth: '600px',
                  width: '100%'
                }}>
                  {conceptPerformance.map((performance, index) => (
                    <motion.div
                      key={performance.concept}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      style={{
                        background: 'white',
                        padding: '1rem',
                        borderRadius: '10px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>
                        {performance.concept}
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ 
                          padding: '0.25rem 0.75rem',
                          borderRadius: '20px',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          background: 
                            performance.status === 'Strong' ? '#4caf50' :
                            performance.status === 'Needs Improvement' ? '#ff9800' :
                            '#f44336',
                          color: 'white'
                        }}>
                          {performance.status}
                        </span>
                        <span style={{ color: '#666' }}>
                          {performance.correct} correct
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <ActionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetQuiz}
                >
                  Retry
                </ActionButton>
                <ActionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBackToLearning}
                >
                  Back to Learning
                </ActionButton>
              </ResultContainer>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="stories"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StoryCard>
              <StoryTitle>{moralStories[selectedStory].title}</StoryTitle>
              <StoryContent>{moralStories[selectedStory].content}</StoryContent>
              <Moral>
                <MoralTitle>Moral of the Story:</MoralTitle>
                <p>{moralStories[selectedStory].moral}</p>
              </Moral>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <ActionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedStory(prev => (prev > 0 ? prev - 1 : moralStories.length - 1))}
                >
                  Previous Story
                </ActionButton>
                <ActionButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedStory(prev => (prev < moralStories.length - 1 ? prev + 1 : 0))}
                >
                  Next Story
                </ActionButton>
              </div>
            </StoryCard>

            <VideoSection
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <VideoTitle>
                <span role="img" aria-label="video">🎥</span>
                Watch {moralStories[selectedStory].title} Come to Life
              </VideoTitle>
              <VideoGrid>
                {getRecommendedVideos().map(video => (
                  <VideoCard
                    key={video.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleVideoClick(video.url)}
                  >
                    <VideoThumbnail>
                      <img src={video.thumbnail} alt={video.title} />
                      <div className="play-button">
                        <span role="img" aria-label="play">▶️</span>
                      </div>
                    </VideoThumbnail>
                    <VideoInfo>
                      <VideoName>{video.title}</VideoName>
                      <VideoDescription>{video.description}</VideoDescription>
                    </VideoInfo>
                  </VideoCard>
                ))}
              </VideoGrid>
            </VideoSection>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default GamifiedLearning; 