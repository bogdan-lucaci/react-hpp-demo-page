import { Backdrop, CircularProgress } from '@material-ui/core';
import { useContext } from 'react';
import { ThemeContext } from '../App';

const BlockUI = ({ open }) => {
    //const theme = useContext(ThemeContext);
    const { theme } = useContext(ThemeContext);

    return (
        <Backdrop style={{ zIndex: theme.zIndex.drawer + 1 }} open={open} /*transitionDuration={1000}*/>
            <CircularProgress color="secondary" size={100} />
            {/* <img src={logo} className="App-logo" alt="logo" style={{ height: '20vh' }} /> */}
        </Backdrop>
    )
};

export default BlockUI;