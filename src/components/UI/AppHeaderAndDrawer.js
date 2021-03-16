import React, { useState } from 'react';
import AppHeader from './AppHeader';
import AppDrawer from './AppDrawer';

// main reason for this component's existance is to move the "drawerIsOpen" state from <App>
const AppHeaderAndDrawer = ({ children }) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    return (
        <>
            <AppHeader setOpen={setDrawerIsOpen} children={children} />
            <AppDrawer open={drawerIsOpen} setOpen={setDrawerIsOpen} />
        </>
    )
}

// we know the content inside the header and drawer never changes so we may force React.memo to cache it
export default React.memo(AppHeaderAndDrawer, () => true);