import React, { useState } from 'react';
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

const LoginCard = styled(motion.div)`
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

const SignUpLink = styled.div`
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

const SocialLoginButton = styled(motion.button)`
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

const RememberMeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: -0.5rem;
`;

const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
  cursor: pointer;
`;

const ForgotPasswordLink = styled(Link)`
  color: #2563eb;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // For demo purposes, we'll just redirect to ParentHome
    // In a real app, you would validate credentials here
    navigate('/parent-dashboard');
  };

  const handleSocialLogin = (provider: string) => {
    // For demo purposes, just redirect to ParentHome
    // In a real app, you would implement social login here
    navigate('/parent-dashboard');
  };

  return (
    <Container>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Welcome Back</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </InputGroup>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <RememberMeGroup>
              <Checkbox
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Label htmlFor="rememberMe" style={{ margin: 0 }}>Remember me</Label>
            </RememberMeGroup>
            <ForgotPasswordLink to="/forgot-password">
              Forgot password?
            </ForgotPasswordLink>
          </div>
          <Button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Log In
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
          <span>or continue with</span>
        </Divider>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <SocialLoginButton
            onClick={() => handleSocialLogin('google')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span role="img" aria-label="google">🔍</span>
            Google
          </SocialLoginButton>
          <SocialLoginButton
            onClick={() => handleSocialLogin('facebook')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span role="img" aria-label="facebook">👥</span>
            Facebook
          </SocialLoginButton>
        </div>
        <SignUpLink>
          Don't have an account?{' '}
          <Link to="/signup">Sign up</Link>
        </SignUpLink>
      </LoginCard>
    </Container>
  );
};

export default Login; 