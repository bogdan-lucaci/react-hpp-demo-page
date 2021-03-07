import { Snackbar } from '@material-ui/core/';
import { Alert } from '@material-ui/lab/';
import utils from '../../utils/utils'

const SnackBarAlert = ({open, setOpen, text, severity}) => {
    //const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {utils.renderHTML(text)}
            </Alert>
        </Snackbar>
    )
}

export default SnackBarAlert;