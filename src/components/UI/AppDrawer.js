import { Divider, Box, Drawer, IconButton } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import ThemeSwitch from './ThemeSwitch';
import useAppContext from '../../AppContextHook';

const AppHeaderDrawer = ({open, setOpen}) => {
    const {theme} = useAppContext('ThemeContext');
    
    return (
        <Drawer 
            //classes={{ paper: styles.paper }}
            style={theme.AppBar}
            variant="persistent" 
            open={open} 
            anchor="left"
        >
            <Box m={1} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton onClick={() => setOpen(false)}>
                    <ChevronLeft />
                </IconButton>
            </Box>
            <Divider />
            <Box pt={1}>
                {/* <ThemeSwitch currentThemeName={themename} currentTheme={theme} onclick={setThemeName} /> */}
                <ThemeSwitch />
            </Box>
            <Divider />
        </Drawer>
    )
};

export default AppHeaderDrawer;