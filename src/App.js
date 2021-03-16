import React, { useEffect, useState, useMemo } from 'react';
import SETTINGS from './Settings';

import { Typography, Divider, Box, Container, Paper, Grid, Button, AppBar, Drawer, Toolbar, IconButton, Select } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import BlockUI from './components/UI/Backdrop';
import AppHeaderAndDrawer from './components/UI/AppHeaderAndDrawer';
import Form from './components/Form';
import InputPostUrl from './components/InputPostUrl';
import OverviewPost from './components/OverviewPost';
import OverviewApp from './components/OverviewApp';

import useAppContext from './AppContextHook';
import getComputedString from './services/getComputedString';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [appState, setAppState] = useState({});
  const [postValues, setPostValues] = useState({
    'Amount': '100',
    'Currency': 'EUR',
    'ReturnURL': 'https://demo.smart2pay.com/redirect.php'
  });
  const [postUrlData, setPostUrlData] = useState({
    formAction: 'https://apitest.smart2pay.com/',
    postUrlName: 'demo'
  });
  const DATA_ACCESS = useAppContext('DataContext');
  // get signature only when MerchantID / SiteID val changes
  const signature = useMemo(
    () => DATA_ACCESS.getSignatureForEnvAndMerchantAndSite(postUrlData['postUrlName'], postValues['MerchantID'], postValues['SiteID']),
    [postValues['MerchantID'], postValues['SiteID']]
  );
  // get computedString only when postValues or signature changes 
  // (not when theme context changes for e.g.)
  const computedString = useMemo(
    () => getComputedString(postValues, signature),
    [postValues, signature]
  );
  
  // console.log('APP rendered!'/*, postValues*/);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500)
  }, [postUrlData['formAction']]);

  return (
    <>
      <Box mb={2}>
        <AppHeaderAndDrawer>

          <InputPostUrl setPostUrlData={setPostUrlData} />

        </AppHeaderAndDrawer>
      </Box>

      <Grid container>
        <Grid item xs={12} sm={8}>
          <Container maxWidth="sm">
            {/* <Paper> */}
            <Box p={0} mb={2}>
              <Box mb={1}>
                <Alert severity="info">
                  <Typography variant="caption">
                    To simulate sending a parameter with no value in POST, please type "{SETTINGS.noValueString.toUpperCase()}" (case insesitive) in the desired input
                  </Typography>
                </Alert>
              </Box>
              <Box align="left">

                <Form
                  postValues={postValues}
                  setPostValues={setPostValues}
                  postUrlData={postUrlData}
                  appState={appState}
                  setAppState={setAppState}
                />

              </Box>
            </Box>
            {/* </Paper> */}

          </Container>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper>
            <Box p={3} textAlign="left" align="center" height="49.75vh">

              <OverviewPost
                postValues={postValues}
                postUrlData={postUrlData}
              />

            </Box>
            <Divider />
            <Box p={3} textAlign="left" align="center" height="29.75vh">
              <OverviewApp 
                appState={{
                  ...appState,
                  'Signature': signature,
                  'Computed String': computedString
                }} 
              />
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
    </>

  );
}

export default App;