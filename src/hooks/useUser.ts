import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectIsLoggedIn } from '../features/auth/authSlice';
import axios from 'axios';
import { User } from '../app/types';
import { useLocation } from 'react-router-dom';
import useRefresh from './useRefresh';
import {} from 'redux';
import { store } from '../app/store';

export default function useUser() {
  const refresh = useRefresh();
  const location = useLocation();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | undefined>();
  const [error, setError] = useState<Error | null>(null);

  const getUser = async () => {
    await refresh();

    if (isLoggedIn) {
      const tokens = store.getState().auth.tokens;
      const res = await axios.get('http://localhost:3000/auth/profile', {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });

      if (res.status === 200) {
        setUser(res.data);
      } else {
        setError(Error(`${res.status} ${res.statusText}`));
        setUser(undefined);
      }
    }
  };

  useEffect(() => {
    getUser();
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return {
    isLoading,
    user,
    error,
  };
}
