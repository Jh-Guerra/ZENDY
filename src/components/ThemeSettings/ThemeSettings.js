import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { pColor } from 'assets/styles/zendy-css';

const theme = createMuiTheme({
  palette: {
    contrastThreshold: 3,
    tonalOffset: 0.2,
    primary: {main: pColor},
    secondary: red,
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
