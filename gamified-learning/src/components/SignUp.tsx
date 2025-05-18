import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  padding: 2rem;
`;

const SignUpCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`;

const Button = styled(motion.button)`
  padding: 0.75rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #1d4ed8;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #64748b;
  font-size: 0.875rem;

  a {
    color: #2563eb;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled(motion.div)`
  color: #dc2626;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 1rem;
`;

const PasswordStrengthIndicator = styled.div`
  margin-top: 0.5rem;
  height: 4px;
  background: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
`;

const StrengthBar = styled(motion.div)<{ strength: number }>`
  height: 100%;
  width: ${props => props.strength}%;
  background: ${props => {
    if (props.strength < 33) return '#ef4444';
    if (props.strength < 66) return '#f59e0b';
    return '#22c55e';
  }};
`;

const StrengthText = styled.div<{ strength: number }>`
  font-size: 0.75rem;
  color: ${props => {
    if (props.strength < 33) return '#ef4444';
    if (props.strength < 66) return '#f59e0b';
    return '#22c55e';
  }};
  margin-top: 0.25rem;
`;

const PasswordRequirements = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #64748b;
`;

const Requirement = styled.div<{ met: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${props => props.met ? '#22c55e' : '#64748b'};
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1.5rem 0;
  color: #64748b;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e2e8f0;
  }

  span {
    padding: 0 1rem;
    font-size: 0.875rem;
  }
`;

const SocialSignUpButton = styled(motion.button)`
  width: 100%;
  padding: 0.75rem;
  background: white;
  color: #1e293b;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
  }
`;

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  useEffect(() => {
    const password = formData.password;
    const newRequirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password)
    };
    setRequirements(newRequirements);

    // Calculate password strength
    const strength = Object.values(newRequirements).filter(Boolean).length * 20;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength < 60) {
      setError('Please choose a stronger password');
      return;
    }

    // For demo purposes, we'll just redirect to ParentHome
    // In a real app, you would create the account here
    navigate('/parent-dashboard');
  };

  const handleSocialSignUp = (provider: string) => {
    // For demo purposes, just redirect to ParentHome
    // In a real app, you would implement social signup here
    navigate('/parent-dashboard');
  };

  return (
    <Container>
      <SignUpCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Create Account</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
            <PasswordStrengthIndicator>
              <StrengthBar
                strength={passwordStrength}
                initial={{ width: 0 }}
                animate={{ width: `${passwordStrength}%` }}
                transition={{ duration: 0.3 }}
              />
            </PasswordStrengthIndicator>
            <StrengthText strength={passwordStrength}>
              {passwordStrength < 33 ? 'Weak' : passwordStrength < 66 ? 'Medium' : 'Strong'}
            </StrengthText>
            <PasswordRequirements>
              <Requirement met={requirements.length}>✓ At least 8 characters</Requirement>
              <Requirement met={requirements.uppercase}>✓ One uppercase letter</Requirement>
              <Requirement met={requirements.lowercase}>✓ One lowercase letter</Requirement>
              <Requirement met={requirements.number}>✓ One number</Requirement>
              <Requirement met={requirements.special}>✓ One special character</Requirement>
            </PasswordRequirements>
          </InputGroup>
          <InputGroup>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </InputGroup>
          <Button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign Up
          </Button>
        </Form>
        {error && (
          <ErrorMessage
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </ErrorMessage>
        )}
        <Divider>
          <span>or sign up with</span>
        </Divider>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <SocialSignUpButton
            onClick={() => handleSocialSignUp('google')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span role="img" aria-label="google">🔍</span>
            Google
          </SocialSignUpButton>
          <SocialSignUpButton
            onClick={() => handleSocialSignUp('facebook')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span role="img" aria-label="facebook">👥</span>
            Facebook
          </SocialSignUpButton>
        </div>
        <LoginLink>
          Already have an account?{' '}
          <Link to="/login">Log in</Link>
        </LoginLink>
      </SignUpCard>
    </Container>
  );
};

export default SignUp; 