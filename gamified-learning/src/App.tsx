import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import styled from '@emotion/styled';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ParentHome from './components/ParentHome';
import GamifiedLearning from './components/GamifiedLearning';
import MoralStories from './components/MoralStories';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #f7fafc;
`;

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/parent-dashboard",
      element: <ParentHome />
    },
    {
      path: "/student/:childName",
      element: <GamifiedLearning />
    },
    {
      path: "/stories/:childName",
      element: <MoralStories />
    }
  ],
  {
    future: {
      v7_relativeSplatPath: true
    }
  }
);

const App: React.FC = () => {
  return (
    <AppContainer>
      <RouterProvider router={router} />
    </AppContainer>
  );
};

export default App;
