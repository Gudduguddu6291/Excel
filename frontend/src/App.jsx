import { RouterProvider } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Button, buttonVariants } from './components/ui/button'
import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AppLayout from './layout/AppLayout';
import { ThemeProvider } from './components/Theme-provider';
import GraphPage from './pages/GraphPage';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import axios from 'axios';

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
        }
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