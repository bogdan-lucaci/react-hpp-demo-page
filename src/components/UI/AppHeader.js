import { Typography, Divider, Box, Container, Paper, Grid, Button, AppBar, Drawer, Toolbar, IconButton, Select } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputPostUrl from '../InputPostUrl';
import useAppContext from '../../AppContextHook';
import logo from '../../res/logo.svg';
import '../../res/logo.css';

const AppHeader = ({ setOpen: setDrawerIsOpen }) => {
    const { theme } = useAppContext('ThemeContext');

    return (
        <AppBar position="static" style={theme.AppBar}>
            <Toolbar>
                <IconButton onClick={() => setDrawerIsOpen(true)} color="inherit" aria-label="Menu" style={{ marginLeft: -12, marginRight: 20, }}>
                    <MenuIcon />
                </IconButton>
                {/* <Divider orientation="vertical" flexItem  /> */}
                <Container align="center" maxWidth="md" >
                    <InputPostUrl />
                </Container>
                <img src={logo} className="App-logo" alt="logo" style={{ maxWidth: '6rem', height: '5vh' }} />
                {/* <Button onClick={() => setDrawerIsOpen(true)} color="inherit">Drawer</Button> */}
            </Toolbar>
        </AppBar>
    )
};

export default AppHeader;