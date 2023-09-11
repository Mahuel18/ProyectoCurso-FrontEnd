import React from 'react';
import style from '../Tool/Style';
import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { actualizarUsuario, obtenerUsuarioActual } from '../../actions/UsuarioAction';

const PerfilUsuario = () =>  {

    const [usuario, setUsuario] = useState({
        nombreCompleto : '',
        username: '',
        email : '',
        password: '',
        confirmarPassword: ''
    })

    const ingresarValoresMemoria = e => {
        const {name, value} = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    useEffect(() =>{
        obtenerUsuarioActual().then(response => {
            console.log('esta es la data del objeto reponse del usuario actual', response);
            setUsuario(response.data);
        });
    }, [])

    const guardarUsuario = e => {
        e.preventDefault();
        actualizarUsuario(usuario).then(response => {
            console.log("el usuario se actualizo correctamente", usuario);
            window.localStorage.setItem("token_seguridad", response.data.token);
        })
    }



    return (
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Typography component="h1" variant="h5">
                    Perfil de Usuario
                </Typography>
            </div>
            <form style={style.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <TextField name="nombreCompleto" value={usuario.nombreCompleto} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese Nombre y Apellidos" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField name="username" value={usuario.username} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese UserName" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField name="email" value={usuario.email} onChange={ingresarValoresMemoria} variant="outlined" fullWidth label="Ingrese Email" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField name="password" value={usuario.password} onChange={ingresarValoresMemoria} type="password" variant="outlined" fullWidth label="Ingrese Password" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField name="confirmarPassword" value={usuario.confirmarPassword} onChange={ingresarValoresMemoria} type="password" variant="outlined" fullWidth label="Confirme el Password" />
                    </Grid>
                </Grid>
                <Grid container justify="center">
                    <Grid item xs={12} md={6}>
                        <Button type="submit" onClick ={guardarUsuario} fullWidth variant="contained" size="large" color="primary" style={style.submit}>
                            Guardar Datos
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};
    

export default PerfilUsuario;
