import { useState, useEffect } from 'react';
import useAppContext from '../../../AppContextHook';
import FDM_ACCESS from '../../../data/FormDataModelAccess';
import { Box, IconButton, List, ListItem, ListItemText, Paper, Table, TableContainer } from '@material-ui/core/';
import SimpleBar from 'simplebar-react';
import SearchBar from '../../_vendors/material-ui-search-bar/SearchBar';

import PostAddIcon from '@material-ui/icons/PostAdd';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddIcon from '@material-ui/icons/Add';


const ParamsPickerList = ({ transactionType, postValues }) => {
    const [searched, setSearched] = useState('');
    const [visibleParams, setVisibleParams] = useState(FDM_ACCESS.getParams());
    const palette = useAppContext('ThemeContext')['theme']['palette'];

    const requestSearch = (searchedVal) => {
        const visibleParams = FDM_ACCESS.getParams().filter(param =>
            param.name.toLowerCase().includes(searchedVal.toLowerCase())
        );
        setVisibleParams(visibleParams);
    };

    const cancelSearch = () => {
        setSearched('');
        requestSearch(searched);
    };

    const addParam = (paramName) => {
        console.log(paramName);
    }

    return (
        <>
            <Box borderBottom={1} style={{ borderColor: palette.primary.main }} /*borderColor={palette.primary.main}*/>
                <SearchBar
                    value={searched}
                    onChange={(searchVal) => requestSearch(searchVal)}
                    onCancelSearch={() => cancelSearch()}
                />
            </Box>
            <SimpleBar forceVisible="y" autoHide={false} style={{ maxHeight: '50vh' }}>
                <List dense={true} >
                    {visibleParams.map((param, i) => {
                        return (
                            <ListItem key={i} /*style={{ paddingLeft: "0" }}*/>
                                <ListItemText
                                    primary={param.name}
                                    primaryTypographyProps={{
                                        style: { color: palette.text.icon }
                                    }}
                                    secondary={`${FDM_ACCESS.getAreaNameById(param.area)}${FDM_ACCESS.getParamTooltipByName(param.name).length ? ' - ' + FDM_ACCESS.getParamTooltipByName(param.name) : ''}`}
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
                    }
                </List>
            </SimpleBar>
        </>
    )

}

export default ParamsPickerList;