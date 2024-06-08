import { Box } from "@mui/material";
import styled from "@emotion/styled";

export const MainContainer = styled(Box)`
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  width: 35rem;
  max-width: 80%;
  border-radius: 2px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;
