import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { pColor, pLetterColor, sColor, pColorDark } from 'assets/styles/zendy-css';

export const redTheme = createMuiTheme({ 
  contrastThreshold: 3,
  tonalOffset: 0.2,
  palette: { 
    primary: red,
    contrastText: "#fff"
  } 
});

const ThemeError = (props) => {
	return(
		<MuiThemeProvider theme={redTheme}>
			{props.children}
		</MuiThemeProvider>
	);
}

export default ThemeError;