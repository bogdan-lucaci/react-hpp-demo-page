import { useState, useEffect } from 'react';
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplayIcon from '@material-ui/icons/Replay';
import { Tooltip } from '@material-ui/core';

import ConfirmationDialog from '../components/UI/DialogConfirmation';

// bootstrap tooltips
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

const getHistory = () => {
    const history = JSON.parse(window.localStorage.getItem('history')) || [];
    console.log(history);
    return history;
};

const PostsHistory = ({ setPostValues, setPostUrlData }) => {
    const [history, setHistory] = useState([]);

    const deleteSubmit = (submitDate) => {
        if (window.confirm('Are you sure you want to delete submit ' + submitDate + '?')) {
            setHistory(currHistory => (
                currHistory.filter(submit => submit.date !== submitDate)
            ));
            removeFromHistory(submitDate);
        }
    };

    const applySubmitToPage = ({ url: formAction, urlName: postUrlName, val: postValue }) => {
        setPostUrlData(() => ({ formAction, postUrlName }));
        setPostValues(() => postValue);
    };

    const getTooltip = ({ url: formAction, urlName, val: postValue }) => (
        <pre>
            {urlName.toUpperCase() + ' - ' + formAction}<br /><br />
            {JSON.stringify(postValue, null, '  ')}
        </pre>
    );

    useEffect(() => {
        setHistory(() => getHistory());
    }, []);

    return (
        <>
            <ConfirmationDialog></ConfirmationDialog>
            <Box mt={2} mb={2}>
                <Typography variant="h6">
                    <Box color="text.disabled">
                        History
                    </Box>
                </Typography>
                <Divider light={true} />
                <List dense={true} >
                    {history.map(submittedPost => (
                        <BootstrapTooltip title={getTooltip(submittedPost)} placement="top" arrow>
                            <ListItem>
                                <ListItemIcon>
                                    <IconButton color="primary" edge="end" onClick={() => applySubmitToPage(submittedPost)}>
                                        <ReplayIcon />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText primary={submittedPost.date/* + ' - ' + submittedPost.url*/} secondary={submittedPost.urlName.toUpperCase()} />
                                {/* <ListItemSecondaryAction> */}
                                    <IconButton color="secondary" edge="end" onClick={() => deleteSubmit(submittedPost.date)}>
                                        <DeleteIcon />
                                    </IconButton>
                                {/* </ListItemSecondaryAction> */}
                            </ListItem>
                        </BootstrapTooltip >
                    ))}

                </List>
            </Box>

        </>
    )
};

export default PostsHistory;