// components/Dashboard.js
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

// Componente del darshboard mostrado al usuario al hacer login
const Dashboard = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  // Funcion de flecha que maneja el logout utilizando la funcion de signOut que provee firebase y navegando a la homepage
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  // Interfaz que el usuario ve, con el boton que maneja el logout y mostrando un mensaje de bienvenida con el usuario y el email con el que se registro.
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome, {user?.email}!
        </Typography>
        <Button
          onClick={handleLogout}
          variant="contained"
          color="error"
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
