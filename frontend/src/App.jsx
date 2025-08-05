import { RouterProvider } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Button, buttonVariants } from './components/ui/button'
import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/Landingpage';
import AppLayout from './layout/AppLayout';
import { ThemeProvider } from './components/Theme-provider';
import GraphPage from './pages/GraphPage';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import axios from 'axios';
import { SignIn, SignUp } from '@clerk/clerk-react';
import Dashboard from './pages/Dashboard';

export default function App() {
  
  const router =  createBrowserRouter([
    {
      element: <AppLayout/>,
      children:[
        {
          path: '/',
          element: <LandingPage/>
        },
        {
          path: '/excel-to-graph',
          element: <GraphPage/>
        },
         {
          path: '/dashboard',
          element: <Dashboard/>
        },
      ]
    }
  ])
  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} >
          <header>
            <div>
              <Button
        className={`${buttonVariants({ variant: 'default' })}`}
        />
      </div>

          </header>
        </RouterProvider>
      </ThemeProvider>
  );
}
    
