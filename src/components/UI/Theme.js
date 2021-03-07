
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import useAppContext from '../../AppContextHook';

const Theme = (props) => {
    const { theme } = useAppContext('ThemeContext');
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {props.children}
        </ThemeProvider>
    )
};

export default Theme;