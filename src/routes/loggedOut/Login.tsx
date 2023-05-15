import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAppDispatch } from '../../app/hooks';
import { setIsLoggedIn, setTokens } from '../../features/auth/authSlice';
import { ErrorText, LargeText } from '../../components/TextStyles';
import {
  CenteredForm,
  StyledInput,
  SubmitButton,
} from '../../components/AuthThings';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

interface FormData {
  username: string;
  password: string;
}

const NoAccount = styled.div`
  color: ${(props) => props.theme.secondaryColor};
  font-size: 1rem;
`;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [networkError, setNetworkError] = useState<string>();
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const onSubmit = async (data: FormData) => {
    const tokens = await axios.post('http://localhost:3000/auth/login', data);

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
      <LargeText>Log In</LargeText>
      <StyledInput
        {...register('username', { maxLength: 20 })}
        placeholder="Username"
        width={300}
        height={50}
      />
      <StyledInput
        {...register('password', { minLength: 8 })}
        placeholder="Password"
        type="password"
        width={300}
        height={50}
      />
      <ErrorText>{'Username Error: ' && errors.username?.message}</ErrorText>
      <ErrorText>{'Password Error: ' && errors.password?.message}</ErrorText>
      <ErrorText>{'Network Error: ' && networkError}</ErrorText>
      <SubmitButton type="submit" value="siuuuuu" />
      <Link to="/signup">
        <NoAccount>Don't have an account?</NoAccount>
      </Link>
    </CenteredForm>
  );
}
