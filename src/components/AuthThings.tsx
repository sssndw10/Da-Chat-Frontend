import styled from 'styled-components';

export const StyledInput = styled.input<{ width?: number; height?: number }>`
  width: ${(props) => props.width ?? 300}px;
  height: ${(props) => props.height ?? 40}px;
  display: block;
  color: ${(props) => props.theme.primaryColor};
  border: 1px solid ${(props) => props.theme.secondaryColor};
  border-radius: 20px;
  ${(props) => props.theme.text.nanum};
`;

export const SubmitButton = styled.input`
  width: 100px;
  height: 40px;
  background-color: ${(props) => props.theme.primaryColor};
  border: 2px solid ${(props) => props.theme.secondaryColor};
  color: ${(props) => props.theme.white};
  border-radius: 20px;
  ${(props) => props.theme.text.nanum};
`;

export const CenteredForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: calc(100vh - 400px);
  gap: 20px;
`;
