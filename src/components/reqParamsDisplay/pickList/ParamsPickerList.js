import { useState, useEffect } from 'react';
import useAppContext from '../../../AppContextHook';
import FDM_ACCESS from '../../../data/FormDataModelAccess';
import { Box, Grid, IconButton, List, ListItem, ListItemText, Paper, Table, TableContainer, Typography } from '@material-ui/core/';
import { Alert } from '@material-ui/lab/';
import SimpleBar from 'simplebar-react';
import SearchBar from '../../_vendors/material-ui-search-bar/SearchBar';

import SearchIcon from "@material-ui/icons/Search";
import PostAddIcon from '@material-ui/icons/PostAdd';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddIcon from '@material-ui/icons/Add';


const ParamsPickerList = ({ transactionType, postValues, setAlert }) => {
    const [searched, setSearched] = useState('');
    const [visibleParams, setVisibleParams] = useState(FDM_ACCESS.getParams());
    const palette = useAppContext('ThemeContext')['theme']['palette'];

    const requestSearch = (searchedVal) => {
        const visibleParams = FDM_ACCESS.getParamsForType(transactionType).filter(param =>
            param.name.toLowerCase().includes(searchedVal.toLowerCase())
        );
        setVisibleParams(visibleParams);
    };

    const cancelSearch = () => {
        requestSearch('');
        setSearched('');
    };

    const addParam = (paramName) => {
        console.log(paramName);
        setAlert({ 
            isOpen: true, 
            text: `[ <b>${paramName}</b> ] added to POST body`, 
            type: 'info'
        });
    };

    const onChange = (searchVal) => {
        requestSearch(searchVal);
        setSearched(searchVal);
    };

    useEffect(() => {
        requestSearch(searched);
    }, [transactionType]);

    return (
        <>
            <Box borderBottom={1} style={{ borderColor: palette.primary.main }} /*borderColor={palette.primary.main}*/>
                <SearchBar
                    value={searched}
                    onChange={searchVal => onChange(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                />
            </Box>
            <SimpleBar forceVisible="y" autoHide={false} style={{ maxHeight: '50vh' }}>
                <List dense={true} >
                    {visibleParams.length
                        ?
                        visibleParams.map((param, i) => {
                            return (
                                <ListItem key={i} /*style={{ paddingLeft: "0" }}*/>
                                    <ListItemText
                                        primary={param.name}
                                        primaryTypographyProps={{
                                            style: { color: palette.text.icon }
                                        }}
                                        //secondary={`${FDM_ACCESS.getAreaNameById(param.area)}${FDM_ACCESS.getParamTooltipByName(param.name).length ? ' - ' + FDM_ACCESS.getParamTooltipByName(param.name) : ''}`}
                                        secondary={`${FDM_ACCESS.getAreaNameById(param.area)}${param.subArea ? ' / '+FDM_ACCESS.getSubAreaNameById(param.subArea) : ''}`}
                                        secondaryTypographyProps={{
                                            style: { color: palette.primary.main }
                                        }}
                                    />
                                    <IconButton color="secondary" edge="end" onClick={() => addParam(param.name)}>
                                        <PostAddIcon />
                                    </IconButton>
                                </ListItem>
                            )
                        })
                        :
                        <Box>
                            <Grid container>
                                <Grid item>
                                    <Alert icon={<SearchIcon style={{ fontSize: 30 }} />} severity="warning">
                                        <Typography variant="caption">No <b style={{ textTransform: "uppercase"}}>{transactionType}</b> parameter name containing "<b>{searched}</b>" was found.</Typography>
                                    </Alert>
                                </Grid>
                            </Grid>
                        </Box>
                    }
                </List>
            </SimpleBar>
        </>
    )

}

export default ParamsPickerList;