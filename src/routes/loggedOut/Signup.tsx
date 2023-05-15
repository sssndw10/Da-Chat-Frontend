import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAppDispatch } from '../../app/hooks';
import { setIsLoggedIn, setTokens } from '../../features/auth/authSlice';
import {
  CenteredForm,
  StyledInput,
  SubmitButton,
} from '../../components/AuthThings';
import { ErrorText, LargeText } from '../../components/TextStyles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface FormData {
  username: string;
  password: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [networkError, setNetworkError] = useState<string>();
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const onSubmit = async (data: FormData) => {
    const tokens = await axios.post('http://localhost:3000/auth/signup', data);

    if (tokens.status < 400) {
      dispatch(setTokens(tokens.data));
      dispatch(setIsLoggedIn(true));
      nav('/');
    } else {
      setNetworkError(`${tokens.status} : ${tokens.statusText}`);
    }
  };

  return (
    <CenteredForm onSubmit={handleSubmit(onSubmit)}>
      <LargeText>Sign Up</LargeText>
      <StyledInput
        {...register('username')}
        placeholder="Username"
        width={300}
        height={50}
      />
      <StyledInput
        {...register('password')}
        placeholder="Password"
        width={300}
        height={50}
      />
      <ErrorText>{'Username Error: ' && errors.username?.message}</ErrorText>
      <ErrorText>{'Password Error: ' && errors.password?.message}</ErrorText>
      <ErrorText>{'Network Error: ' && networkError}</ErrorText>
      <SubmitButton type="submit" value="siuuuuu" />
    </CenteredForm>
  );
}
