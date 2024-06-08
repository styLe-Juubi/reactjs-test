import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

import { useState } from "react";
import { useStore } from "../../context/store";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout, user } = useStore((state) => state);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    if (e.target.id === "logout") {
      logout();
      navigate("/login");
    } else if (e.target.id === "edit") {
      navigate("/edit-profile");
    }
    setAnchorEl(null);
  };

  return (
    <AppBar component="nav" color="inherit" position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {user?.name || "PokeApp"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& a": {
              color: "#000",
              textDecoration: "none",
              padding: "0 1rem",
              fontStyle: "unset",
              fontWeight: "bold",
            },
          }}
        >
          <Link to="/pokemons">Mis Pokemones</Link>
          <Link to="/weather">Ver Clima</Link>

          <IconButton
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <FaRegUser />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose} id="edit">
              <Avatar />
              Editar perfil
            </MenuItem>
            <MenuItem onClick={handleClose} id="logout">
              <ListItemIcon>
                <CiLogout size={25} />
              </ListItemIcon>
              Cerrar sesión
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
