import { 
    TextField, InputAdornment, makeStyles, Grid,
    FormControl, InputLabel, Select, MenuItem, FormHelperText
} from '@material-ui/core';
import React from 'react';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    inputText: {
        // width: "100%",
    },
    textArea: {
    },
    inputDate: {
        width: "100%",
        marginTop: "0px"
    },
    select: {
        // margin: theme.spacing(1),
        minWidth: "100%",
    },
    select2: {
        // margin: theme.spacing(1),
        minWidth: "100%",
    },
    multiSelect: {
        // margin: theme.spacing(1),
        minWidth: "100%",
    },
    multiAutocomplete: {
        minWidth: "100%",
    }
}));

const CustomInput = props => {
    const { custom="inputText", options=[], primaryLetterColor } = props;

    const classes = useStyles();

    const getCustomInput = () => {
        switch(custom){
            case "inputText":
                return <TextField
                            className={classes[custom]}
                            InputProps={{
                                startAdornment: props.icon && ( <InputAdornment position="start"> { props.icon } </InputAdornment> ),
                            }}
                            fullWidth
                            {...props}
                        />
            case "textArea":
              return <TextField
                          className={classes[custom]}
                          multiline
                          rows={4}
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
                                    className={classes[custom] + `${primaryLetterColor ? " primary-sub-letters" : ""}`}
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
                return <FormControl error={props.error} className={classes[custom]}>
                            <InputLabel>{props.label || ""}</InputLabel>
                            <Select
                                value={props.value}
                                onChange={props.onChange}
                                disabled={props.disabled}
                            >
                                {
                                    options.map((option, i) => {
                                        return <MenuItem key={i} value={option.id}>{option.name}</MenuItem>
                                    })
                                }
                            </Select>
                            <FormHelperText>{props.helperText}</FormHelperText>
                        </FormControl>
            case "select2":
                return <FormControl error={props.error} className={classes[custom]}>
                            <InputLabel>{props.label || ""}</InputLabel>
                            <Select
                                value={props.value}
                                onChange={props.onChange}
                                disabled={props.disabled}
                            >
                                {
                                    options && options.map((option, i) => {
                                        return <MenuItem key={i} value={option.id}>{option.name}</MenuItem>
                                    })
                                }
                            </Select>
                            <FormHelperText>{props.helperText}</FormHelperText>
                        </FormControl>
            case "multiSelect":
                return <FormControl error={props.error} className={classes[custom]}>
                            <InputLabel>{props.label || ""}</InputLabel>
                            <Select
                                multiple
                                value={props.value}
                                onChange={props.onChange}
                                disabled={props.disabled}
                                fullWidth
                            >
                                {
                                    options && options.map((option, i) => {
                                        return <MenuItem key={i} value={option.id}>{option.name}</MenuItem>
                                    })
                                }
                            </Select>
                            <FormHelperText>{props.helperText}</FormHelperText>
                        </FormControl>
            case "multiAutocomplete":
                return <FormControl error={props.error} className={classes[custom]}>
                            {/* <InputLabel>{props.label || ""}</InputLabel> */}
                            <Autocomplete
                                id={props.id}
                                multiple
                                value={props.value}
                                inputValue={props.inputValue}
                                onChange={props.onChange}
                                onInputChange={props.onInputChange}
                                disabled={props.disabled}
                                options={options || []}
                                getOptionLabel={(option) => option.name || ""}
                                getOptionSelected={(option, value) => option.id === value.id}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        style={{ width: '100%'}}
                                        variant="outlined"
                                        label={props.label}
                                    />
                                )}
                            />
                            <FormHelperText>{props.helperText}</FormHelperText>
                        </FormControl>
        }
    }

    return getCustomInput();
}

export default CustomInput