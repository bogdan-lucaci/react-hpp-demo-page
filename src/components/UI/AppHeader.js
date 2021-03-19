import { Container, AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import useAppContext from '../../AppContextHook';
import logo from '../../res/logo_noPadding.svg';
import '../../res/logo.css';

const AppHeader = ({ setOpen: setDrawerIsOpen, children }) => {
    const { theme } = useAppContext('ThemeContext');

    return (
        <AppBar position="static" style={theme.AppBar}>
            <Toolbar>
                <IconButton onClick={() => setDrawerIsOpen(true)} color="inherit" aria-label="Menu" style={{ marginLeft: -12, marginRight: 20, }}>
                    <MenuIcon />
                </IconButton>
                {/* <Divider orientation="vertical" flexItem  /> */}

                <Container align="center" maxWidth="md" style={{color: theme.palette.primary.main}} >
                    {children}
                </Container>
                
                <IconButton onClick={() => setDrawerIsOpen(true)} color="inherit" aria-label="Menu" style={{ marginLeft: -12, marginRight: 20, }}>
                    <img src={logo} className="App-logo" alt="logo" style={{ height: '2rem' }} />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
};

export default AppHeader;