import React, { useState, useEffect } from 'react';
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ReplayIcon from '@material-ui/icons/Replay';
import { Tooltip } from '@material-ui/core';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useConfirm } from 'material-ui-confirm';
import HelpIcon from '@material-ui/icons/Help';
import Alert from '@material-ui/lab/Alert';
import useAppContext from '../AppContextHook';

import ConfirmationDialog from '../components/UI/DialogConfirmation';

// 'bootstrap like' tooltips
import { withStyles, makeStyles } from '@material-ui/core/styles';
const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
}));
const BootstrapTooltip = (props) => {
    const classes = useStylesBootstrap();
    return <Tooltip arrow classes={classes} {...props} />;
}


export const addToHistory = (postValues, postUrlData) => {
    const currentHistory = JSON.parse(window.localStorage.getItem('history')) || [];
    const currentSubmit = {
        date: new Date().toLocaleString().toString(),
        val: { ...postValues },
        url: postUrlData['formAction'],
        urlName: postUrlData['postUrlName']
    };

    window.localStorage.setItem('history', JSON.stringify(
        [...currentHistory, currentSubmit]
    ));
};

const removeFromHistory = (submitDate) => {
    const currentHistory = JSON.parse(window.localStorage.getItem('history')) || [];
    const updatedHistory = currentHistory.filter(submit => submit.date !== submitDate);
    window.localStorage.setItem('history', JSON.stringify(updatedHistory));
};

const getHistory = () => JSON.parse(window.localStorage.getItem('history')) || []

const PostsHistory = ({ setPostValues, setPostUrlData, setAlert }) => {
    const [history, setHistory] = useState([]);
    const palette = useAppContext('ThemeContext')['theme']['palette'];
    const confirm = useConfirm();

    const deleteAllSubmits = () => {
        confirm({
            title: (<>
                <Box display='flex'>
                    <Box display="flex" alignItems="center" mr={1}>
                        <HelpIcon fontSize="large" style={{ fill: palette.warning.main }} />
                    </Box>
                    Are you sure?
                </Box>
            </>),
            description: (
                <Alert severity="warning">This will delete <span style={{ color: palette.error.main }}><b>ALL</b></span> history!</Alert>
            ),
            dialogProps: { maxWidth: 'xs', align: 'center', titleStyle: { textAlign: 'center' }, },
            confirmationButtonProps: { variant: 'contained', color: 'secondary' }
        })
        .then(() => {
            setHistory([]);
            setAlert({ isOpen: true, text: 'All history cleared!', type: 'success' });
            window.localStorage.removeItem('history');
        });
        // .catch(() => { alert('you pressed NO!') });
    };

    const deleteSubmit = ({ date, val, url, urlName }) => {
        confirm({
            title: (<>
                <Box display='flex'>
                    <Box display="flex" alignItems="center" mr={1}>
                        <HelpIcon fontSize="large" style={{ fill: palette.warning.main }} />
                    </Box>
                    Are you sure?
                </Box>
            </>),
            description: (<>
                This will delete from history the request made on <br /><b>{date}</b><br />
                <h4><span style={{ color: palette.primary.main }}>{urlName.toUpperCase()} - {url}</span></h4>
                <pre>
                    {"{"}
                    {Object.keys(val).map(param => (
                        <Box key={param}>
                            &nbsp;&nbsp;&nbsp;<span style={{ color: palette.primary.main }}>{param}</span> : <span>{val[param]}</span>
                        </Box>
                    ))}
                    {"}"}
                </pre>
            </>),
            dialogProps: { maxWidth: 'xs', titleStyle: { textAlign: 'left' }, },
            confirmationButtonProps: { variant: 'contained', color: 'secondary', size: 'large' },
            cancellationButtonProps: { size: 'large' }
        })
        .then(() => {
            setHistory(currHistory => (
                currHistory.filter(submit => submit.date !== date)
            ));
            setAlert({ isOpen: true, text: `Request made on <b>${date}</b> successfully deleted!`, type: 'success' });
            removeFromHistory(date);
        });
    };

    const applySubmitToPage = ({ date, url: formAction, urlName: postUrlName, val: postValue }) => {
        setPostUrlData(() => ({ formAction, postUrlName }));
        setPostValues(() => {
            setAlert({ isOpen: true, text: `Request made on [ <b>${date}</b> ] successfully applied to form!`, type: 'success' });
            return {...postValue};
        }); 
    };

    const getTooltip = ({ date, url: formAction, urlName, val: postValue }) => {
        const jsonMarkup = (json) => (
            <>
                {"{"}
                {Object.keys(json).map(param => (
                    <Box key={param}>
                        &nbsp;&nbsp;&nbsp;<span style={{ color: palette.text.icon }}>{param}</span> : <span>{json[param]}</span>
                    </Box>
                ))}
                {"}"}
            </>
        );

        return (
            <pre style={{ fontSize: '.7rem' }}>
                <span style={{ color: palette.text.icon }}>{date}</span><br />
                <span style={{ color: palette.primary.main, fontWeight: 'bold' }}>{urlName.toUpperCase() + ' - ' + formAction}</span><br /><br />
                {/* {JSON.stringify(postValue, null, '  ')} */}
                {jsonMarkup(postValue)}
            </pre>
        )
    };

    useEffect(() => {
        setHistory(() => getHistory());
    }, []);

    return (
        <>
            {/* <ConfirmationDialog></ConfirmationDialog> */}
            <Box mb={2}>
                <Box display='flex'>
                    <Box color="text.disabled" display="flex" alignItems="center" flexGrow={1}>
                        <Typography variant="h6">
                            History
                        </Typography>
                    </Box>
                    <BootstrapTooltip title="Delete ALL history" placement="top" arrow>
                        <IconButton disabled={history.length ? false : true} color="secondary" edge="end" onClick={deleteAllSubmits}>
                            <DeleteIcon />
                        </IconButton>
                    </BootstrapTooltip>
                </Box>

                <Divider light={true} />
                {history.length
                    ?
                    <SimpleBar forceVisible="y" autoHide={false} style={{ maxHeight: '40vh' }}>
                        <List dense={true} >
                            {history.map(submittedPost => (
                                <BootstrapTooltip key={submittedPost.date} title={getTooltip(submittedPost)} placement="top" arrow>
                                    <ListItem>
                                        <ListItemIcon>
                                            <IconButton color="primary" edge="end" onClick={() => applySubmitToPage(submittedPost)}>
                                                <ReplayIcon />
                                            </IconButton>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={submittedPost.urlName.toUpperCase()}
                                            primaryTypographyProps={{
                                                style: { color: palette.text.icon }
                                            }}
                                            secondary={submittedPost.date/* + ' - ' + submittedPost.url*/}
                                            secondaryTypographyProps={{
                                                style: { color: palette.primary.main }
                                            }}
                                        />
                                        {/* <ListItemSecondaryAction> */}
                                        <IconButton color="secondary" edge="end" onClick={() => deleteSubmit(submittedPost)}>
                                            <DeleteOutlinedIcon />
                                        </IconButton>
                                        {/* </ListItemSecondaryAction> */}
                                    </ListItem>
                                </BootstrapTooltip >
                            ))}

                        </List>
                    </SimpleBar>
                    :
                    <Box mt={1}>
                        <Alert severity="info">No history recorded yet.</Alert>
                    </Box>
                }
            </Box>

        </>
    )
};

// <PostsHistory> may always be cached bcause items are added to it only on submit (so the page refreshes)
export default React.memo(PostsHistory, () => true);