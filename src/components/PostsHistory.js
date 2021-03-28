import React, { useState, useEffect } from 'react';
import { Avatar, Box, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, TextField, Typography } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import DateRangeIcon from '@material-ui/icons/DateRange';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ReplayIcon from '@material-ui/icons/Replay';
import { Tooltip } from '@material-ui/core';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { useConfirm } from 'material-ui-confirm';
import DateTimeRangePicker from '../components/UI/DateTimeRangePicker';
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
        date: new Date(),
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

const getHistory = (period) => {
    const allHistory = JSON.parse(window.localStorage.getItem('history')) || [];


    if (period && period.start && period.end && allHistory.length) {
        const periodStart = new Date(period.start);
        const periodEnd = new Date(period.end);

        return allHistory.filter(submit => {
            const submitDate = new Date(submit.date);
            return (periodStart <= submitDate && submitDate <= periodEnd)
        });
    }
    else
        return allHistory;
};

const getDisplayDate = date => date.toLocaleString('en-GB');//.slice(0,-3);

// change date format from "dd/MM/yyyy HH:mm" to "yyyy/MM/dd HH:mm"
const convertDate = dateString => {
    const dateParts = dateString.split(' ')[0].split('/');
    return dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0] + ' ' + dateString.split(' ')[1];
}

const PostsHistory = ({ setPostValues, setPostUrlData, setAlert }) => {
    const [history, setHistory] = useState([]);
    const [visibleHistory, setVisibleHistory] = useState([]);
    const [visibleHistoryPeriod, setVisibleHistoryPeriod] = useState({ start: new Date(Date.now() - 86400000), end: new Date() });
    const [visibleHistoryPeriodTouched, setVisibleHistoryPeriodTouched] = useState(false);
    const palette = useAppContext('ThemeContext')['theme']['palette'];
    const dialog = useConfirm();

    const deleteAllSubmits = () => {
        dialog({
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
            confirmationButtonProps: { size: 'large', variant: 'contained', color: 'secondary' },
            cancellationButtonProps: { size: 'large' }
        })
            .then(() => {
                setHistory([]);
                setAlert({ isOpen: true, text: 'All history cleared!', type: 'success' });
                window.localStorage.removeItem('history');
            });
        // .catch(() => { alert('you pressed NO!') });
    };

    const deleteSubmit = ({ date, val, url, urlName }) => {
        dialog({
            title: (<>
                <Box display='flex'>
                    <Box display="flex" alignItems="center" mr={1}>
                        <HelpIcon fontSize="large" style={{ fill: palette.warning.main }} />
                    </Box>
                    Are you sure?
                </Box>
            </>),
            description: (<>
                This will delete from history the request made on <br /><b>{getDisplayDate(new Date(date))}</b><br />
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
            confirmationButtonProps: { size: 'large', variant: 'contained', color: 'secondary' },
            cancellationButtonProps: { size: 'large' }
        })
            .then(() => {
                setHistory(currHistory => (
                    currHistory.filter(submit => submit.date !== date)
                ));
                setAlert({ isOpen: true, text: `Request made on [ <b style={{color: palette.secondary.main}}>${date}</b> ] successfully deleted!`, type: 'success' });
                removeFromHistory(date);
            });
    };

    const applySubmitToPage = ({ date, url: formAction, urlName: postUrlName, val: postValue }) => {
        setPostUrlData(() => ({ formAction, postUrlName }));
        setTimeout(() => {
            setPostValues(() => {
                setAlert({ isOpen: true, text: `Request made on [ <b>${getDisplayDate(new Date(date))}</b> ] successfully applied to form!`, type: 'success' });
                return { ...postValue };
            });
        }, 0);
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
                <span style={{ color: palette.text.icon }}>{getDisplayDate(new Date(date))}</span><br />
                <span style={{ color: palette.primary.main, fontWeight: 'bold' }}>{urlName.toUpperCase() + ' - ' + formAction}</span><br /><br />
                {/* {JSON.stringify(postValue, null, '  ')} */}
                {jsonMarkup(postValue)}
            </pre>
        )
    };

    const handleViewHistoryPeriod = () => {
        setVisibleHistoryPeriodTouched(true);
        dialog({
            title: (<>
                <Box display='flex'>
                    <Box display="flex" alignItems="center" mr={1}>
                        <HelpIcon fontSize="large" style={{ fill: palette.info.main }} />
                    </Box>
                    History Display Period
                </Box>
            </>),
            description: (
                <DateTimeRangePicker
                    idStart="history-start-view-period"
                    idEnd="history-end-view-period"
                    period={visibleHistoryPeriod}
                    setPeriod={setVisibleHistoryPeriod}
                />
            ),
            dialogProps: { maxWidth: 'xs', align: 'center', titleStyle: { textAlign: 'center' }, },
            confirmationButtonProps: { disabled: false, size: 'large', variant: 'contained' },
            cancellationButtonProps: { size: 'large' }
        })
            .then(() => {
                const newPeriod = {
                    start: new Date(convertDate(document.getElementById('history-start-view-period').value)),
                    end: new Date(convertDate(document.getElementById('history-end-view-period').value))
                };
                setVisibleHistoryPeriod(newPeriod);
            });
    };


    useEffect(() => {
        setHistory(() => getHistory());
    }, []);

    useEffect(() => {
        setVisibleHistory(() => getHistory(visibleHistoryPeriod));
        if (visibleHistoryPeriodTouched) {
            setAlert({ isOpen: true, text: `History display period updated to [ <b>${getDisplayDate(visibleHistoryPeriod['start'])}</b> - <b>${getDisplayDate(visibleHistoryPeriod['end'])}</b> ] !`, type: 'info' });
        }
    }, [visibleHistoryPeriod]);

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
                    <Box mr={1}>
                        <BootstrapTooltip title="View history for a specific period" placement="top" arrow>
                            <IconButton disabled={history.length ? false : true} color="primary" edge="end" onClick={handleViewHistoryPeriod}>
                                <EventAvailableIcon />
                            </IconButton>
                        </BootstrapTooltip>
                    </Box>
                    <Box mr={1}>
                        <BootstrapTooltip title="Delete history for a specific period" placement="top" arrow>
                            <IconButton disabled={history.length ? false : true} color="secondary" edge="end" onClick={() => alert('coming soon')}>
                                <EventBusyIcon />
                            </IconButton>
                        </BootstrapTooltip>
                    </Box>
                    <Box>
                        <BootstrapTooltip title="Delete ALL history" placement="top" arrow>
                            <IconButton disabled={history.length ? false : true} color="secondary" edge="end" onClick={deleteAllSubmits}>
                                <DeleteIcon />
                            </IconButton>
                        </BootstrapTooltip>
                    </Box>
                </Box>

                <Divider light={true} />
                {history.length
                    ?
                    <>
                        {visibleHistory.length
                            ?
                            <>
                                <Typography align="center" variant="caption" display="block" gutterBottom={true} style={{ color: palette.text.icon }}>
                                    {(history.length !== visibleHistory.length)
                                        ? <Box mt={1}>Showing <b style={{ color: palette.secondary.main }}>{visibleHistory.length}</b> of <b style={{ color: palette.secondary.main }}>{history.length}</b> entries<br />from [<b style={{ color: palette.primary.main }}> {getDisplayDate(visibleHistoryPeriod['start'])} </b>] to [<b style={{ color: palette.primary.main }}> {getDisplayDate(visibleHistoryPeriod['end'])} </b>]</Box>
                                        : <Box mt={1}>Showing all entries</Box>
                                    }
                                </Typography>
                                <SimpleBar forceVisible="y" autoHide={false} style={{ maxHeight: '40vh' }}>
                                    <List dense={true} >
                                        {visibleHistory.reverse().map(submittedPost => (
                                            <BootstrapTooltip key={submittedPost.date + Math.floor(Math.random() * 100)} title={getTooltip(submittedPost)} placement="top" arrow>
                                                <ListItem style={{ paddingLeft: "0" }}>
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
                                                        secondary={getDisplayDate(new Date(submittedPost.date))/* + ' - ' + submittedPost.url*/}
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
                            </>
                            :
                            <Box mt={1}>
                                <Alert severity="info">No history entries from [<b style={{ color: palette.primary.main }}> {getDisplayDate(visibleHistoryPeriod['start'])} </b>] to [<b style={{ color: palette.primary.main }}> {getDisplayDate(visibleHistoryPeriod['end'])} </b>]</Alert>
                            </Box>
                        }
                    </>
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