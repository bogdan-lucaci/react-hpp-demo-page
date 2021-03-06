import { Typography, Divider, Box, Container, Paper, Grid, Button, AppBar, Drawer, Toolbar, IconButton, Select } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputPostUrl from './InputPostUrl';
import useAppContext from '../AppContextHook';

const AppHeader = ({setOpen: setDrawerIsOpen}) => {
    const {theme} = useAppContext('ThemeContext');

    return (
        <AppBar position="static" style={theme.AppBar}>
            <Toolbar>
                <IconButton onClick={() => setDrawerIsOpen(true)} color="inherit" aria-label="Menu" style={{ marginLeft: -12, marginRight: 20, }}>
                    <MenuIcon />
                </IconButton>
                <Divider />
                <Container align="center">
                    <Typography color="inherit" style={{ flex: 1 }} >
                        <InputPostUrl />
                    </Typography>
                </Container>
                {/* <Button onClick={() => setDrawerIsOpen(true)} color="inherit">Drawer</Button> */}
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader;