import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/ui/Navbar";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/store";
import 'react-toastify/dist/ReactToastify.css';

export default function MainLayout() {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer />
    </>
  );
}
