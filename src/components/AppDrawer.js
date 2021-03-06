import { Typography, Divider, Box, Container, Paper, Grid, Button, AppBar, Drawer, Toolbar, IconButton, Select } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import ThemeSwitch from './ThemeSwitch';

const AppHeaderDrawer = ({open, setOpen}) => {

    return (
        <Drawer variant="persistent" open={open} anchor="left">
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