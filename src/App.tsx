import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Home from './routes/Home';
import Signup from './routes/loggedOut/Signup';
import Login from './routes/loggedOut/Login';
import styled from 'styled-components';
import { useAppSelector } from './app/hooks';
import { selectIsLoggedIn } from './features/auth/authSlice';
import Logout from './routes/loggedIn/Logout';
import Chat from './routes/loggedIn/Chat';

const Container = styled.div`
  background-color: ${(props) => props.theme.black.lighter};
  min-height: 100vh;
  ${(props) => props.theme.text.sourceSans}
`;
const Container2 = styled.div`
  padding-top: 100px;
`;

function App() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const AppLayout = (
    <Container>
      <Header />
      <Container2>
        <Outlet />
      </Container2>
    </Container>
  );

  const loggedOutRouter = createBrowserRouter([
    {
      element: AppLayout,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/signup',
          element: <Signup />,
        },
      ],
    },
  ]);

  const loggedInRouter = createBrowserRouter([
    {
      element: AppLayout,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/chat',
          element: <Chat />,
        },
        {
          path: '/logout',
          element: <Logout />,
        },
      ],
    },
  ]);

  return (
    <RouterProvider router={isLoggedIn ? loggedInRouter : loggedOutRouter} />
  );
}

export default App;
