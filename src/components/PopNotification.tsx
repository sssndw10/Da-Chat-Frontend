import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

const NotificationContainer = styled.div`
  background-color: rgba(92, 92, 92, 0.6);
  width: 350px;
  height: 150px;
  z-index: 999;
  position: absolute;
  bottom: 50px;
  right: 50px;
`;

const XButton = styled.button`
  width: 50px;
  height: 50px;
  color: white;
  font-size: 3rem;
  top: 0;
  right: 0;
  position: absolute;
`;

export default function PopNotification({ children }: Props) {
  return (
    <NotificationContainer>
      <XButton>✕</XButton>
      {children}
    </NotificationContainer>
  );
}
