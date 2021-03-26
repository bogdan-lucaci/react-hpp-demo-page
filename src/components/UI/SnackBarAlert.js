import { Snackbar } from '@material-ui/core/';
import { Alert } from '@material-ui/lab/';
import Slide from '@material-ui/core/Slide';
import utils from '../../utils/utils'

const SnackBarAlert = ({ open, setOpen, text, severity }) => {

    function SlideLeft(props) {
        return <Slide {...props} direction="left" />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(currAlert => ({
            ...currAlert,
            isOpen: false
        }));
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            TransitionComponent={SlideLeft}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity={severity}>
                {utils.renderHTML(text)}
            </Alert>
        </Snackbar>
    )
}

export default SnackBarAlert;