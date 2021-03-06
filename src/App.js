import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import Theme from './components/Theme';
import useThemeSwitch from './components/ThemeHook';

import BlockUI from './components/Backdrop';

import { Typography, Divider, Box, Container, Paper, Grid, Button, AppBar, Drawer, Toolbar, IconButton, Select } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import AppHeaderAndDrawer from './components/AppHeaderAndDrawer';


import SETTINGS from './Settings';
import DataAccess from './data/DataAccess';


export const DataContext = React.createContext();
export const ThemeContext = React.createContext();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [themeName, theme, setThemeName] = useThemeSwitch();

  

  useEffect(
    () => {
      console.log('APP rendered!');
      return (setTimeout(() => setIsLoading(false), 500))
    }
  );
 
  return (
    <DataContext.Provider value={DataAccess}>
      <ThemeContext.Provider value={{themeName, theme, setThemeName}}>
      <Theme theme={theme}>
        <Box mb={2}>
          <AppHeaderAndDrawer />
        </Box>

        <Grid container>
          <Grid item xs={12} sm={8}>
            <Container maxWidth="sm">
              <Container align="center">
                <img src={logo} className="App-logo" alt="logo" style={{ maxWidth: '6rem', height: '10vh' }} />

              </Container>
              <Box mb={1}>
                <Alert severity="info">
                  <Typography variant="caption">
                    To simulate sending a parameter with no value in POST, please type "{SETTINGS.noValueString.join('" or "')}" in the desired input
                </Typography>
                </Alert>
              </Box>
              <Paper>
                <Box mb={1} p={3} align="left">

                </Box>
              </Paper>

            </Container>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper>
              <Box p={3} textAlign="left" align="center" height="49.75vh">
                {/* <DisplayPost text={formValues} /> */}
              </Box>
              <Divider />
              <Box p={3} textAlign="left" align="center" height="49.75vh">
                {/* <DisplaySubmitted 
                history={history} 
                setFormValues={setFormValues} 
                setAlertOpen={setOpenAlert}
                setAlertText={setAlertText}
                setAlertType={setAlertType}
                blockUI={setIsLoading}      
              /> */}
              </Box>
            </Paper>
          </Grid>


        </Grid>

        {/* <BlockUI theme={theme} open={isLoading} /> */}
        <BlockUI open={isLoading} />

      </Theme>
      </ThemeContext.Provider>
    </DataContext.Provider>
  );
}

export default App;