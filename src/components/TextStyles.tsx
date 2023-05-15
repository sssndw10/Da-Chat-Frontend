import styled from 'styled-components';

export const LargeText = styled.div<{ inline?: boolean }>`
  ${(props) => (props.inline ? 'display: inline;' : '')}
  font-size: 2.5rem;
  color: ${(props) => props.theme.white};
`;

export const MediumText = styled.div<{ inline?: boolean }>`
  ${(props) => (props.inline ? 'display: inline;' : '')}
  font-size: 1.5rem;
  color: ${(props) => props.theme.white};
`;

export const SmallText = styled.div<{ inline?: boolean }>`
  ${(props) => (props.inline ? 'display: inline;' : '')}
  font-size: 1rem;
  color: ${(props) => props.theme.white};
`;
export const ErrorText = styled.div`
  font-size: 1rem;
  color: red;
  text-align: center;
`;
