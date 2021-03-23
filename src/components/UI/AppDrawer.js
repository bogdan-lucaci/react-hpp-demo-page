import { Divider, Box, Drawer, IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import useAppContext from '../../AppContextHook';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('xs')]: {
            maxWidth: '80%'
        },
        [theme.breakpoints.up('sm')]: {
            maxWidth: '55%'
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '40%'
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: '25%'
        }        
    },
}));


const AppHeaderDrawer = ({ open, setOpen, position, children }) => {
    const classes = useStyles();
    const { theme } = useAppContext('ThemeContext');

    // const downSm = useMediaQuery(theme.breakpoints.down('sm'));    

    return (
        <Drawer
            variant="persistent"
            open={open}
            anchor={position}
            PaperProps={{ elevation: 5 }}
            SlideProps={{
                // style: { maxWidth: downSm ? '75%' : '35%' },
                style:theme.AppBar.Drawer,
                classes: {
                    root: classes.root
                },
            }}
        >
            <Box m={1} style={{ display: 'flex', alignItems: 'center', justifyContent: position === 'left' ? 'center' : 'flex-start' }}>
                <IconButton onClick={() => setOpen(false)}>
                    {position === 'left' && <ChevronLeft />}
                    {position === 'right' && <ChevronRight />}
                </IconButton>
            </Box>
            <Divider />
            <Box pt={1}>
                {children}
            </Box>

        </Drawer>
    )
};

export default AppHeaderDrawer;