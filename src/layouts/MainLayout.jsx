import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/ui/Navbar";
import { Navigate } from "react-router-dom";
import { useStore } from "../context/store";
import 'react-toastify/dist/ReactToastify.css';

export default function MainLayout() {
  const user = useStore((state) => state.user);
  
  if (!user) {
    return (
      <Navigate 
        to="/login"
      />
    );
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer />
    </>
  );
}
