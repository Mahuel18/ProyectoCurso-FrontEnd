import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';
import { Grid } from '@material-ui/core';
import Login from './componentes/seguridad/Login';
import PerfilUsuario from './componentes/seguridad/PerfilUsuario';
import RegistrarUsuario from './componentes/seguridad/RegistrarUsuario';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AppNavbar from './componentes/navegacion/AppNavbar';

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <AppNavbar />
        <Grid container>
          <Switch>
            <Route exact path="/auth/login" component={Login} />
            <Route exact path="/auth/registrar" component={RegistrarUsuario} />
            <Route exact path="/auth/perfil" component={PerfilUsuario} />
            <Route exact path="/" component={PerfilUsuario} />
          </Switch>
        </Grid>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;