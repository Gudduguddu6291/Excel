// SaveUserToDB.jsx
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import axios from 'axios';

const SaveUserToDB = () => {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const sendUserToBackend = async () => {
      if (!isSignedIn || !user) return;

      try {
        await axios.post('http://localhost:8000/api/save-user', {
          clerkUserId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });

        console.log('✅ User info sent to backend');
      } catch (error) {
        console.error('❌ Failed to save user:', error);
      }
    };

    sendUserToBackend();
  }, [isSignedIn, user]);

  return null;
};

export default SaveUserToDB;
