import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    contrastThreshold: 3,
    tonalOffset: 0.2,
    primary: {main: '#EB8D48'},
    secondary: green,
    // error: {
    //   main: red[500],
    // },
  },
});

const ThemeSettings = (props) => {
	return(
		<MuiThemeProvider theme={theme}>
			{props.children}
		</MuiThemeProvider>
	);
}

export default ThemeSettings;
