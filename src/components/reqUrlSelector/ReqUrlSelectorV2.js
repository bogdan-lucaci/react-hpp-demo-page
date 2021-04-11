import { useState, useRef, useEffect } from 'react';
import { Box, Button, ClickAwayListener, Grow, OutlinedInput, Paper, Popper, MenuItem, MenuList } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DATA_ACCESS from '../../data/DataAccess';
import useAppContext from '../../AppContextHook';

const options = DATA_ACCESS.getPostURLs();

const ReqUrlSelector = ({ formAction, postValues, postUrlData, setPostUrlData, ...childProps }) => {

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [value, setValue] = useState(postUrlData['formAction']);
    const [urlName, setUrlName] = useState(postUrlData['postUrlName']);
    const { theme } = useAppContext('ThemeContext');

    useEffect(() => {
        setValue(() => postUrlData['formAction']);
        setUrlName(() => postUrlData['postUrlName']);
    }, [postUrlData]);

    const handleMenuItemClick = (event, index, name, url, setPostUrlData) => {
        setSelectedIndex(index || 1);

        setPostUrlData({
            formAction: url,
            postUrlName: name
        });

        setUrlName(name);

        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Button {...childProps} disabled={true} style={{ width: "30%" }}>
                {urlName /*|| options.find(url => url.ID === selectedIndex.toString()).Name.toUpperCase()*/}
            </Button>
            <Button
                {...childProps}
                color="primary"
                size="small"
                aria-controls={open ? 'split-button-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup='menu'
                ref={anchorRef}
                onClick={handleToggle}
                style={{ width: "10%" }}
            >
                <ArrowDropDownIcon />
            </Button>
            <OutlinedInput
                {...childProps}
                disabled={urlName !== 'custom'}
                value={value/* || options.find(url => url.ID === selectedIndex.toString()).URL */}
                margin="dense"
                style={{ width: '50%' }}
                inputProps={{
                    style: { textAlign: 'center', fontSize: '80%', padding: '10px 6px' }
                }}
                onClick={urlName !== 'custom' ? handleToggle : null}
                onChange={(e) => {
                    setValue(e.target.value);
                    setPostUrlData({
                        formAction: e.target.value,
                        postUrlName: 'custom'
                    });
                }}
            />
            <Popper style={{ zIndex: 1600 }} open={open} anchorEl={anchorRef.current} role={undefined} transition >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper elevation="10" style={{ border: `2px solid ${theme.palette.primary.main}` }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {options.map((option, index) => (
                                        <MenuItem
                                            style={{ fontFamily: "monospace" }}
                                            key={option.ID}
                                            //disabled={index === 2}
                                            selected={option.ID === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, option.ID, option.Name, option.URL, setPostUrlData)}
                                        >
                                            <Box minWidth="7rem" color={theme.palette.primary.main}><b>{option.Name.toUpperCase()}</b></Box>
                                            <Box>{option.URL}</Box>
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

export default ReqUrlSelector;