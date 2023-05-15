import { useEffect, useState } from 'react';
import { socket } from '../../socket';
import { GLOBAL_ROOM_ID } from '../../constants';
import { useForm } from 'react-hook-form';
import useUser from '../../hooks/useUser';
import styled from 'styled-components';
import { ErrorText, MediumText, SmallText } from '../../components/TextStyles';
import axios from 'axios';
import useRefresh from '../../hooks/useRefresh';
import PopNotification from '../../components/PopNotification';

interface MessageType {
  _id: string;
  body: string;
  user: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  message: string;
}

const MessageForm = styled.form`
  width: 100vw;
  height: 80px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.primaryColor};
  justify-content: space-evenly;
`;

const MessageInput = styled.input<{ submit: boolean }>`
  width: ${(props) => (props.submit ? '15%' : '70%')};
  height: 50px;
  background-color: ${(props) => props.theme.secondaryColor};
  border-radius: 25px;
  font-size: 2rem;
  color: white;
  padding: 1px 10px;
  ${(props) => props.theme.text.nanum};
`;

const MessagesSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 80px;
`;

const MessageContainer = styled.div<{ mine: boolean }>`
  display: flex;
  align-self: ${(props) => (props.mine ? 'flex-end' : 'flex-start')};
  background-color: ${(props) =>
    props.mine ? props.theme.secondaryColor : props.theme.primaryColor};
  padding: 10px;
  margin: 10px;
  flex-direction: column;
  border-radius: 10px;
`;

// const NewMessageIndicator = styled.div`
//   position: fixed;
//   bottom: 0;
//   color: ${(props) => props.theme.secondaryColor};
//   text-align: center;
// `;

export default function Chat() {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const { error: userError, isLoading: isUserLoading, user } = useUser();
  const [initError, setInitError] = useState<string>();
  const refresh = useRefresh();

  const initMessages = async () => {
    await refresh();

    const res = await axios.get(
      `http://localhost:3000/rooms/${GLOBAL_ROOM_ID}/messages`
    );
    if (res.status < 400) {
      setMessages((curr) => [...curr, ...res.data]);
    } else {
      setInitError(`${res.status} : ${res.statusText}`);
    }
  };

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on(`onMessage_${GLOBAL_ROOM_ID}`, (message) => {
      setMessages((curr) => [...curr, message]);
    });

    initMessages();

    setIsMessagesLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messages[messages.length - 1]?.user?._id === user?.id)
      window.scroll({ top: document.body.scrollHeight });
    else window.scroll({ top: document.body.scrollHeight });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const onSubmit = (data: FormData) => {
    if (!isUserLoading && !userError) {
      socket.emit('message', {
        body: data.message,
        userId: user?.id,
        roomId: GLOBAL_ROOM_ID,
      });
      reset();
    }
  };

  if (userError) {
    return <ErrorText>User Error: {userError.message}</ErrorText>;
  }

  if (initError) {
    return <ErrorText>User Error: {initError}</ErrorText>;
  }

  if (isUserLoading || isMessagesLoading) {
    return <div>Loading...</div>;
  }

  if (!isConnected) {
    return <div>Connecting... (If it doesn't load, just refresh)</div>;
  }

  return (
    <main>
      <MessagesSection>
        {messages.map((message) => {
          const isMe = message.user._id === user?.id;
          const splittedMessage = message.body.match(/.{1,25}/g);

          return (
            <MessageContainer key={message._id} mine={isMe}>
              {isMe ? <></> : <SmallText>{message.user.username}</SmallText>}
              {splittedMessage?.map((splitted, index) => (
                <MediumText key={`${message._id}_${index}`}>
                  {splitted}
                </MediumText>
              ))}
              <SmallText>
                {new Intl.DateTimeFormat('en-US', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                }).format(new Date(message.createdAt))}
              </SmallText>
            </MessageContainer>
          );
        })}
        {/* {<NewMessageIndicator>▼ New Message Arrived ▼</NewMessageIndicator> &&
          isNewMessage} */}
      </MessagesSection>
      <MessageForm onSubmit={handleSubmit(onSubmit)}>
        <MessageInput
          {...register('message', { maxLength: 2000 })}
          type="text"
          placeholder="Type any message"
          autoComplete="off"
          submit={false}
        />
        <MessageInput type="submit" value="Send" submit={true} />
      </MessageForm>
      {errors.message?.message && (
        <PopNotification>
          <ErrorText>Message Error: {errors.message.message}</ErrorText>
        </PopNotification>
      )}
    </main>
  );
}
