import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import AppHeader from './AppHeader';
import AppDrawer from './AppDrawer';

// main reason for this component's existance is to move the "drawerIsOpen" state from <App>
const AppHeaderAndDrawer = ({ children, leftDrawer, rightDrawer }) => {
    const [leftDrawerIsOpen, setLeftDrawerIsOpen] = useState(false);
    const [rightDrawerIsOpen, setRightDrawerIsOpen] = useState(false);
    return (
        <>
            <AppHeader setLeftDrawerIsOpen={setLeftDrawerIsOpen} setRightDrawerIsOpen={setRightDrawerIsOpen} >
                {/* <Box
                    //border={1}
                    //borderColor="grey.400"            
                    borderRadius={12}
                    //bgcolor="text.disabled"
                    //bgcolor="primary.light"
                    p="1rem"
                    // display="flex"
                    // justifyContent="center"
                    // alignItems="center"
                    width="100%"

                >
                    <ButtonGroup
                        size="large"
                        color="primary"
                        fullWidth={true}
                        aria-label="large outlined primary button group"
                        style={{ width: "100%" }}
                        variant="outlined"
                    > */}
                        {children}
                    {/* </ButtonGroup>
                </Box> */}
            </AppHeader>
            <AppDrawer open={leftDrawerIsOpen} setOpen={setLeftDrawerIsOpen} position="left">
                <Box align="center" pl={2} pr={2} >
                    {leftDrawer}
                </Box>
            </AppDrawer>
            <AppDrawer open={rightDrawerIsOpen} setOpen={setRightDrawerIsOpen}  position="right">
                <Box align="left" pl={2} pr={2} >
                    {rightDrawer}
                </Box>
            </AppDrawer>
        </>
    )
}

// we know the content inside the header and drawer never changes so we may force React.memo to cache it
export default AppHeaderAndDrawer;