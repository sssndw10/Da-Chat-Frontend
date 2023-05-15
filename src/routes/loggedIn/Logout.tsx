import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetTokens } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logoutProcess = async () => {
    await dispatch(resetTokens());
  };

  useEffect(() => {
    logoutProcess();
    nav('/');
  });

  return <div>Loading</div>;
}
