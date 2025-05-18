import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { keyframes } from '@emotion/react';

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

// Animation keyframes
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Enhanced Navbar with glassmorphism
const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  padding: 1.2rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: ${pulseAnimation} 3s ease-in-out infinite;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${colors.text.primary};
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary});
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${colors.primary};
    &::after {
      width: 100%;
    }
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const MotionLink = motion(Link);

const PrimaryButton = styled(MotionLink)`
  padding: 0.9rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  color: white;
  border: none;
  text-decoration: none;
  display: inline-block;
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
`;

const SecondaryButton = styled(MotionLink)`
  padding: 0.9rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
  color: ${colors.primary};
  border: 2px solid ${colors.primary};
  text-decoration: none;
  display: inline-block;
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
    &::before {
      opacity: 1;
    }
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    45deg,
    ${colors.background.light} 0%,
    ${colors.background.main} 50%,
    ${colors.background.light} 100%
  );
  background-size: 200% 200%;
  animation: ${shimmerAnimation} 15s ease infinite;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/pattern.svg');
    opacity: 0.1;
    animation: ${floatAnimation} 20s linear infinite;
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent});
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  animation: ${shimmerAnimation} 8s ease infinite;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.4rem;
  color: ${colors.text.secondary};
  margin-bottom: 2.5rem;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const FeaturesSection = styled.section`
  padding: 8rem 2rem;
  background: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${colors.primary}, transparent);
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 4rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 2.5rem;
  border-radius: 24px;
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
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${pulseAnimation} 3s ease-in-out infinite;
`;

const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${colors.text.primary};
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: ${colors.text.secondary};
  line-height: 1.7;
  font-size: 1.1rem;
`;

const CTASection = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/pattern.svg');
    opacity: 0.1;
    animation: ${floatAnimation} 20s linear infinite;
  }
`;

const CTATitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const CTADescription = styled.p`
  font-size: 1.4rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  position: relative;
  z-index: 1;
`;

const TestimonialsSection = styled.section`
  padding: 8rem 2rem;
  background: ${colors.background.light};
  position: relative;
  overflow: hidden;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const TestimonialCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.05),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 12px 24px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.2);
  }
`;

const TestimonialContent = styled.p`
  font-size: 1.2rem;
  color: ${colors.text.primary};
  margin-bottom: 1.5rem;
  line-height: 1.7;
  font-style: italic;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${colors.primary};
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${colors.text.primary};
`;

const AuthorRole = styled.p`
  font-size: 0.9rem;
  color: ${colors.text.secondary};
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${colors.text.primary};
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  z-index: 1001;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const PricingSection = styled.section`
  padding: 8rem 2rem;
  background: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${colors.primary}, transparent);
  }
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PricingCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.05),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  text-align: center;
  transition: all 0.3s ease;
  transform-style: preserve-3d;
  perspective: 1000px;

  &:hover {
    transform: translateY(-8px) rotateX(2deg);
    box-shadow: 
      0 12px 24px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.2);
    border-color: ${colors.primary};
  }
`;

const PricingTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${colors.text.primary};
  margin-bottom: 1rem;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const PricingPrice = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: ${colors.primary};
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  span {
    font-size: 1.1rem;
    color: ${colors.text.secondary};
  }
`;

const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  text-align: left;
`;

const PricingFeature = styled.li`
  color: ${colors.text.secondary};
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;

  &::before {
    content: "✓";
    color: ${colors.primary};
    font-weight: bold;
  }
`;

const Home: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const testimonials = [
    {
      content: "EduThon has transformed how I support my child's learning. The AI insights are incredibly helpful!",
      author: "Sarah M.",
      role: "Parent of 8-year-old",
      avatar: "👩"
    },
    {
      content: "The personalized learning approach has helped my daughter excel in subjects she used to struggle with.",
      author: "Michael R.",
      role: "Parent of 10-year-old",
      avatar: "👨"
    },
    {
      content: "The emotional intelligence tools have made a huge difference in my child's social development.",
      author: "Priya K.",
      role: "Parent of 7-year-old",
      avatar: "👩"
    }
  ];

  const pricingPlans = [
    {
      title: "Basic",
      price: "Free",
      features: [
        "Basic learning analytics",
        "Limited AI interactions",
        "Access to core features",
        "Community support"
      ]
    },
    {
      title: "Pro",
      price: "$9.99",
      period: "/month",
      features: [
        "Advanced learning analytics",
        "Unlimited AI interactions",
        "Priority support",
        "Custom learning paths",
        "Progress reports"
      ]
    },
    {
      title: "Family",
      price: "$19.99",
      period: "/month",
      features: [
        "Everything in Pro",
        "Up to 3 children",
        "Family progress tracking",
        "Parent coaching sessions",
        "Premium content access"
      ]
    }
  ];

  return (
    <>
      <Navbar style={{ background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent' }}>
        <Logo>
          <span role="img" aria-label="logo">🎓</span>
          EduThon
        </Logo>
        <NavLinks>
          <NavLink to="#features">Features</NavLink>
          <NavLink to="#testimonials">Testimonials</NavLink>
          <NavLink to="#pricing">Pricing</NavLink>
        </NavLinks>
        <AuthButtons>
          <SecondaryButton
            to="/login"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Log In
          </SecondaryButton>
          <PrimaryButton
            to="/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </PrimaryButton>
        </AuthButtons>
        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </Navbar>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <Logo>EduThon</Logo>
            <NavLink to="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</NavLink>
            <NavLink to="#testimonials" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</NavLink>
            <NavLink to="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</NavLink>
            <SecondaryButton
              to="/login"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Log In
            </SecondaryButton>
            <PrimaryButton
              to="/signup"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </PrimaryButton>
          </MobileMenu>
        )}
      </AnimatePresence>

      <HeroSection>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Empower Your Child's Learning Journey with AI
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join thousands of parents who are using our AI-powered platform to provide personalized learning experiences, track progress, and foster emotional growth in their children.
          </HeroSubtitle>
          <PrimaryButton
            to="/signup"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Free
          </PrimaryButton>
        </HeroContent>
      </HeroSection>

      <FeaturesSection id="features">
        <SectionTitle>Why Choose EduThon?</SectionTitle>
        <FeaturesGrid>
          <FeatureCard
            whileHover={{ y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <FeatureIcon>🎯</FeatureIcon>
            <FeatureTitle>Personalized Learning</FeatureTitle>
            <FeatureDescription>
              AI-powered adaptive learning that adjusts to your child's pace and learning style.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard
            whileHover={{ y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <FeatureIcon>📊</FeatureIcon>
            <FeatureTitle>Progress Tracking</FeatureTitle>
            <FeatureDescription>
              Detailed analytics and insights to monitor your child's academic and emotional growth.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard
            whileHover={{ y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <FeatureIcon>🧠</FeatureIcon>
            <FeatureTitle>Emotional Intelligence</FeatureTitle>
            <FeatureDescription>
              Tools and resources to help develop your child's emotional and social skills.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <TestimonialsSection id="testimonials">
        <SectionTitle>What Parents Say</SectionTitle>
        <TestimonialsGrid>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TestimonialContent>"{testimonial.content}"</TestimonialContent>
              <TestimonialAuthor>
                <AuthorImage src={`https://emoji-api.com/emojis/${testimonial.avatar}.png`} alt={testimonial.author} />
                <AuthorInfo>
                  <AuthorName>{testimonial.author}</AuthorName>
                  <AuthorRole>{testimonial.role}</AuthorRole>
                </AuthorInfo>
              </TestimonialAuthor>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </TestimonialsSection>

      <PricingSection id="pricing">
        <SectionTitle>Simple, Transparent Pricing</SectionTitle>
        <PricingGrid>
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <PricingTitle>{plan.title}</PricingTitle>
              <PricingPrice>
                {plan.price}
                {plan.period && <span>{plan.period}</span>}
              </PricingPrice>
              <PricingFeatures>
                {plan.features.map((feature, featureIndex) => (
                  <PricingFeature key={featureIndex}>{feature}</PricingFeature>
                ))}
              </PricingFeatures>
              <PrimaryButton
                to="/signup"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </PrimaryButton>
            </PricingCard>
          ))}
        </PricingGrid>
      </PricingSection>

      <CTASection>
        <CTATitle>Ready to Transform Your Child's Learning?</CTATitle>
        <CTADescription>
          Join thousands of parents who are already using EduThon to provide the best education for their children.
        </CTADescription>
        <PrimaryButton
          to="/signup"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ background: 'white', color: '#2563eb' }}
        >
          Start Free Trial
        </PrimaryButton>
      </CTASection>
    </>
  );
};

export default Home; 