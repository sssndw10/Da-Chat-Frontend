import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectIsLoggedIn, setIsLoggedIn } from '../features/auth/authSlice';
import { SmallText } from './TextStyles';
import { useEffect } from 'react';

const HeaderContainer = styled.nav`
  position: fixed;
  height: 100px;
  width: 100vw;
  background-color: ${(props) => props.theme.black.darker};
  display: flex;
  align-items: center;

  ${(props) => props.theme.text.sigmar}
`;

const Logo = styled.img`
  padding: 10px;
`;

const DaThing = styled.div`
  width: 15%;
  text-align: center;
  vertical-align: baseline;
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.primaryColor};
  font-size: 3rem;
`;

const AuthContainer = styled.div`
  position: absolute;
  width: 200px;
  right: 0;
  color: ${(props) => props.theme.white};
  font-size: 1.5rem;
`;

class LinksFactory {
  static createHeader(isLoggedIn: boolean) {
    if (isLoggedIn) {
      return (
        <>
          <DaThing>
            <StyledLink to="/">Home</StyledLink>
          </DaThing>
          <DaThing>
            <StyledLink to="/chat">Chat</StyledLink>
          </DaThing>
          <DaThing>
            <StyledLink to="/logout">Logout</StyledLink>
          </DaThing>
        </>
      );
    } else {
      return (
        <>
          <DaThing>
            <StyledLink to="/">Home</StyledLink>
          </DaThing>
          <DaThing>
            <StyledLink to="/login">Login</StyledLink>
          </DaThing>
          <DaThing>
            <StyledLink to="/signup">Signup</StyledLink>
          </DaThing>
        </>
      );
    }
  }
}

export default function Header() {
  const { error, isLoading, user } = useUser();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <HeaderContainer>
      <Link to="/">
        <Logo
          src={process.env.PUBLIC_URL + '/logo.png'}
          alt="logo"
          height={75}
        />
        <SmallText inline={true}>Beta</SmallText>
      </Link>
      {LinksFactory.createHeader(isLoggedIn)}
      <AuthContainer>
        {isLoggedIn ? `Hi ${user?.username}!` : 'Logged Out'}
      </AuthContainer>
    </HeaderContainer>
  );
}
