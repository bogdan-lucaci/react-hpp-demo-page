import { useState } from 'react';
import AppHeader from './AppHeader';
import AppDrawer from './AppDrawer';

const AppHeaderAndDrawer = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(true);
    return (
        <>
            <AppHeader setOpen={setDrawerIsOpen} />
            <AppDrawer open={drawerIsOpen} setOpen={setDrawerIsOpen} />
        </>
    )
}

export default AppHeaderAndDrawer;