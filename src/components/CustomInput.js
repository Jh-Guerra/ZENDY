import { 
    TextField, InputAdornment, makeStyles, Grid,
    FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';
import React from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
    inputText: {
        // width: "100%",
    },
    inputDate: {
        width: "100%",
        marginTop: "0px"
    },
    select: {
        // margin: theme.spacing(1),
        minWidth: "100%",
    }
}));

const CustomInput = props => {
    const { inputType="inputText", options=[] } = props;

    const classes = useStyles();

    const getCustomInput = () => {
        switch(inputType){
            case "inputText":
                return <TextField
                            className={classes[inputType]}
                            InputProps={{
                                startAdornment: props.icon && ( <InputAdornment position="start"> { props.icon } </InputAdornment> ),
                            }}
                            fullWidth
                            {...props}
                        />
            case "inputDate":
                return <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    className={classes[inputType]}
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    {...props}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
            case "select":
                return <FormControl className={classes[inputType]}>
                            <InputLabel>{props.label || ""}</InputLabel>
                            <Select
                                value={props.value}
                                onChange={props.onChange}
                            >
                                {
                                    options.map((option, i) => {
                                        return <MenuItem key={i} value={option.id}>{option.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
        }
    }

    return getCustomInput();
}

export default CustomInput