import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tab, Tabs } from '@material-ui/core';

const useStyles = makeStyles({
    paperRoot: {
        flexGrow: 1,
        marginBottom: '.5rem'
    },
    tabRoot: {
        minWidth: '72px'
    }
});

const FormPaymentTypeSelector = ({ setTransactionType }) => {
    const [value, setValue] = React.useState('payment');
    const classes = useStyles();

    const handleChange = (e, newValue) => {
        setValue(newValue);
        setTransactionType(newValue);
    };

    return (
        <Paper classes={{ root: classes.paperRoot }}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                scrollButtons="auto"
            // orientation="vertical"
            // centered
            >
                <Tab classes={{ root: classes.tabRoot }} wrapped={true} value="payment" label="Payment" />
                <Tab classes={{ root: classes.tabRoot }} wrapped={true} value="payout" label="Payout" />
                <Tab classes={{ root: classes.tabRoot }} wrapped={true} value="recurrent" label="Recurrent Payment" />
                <Tab classes={{ root: classes.tabRoot }} wrapped={true} value="refund" label="Refund" />
                <Tab classes={{ root: classes.tabRoot }} wrapped={true} value="capture" label="Capture Payment" />
                <Tab classes={{ root: classes.tabRoot }} wrapped={true} value="cancel" label="Cancel Payment" />
            </Tabs>
        </Paper>
    );
}

export default FormPaymentTypeSelector;