import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login/Login";
import Weather from "./pages/Weather";
import EditProfile from "./pages/EditProfile/EditProfile";
import Pokemons from "./pages/Pokemons";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/pokemons" />} />
            <Route path="pokemons" element={<Pokemons />} />
            <Route path="weather" element={<Weather />} />
            <Route path="edit-profile" element={<EditProfile />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
