import { createMuiTheme } from '@material-ui/core/styles';
import { purple, blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: blue,
  },
  typography: {
    fontSize: 12
  }
});

export default theme;