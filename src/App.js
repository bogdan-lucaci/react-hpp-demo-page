import React, { useEffect, useState } from 'react';
import SETTINGS from './Settings';

import { Typography, Divider, Box, Container, Paper, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import BlockUI from './components/UI/Backdrop';
import AppHeaderAndDrawer from './components/UI/AppHeaderAndDrawer';
import Form from './components/Form';
// import InputPostUrl from './components/InputPostUrl';
import ToButtonGroup from './components/UI/ToButtonGroup';
import FormActionSelector from './components/FormActionSelector';
import FormSubmitButton from './components/FormSubmitBtn';
import OverviewPost from './components/OverviewPost';
import OverviewApp from './components/OverviewApp';

import useComputedString from './services/useComputedString';


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

  // get hash from custom hook "useComputedString" 
  const hash = useComputedString(postUrlData, postValues, appState, setAppState);
  useEffect(() => {
    setPostValues(postValues => ({
      ...postValues,
      'Hash': hash
    }))
  }, hash);

  // block UI with loader for various events
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500)
  }, [postUrlData['postUrlName']]);

  //console.log('APP rendered!', postValues);
  return (
    <>
      <Box mb={2}>
        <AppHeaderAndDrawer>
          <h1>GlobalPay Demo</h1>
          {/* <InputPostUrl setPostUrlData={setPostUrlData} />
          <FormSubmitButton formAction={postUrlData['formAction']} postValues={postValues} /> */}
        </AppHeaderAndDrawer>
      </Box>

      <Grid container>
        <Grid item xs={12} sm={8}>
          <Container maxWidth="sm">
            <Box p={0} mb={2}>
              <Box mb={1}>
                <Alert severity="info">
                  <Typography variant="caption">
                    To simulate sending a parameter with no value in POST, please type "{SETTINGS.noValueString.toUpperCase()}" (case insesitive) in the desired input
                  </Typography>
                </Alert>
              </Box>
              <Box mb={1}>
                <ToButtonGroup>
                  <FormActionSelector setPostUrlData={setPostUrlData} />
                  <FormSubmitButton formAction={postUrlData['formAction']} postValues={postValues} />
                </ToButtonGroup>
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
                  // 'Signature': signature,
                  // 'Computed String': computedString
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