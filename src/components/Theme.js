
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';

const Theme = (props) => (
    <ThemeProvider theme={props.theme}>
        <CssBaseline />
        {props.children}
    </ThemeProvider>
)

export default Theme;