import { Skeleton, Typography } from "@mui/material";
import LoginForm from "../../components/LoginForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import usePokemons from "../../hooks/usePokemons";
import * as S from "./Login.styled";

export default function Login() {
  const { isLoading, data: pokemons } = usePokemons();

  return (
    <S.MainContainer as="main">
      <S.FormContainer as="section" sx={{ padding: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Login
        </Typography>
        {isLoading || !pokemons ? (
          <Skeleton variant="text" height={200} width={500} />
        ) : (
          <LoginForm pokemons={pokemons?.results} />
        )}
      </S.FormContainer>

      <ToastContainer />
    </S.MainContainer>
  );
}
