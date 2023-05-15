import { useAppDispatch } from '../app/hooks';
import { refreshToken } from '../features/auth/authSlice';

export default function useRefresh() {
  const dispatch = useAppDispatch();

  const refreshFunction = async () => {
    await dispatch(refreshToken()).unwrap();
  };

  return refreshFunction;
}
