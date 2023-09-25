import React from "react";
import style from "../Tool/Style";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Avatar,
} from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import {
  actualizarUsuario,
  obtenerUsuarioActual,
} from "../../actions/UsuarioAction";
import { useStateValue } from "../../contexto/store";
import reactFoto from "../../logo.svg";
import { v4 as uuidv4 } from "uuid";
import ImageUploader from "react-images-upload";
import { obtenerDataImagen } from "../../actions/ImagenAction";

const PerfilUsuario = () => {
  const [usuario, setUsuario] = useState({
    nombreCompleto: "",
    username: "",
    email: "",
    password: "",
    confirmarPassword: "",
    imagenPerfil: null,
    fotoUrl: "",
  });

  const [{ sesionUsuario }, dispatch] = useStateValue();

  const ingresarValoresMemoria = (e) => {
    const { name, value } = e.target;
    setUsuario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  useEffect(() => {
    setUsuario(sesionUsuario.usuario);
    setUsuario((anterior) => ({
      ...anterior,
      fotoUrl: sesionUsuario.usuario.imagenPerfil,
    }));
  }, []);

  const guardarUsuario = (e) => {
    e.preventDefault();
    actualizarUsuario(usuario).then((response) => {
      if (response.status === 200) {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje: "se guardaron existosamente los cambios en Perfil Usuario",
          },
        });
        window.localStorage.setItem("token_seguridad", response.data.token);
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          openMensaje: {
            open: true,
            mensaje:
              "Errores al intentar guardar en : " +
              Object.keys(response.data.errors),
          },
        });
      }
    });
  };

  const subirFoto = (imagenes) => {
    const foto = imagenes[0];
    const fotoUrl = URL.createObjectURL(foto);

    obtenerDataImagen(foto).then((respuesta) => {
      setUsuario((anterior) => ({
        ...anterior,
        imagenPerfil: respuesta,
        fotoUrl: fotoUrl,
      }));
    });
  };

  const fotoKey = uuidv4();

  return (
    <Container component="main" maxWidth="md" justify="center">
      <div style={style.paper}>
        <Avatar
          style={style.avatar}
          src={usuario.fotoUrl || reactFoto}
        ></Avatar>
        <Typography component="h1" variant="h5">
          Perfil de Usuario
        </Typography>
        <form style={style.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                name="nombreCompleto"
                value={usuario.nombreCompleto}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Nombre y Apellidos"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="username"
                value={usuario.username}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese UserName"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                value={usuario.email}
                onChange={ingresarValoresMemoria}
                variant="outlined"
                fullWidth
                label="Ingrese Email"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="password"
                value={usuario.password}
                onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Ingrese Password"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="confirmarPassword"
                value={usuario.confirmarPassword}
                onChange={ingresarValoresMemoria}
                type="password"
                variant="outlined"
                fullWidth
                label="Confirme el Password"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <ImageUploader
                withIcon={false}
                key={fotoKey}
                singleImage={true}
                buttonText="Seleccione una imagen de perfil"
                onChange={subirFoto}
                imgExtension={[".jpg", ".jpeg", ".gif", ".png"]}
                maxFileSize={5242880}
              />
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                onClick={guardarUsuario}
                fullWidth
                variant="contained"
                size="large"
                color="primary"
                style={style.submit}
              >
                Guardar Datos
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default PerfilUsuario;
