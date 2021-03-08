import { useState } from 'react';
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

export default AppHeaderAndDrawer;