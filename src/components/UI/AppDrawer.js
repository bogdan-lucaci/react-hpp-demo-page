import { Divider, Box, Drawer, IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import useAppContext from '../../AppContextHook';

const AppHeaderDrawer = ({open, setOpen, position, children}) => {
    const {theme} = useAppContext('ThemeContext');
    
    return (
        <Drawer 
            //classes={{ paper: styles.paper }}
            style={theme.AppBar}
            variant="persistent" 
            open={open} 
            anchor={position}
            PaperProps={{ elevation: 5 }} 
            SlideProps={{
                style: { maxWidth: '30%' }
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