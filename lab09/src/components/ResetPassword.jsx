import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { Container, Button, Typography, Box, TextField } from "@mui/material";

// Componente de la pantalla de recuperacion de contraseña.
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Funcion que maneja la accion del boton, utilizando la funcion sendPasswordResetEmail de firebase, se muestra una alerta cuando se envia el correo.
  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("The recory mail has been sent!");
    } catch (err) {
      setError(err.message);
    }
  };

  // Pantalla que el usuario ve.
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
          Reset Password
        </Typography>
        {/* Formulario que captura el campo del email en tiempo real. */}
        <form style={{ width: "100%" }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        </form>
        {/* Boton que maneja la funcion de resetPassword */}
        <Button
          onClick={resetPassword}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Send reset password email
        </Button>
        {/* Boton que permite regresas a la homepage(login). */}
        <Button
          onClick={() => navigate("/")}
          variant="text"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Return
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ResetPassword;
