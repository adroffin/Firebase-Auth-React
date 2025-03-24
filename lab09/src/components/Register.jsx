// components/Register.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

// Componente de la pantalla de register.
const Register = () => {
  // Estados para ir guardando la informacion que ingrese el usuario en tiempo real, y errores.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Funcion de flecha que manera el registro utilizando la funcion createUserWithEmailAndPassword de firebase.
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  // Pantalla de register que el usuario ve.
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
          Register
        </Typography>
        {/* Formulario con los campos del email y password que se van actualizando dinamicamente gracias a sus estados. */}
        <form onSubmit={handleRegister} style={{ width: "100%" }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>

          <Button variant="text" fullWidth sx={{ mt: 2 }} disabled>
            ¿Already have an account?
          </Button>
          {/* Boton para regresar a login si ya se posee una cuenta. */}
          <Button
            onClick={() => navigate("/")}
            variant="text"
            fullWidth
            sx={{ mt: 2 }}
          >
            LOGIN
          </Button>
        </form>
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Register;
