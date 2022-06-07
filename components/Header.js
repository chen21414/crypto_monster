import { AppBar, Container, MenuItem, Select, Toolbar, Typography} from '@material-ui/core'
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import React from 'react'
import { useHistory } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';

const useStyles = makeStyles(() => ({
    title: {
      flex: 1,
      color: 'gold',
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    }
}))

const Header = () => {

  const classes = useStyles()

  const history = useHistory()

  const {currency, setCurrency, user} = CryptoState();

  console.log("currency", currency);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color="transparent" position='static'>
        {/* container makes div responsive */}
        <Container>
            <Toolbar>
                <Typography 
                onClick={()=> history.push("/")}
                className={classes.title}>Crypto Monster</Typography>

                <Select variant='outlined' style={{
                  width: 100,
                  height: 40,
                  marginLeft: 15,
                }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                >
                    <MenuItem value={"USD"}>USD</MenuItem>
                    <MenuItem value={"GBP"}>GBP</MenuItem>
                </Select>

                {user? <UserSidebar/> : <AuthModal/>}
            </Toolbar>
        </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header