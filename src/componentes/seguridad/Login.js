import React from 'react';
import style from '../Tool/Style';
import { Avatar, Button, Container, TextField, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useState } from 'react';
import { loginUsuario } from '../../actions/UsuarioAction';

const Login = () => {

    const [usuario, setUsuario] = useState({
        Email: '',
        Password : ''    
    })

    const ingresarValoresMemoria = e => {
        const { name, value} = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name] : value
        }))
    }

    const loginUsuarioboton = e => {
        e.preventDefault();
        loginUsuario(usuario).then(response => {
            console.log('login exitoso', response);
            window.localStorage.setItem('token_seguridad', response.data.token);
        })
    }

    return (
        <Container maxWidth="xs">
            <div style ={style.paper}>
                <Avatar style={style.avatar}>
                    <LockOutlinedIcon style={style.icon} />
                </Avatar>
                <Typography component ="h1" variant ="h5">
                    Login de Usuario
                </Typography>
                <form style={style.form}>
                    <TextField variant="outlined" label="Ingrese Username" name="Email" value = {usuario.Email} onChange= {ingresarValoresMemoria} fullWidth margin="normal" />
                    <TextField variant="outlined" type="password" label="Ingrese Password" name="Password" value = {usuario.Password} onChange= {ingresarValoresMemoria} fullWidth margin="normal" />
                    <Button type="submit" onClick={loginUsuarioboton} fullWidth variant="contained" color="primary" style={style.submit}>Enviar</Button>
                </form>
            </div>
        </Container>
    );
};

export default Login;