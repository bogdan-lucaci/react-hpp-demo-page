import React, { useEffect, useState } from 'react';
import SETTINGS from './Settings';
import FORM_DATA_MODEL from './data/FormDataModel';
import utils from './utils/utils';

import { Typography, Divider, Box, Container, Paper, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import BlockUI from './components/UI/Backdrop';
import SnackBarAlert from './components/UI/SnackBarAlert';
import AppHeaderAndDrawer from './components/UI/AppHeaderAndDrawer';
import Form from './components/Form';
// import InputPostUrl from './components/InputPostUrl';
import ToButtonGroup from './components/UI/ToButtonGroup';
import FormActionSelector from './components/FormActionSelector';
import FormSubmitButton from './components/FormSubmitBtn';
import OverviewPost from './components/OverviewPost';
import OverviewApp from './components/OverviewApp';
import PostsHistory from './components/PostsHistory';

import useComputedString from './services/useComputedString';


const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({ isOpen: false, text: '', type: 'info' });
  const [appState, setAppState] = useState({});
  const [postValues, setPostValues] = useState({
    // append URL params to initial values
    ...SETTINGS.initialValues.postValues, 
    ...utils.getFormModelParamsObjFromUrl()
  });
  const [postUrlData, setPostUrlData] = useState(SETTINGS.initialValues.postUrlData);

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

  // console.log('APP rendered!', postValues);
  return (
    <>
      <Box mb={2}>
        <AppHeaderAndDrawer
          // leftDrawer={<></>}
          rightDrawer={
            <>
              <PostsHistory
                setPostValues={setPostValues}
                setPostUrlData={setPostUrlData}
                setAlert={setAlert}
              />
              <OverviewApp
                appState={{
                  ...appState,
                  // 'Signature': signature,
                  // 'Computed String': computedString
                }}
              />
            </>}
        >
          <h1>GlobalPay Demo</h1>
          {/* <InputPostUrl setPostUrlData={setPostUrlData} />
          <FormSubmitButton formAction={postUrlData['formAction']} postValues={postValues} setIsLoading={setIsLoading}/> */}
        </AppHeaderAndDrawer>
      </Box>

      <Grid container>
        <Grid item xs={12} sm={8}>
          <Container maxWidth="sm">
            <Box p={0} mb={2}>
              <Box mb={1}>
                <Alert severity="info">
                  <Typography variant="caption">
                    To simulate sending a parameter with no value, please type "{SETTINGS.noValueString.toUpperCase()}" (case insesitive) in the desired input
                  </Typography>
                </Alert>
              </Box>
              <Box mb={1}>
                <ToButtonGroup>
                  <FormActionSelector
                    postUrlData={postUrlData}
                    setPostUrlData={setPostUrlData}
                  />
                  <FormSubmitButton
                    postUrlData={postUrlData}
                    postValues={postValues}
                    setIsLoading={setIsLoading}
                  />
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
            <Box p={3} textAlign="left" align="center">

              <OverviewPost
                postValues={postValues}
                postUrlData={postUrlData}
              />

            </Box>
            <Divider />
            <Box p={3} textAlign="left" align="center" /*height="29.75vh"*/>
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

      <SnackBarAlert
        open={alert['isOpen']} setOpen={setAlert} 
        text={alert['text']}
        severity={alert['type']}
      />

      {/* <BlockUI theme={theme} open={isLoading} /> */}
      <BlockUI open={isLoading} />
    </>

  );
}

export default App;