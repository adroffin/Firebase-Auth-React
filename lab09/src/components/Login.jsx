// components/Login.js
import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

// Componente que muestra el panel de login.
const Login = () => {
  // Estados para ir guardando la informacion que ingrese el usuario en tiempo real, y errores.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Funcion de flecha que maneja el login con usuario y contraseña utilizando la funcion signInWithEmailAndPassword de Firebase.
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  //Funcion que maneja el login con el proveedor de Google, creandolo y desplegando una ventana emergente.
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  // Funcion que maneja el login con el proveedor de Github, creandolo y mostrando una ventana emergente.
  const handleGitHubSignIn = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  // Pagina de login que se le muestra al usuario.
  // Se muestra el formulario con sus respectivos inputs manejando el cambio con los estados de email y password, con su respectivo boton de login que lleva al dashboard.
  // Botones que llaman a las funciones de login con los dos distintos proveedores.
  // Boton que register que lleva a la pantalla de register.
  // Boton para la recuperacion de contraseña que navega a resetpassword.
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
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
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
            Login
          </Button>
          <Button onClick={() => navigate("/resetpassword")} variant="text">
            Forgot password?
          </Button>
        </form>
        <hr />
        <Button variant="text" fullWidth sx={{ mt: 2 }} disabled>
          You also can
        </Button>
        <Button
          onClick={handleGoogleSignIn}
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login with Google
        </Button>
        <Button
          onClick={handleGitHubSignIn}
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login with Github
        </Button>

        <Button variant="text" fullWidth sx={{ mt: 2 }} disabled>
          ¿Don't have an account?
        </Button>
        <Button
          onClick={() => navigate("/register")}
          variant="text"
          fullWidth
          sx={{ mt: 2 }}
        >
          Register
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

export default Login;
