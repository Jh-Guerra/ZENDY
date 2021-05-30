import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 380;
const marginTopButtonCollapse = 56;

export const drawerStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
  
    nested: {
      marginLeft: theme.spacing(6),
    },
  
    drawerButtonNormal: {
      backgroundColor: 'transparent',
      position: 'fixed',
      marginTop: marginTopButtonCollapse,
      marginLeft: 320,
      flexShrink: 0,
    },
  
    drawerButtonOpenActivated: {
      backgroundColor: 'transparent',
      position: 'fixed',
      marginTop: marginTopButtonCollapse,
      transition: theme.transitions.create('margin-left', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 58
    },
  
    drawerButtonOpenDesactivated: {
      marginLeft: 320,
      backgroundColor: 'transparent',
      position: 'fixed',
      marginTop: marginTopButtonCollapse,
      transition: theme.transitions.create('margin-left', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shortest,
      }),
      
    },
  
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
  
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shortest,
      }),
      color: "transparent",
      backgroundColor: "#F5F7FA",
      overflowX: 'hidden',
    },
  
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shortest,
      }),
      overflowX: 'hidden',
      width: theme.spacing(6) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
      backgroundColor: "#F5F7FA",
    },
  
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: '#566774',
      paddingLeft: '8px',
      height: '48px'
      
    },
  
    leftSelectedSubItemBars: {
      position:'absolute',
      height: '46px',
      width:'6px',
      backgroundColor:'#EB8D48',
      marginLeft: '-20px',
      borderTopRightRadius:4,
      borderBottomRightRadius:4,
      borderColor: 'transparent'
    },
  
    leftSelectedItemBars: {
      position:'absolute',
      height: '46px',
      width:'5px',
      backgroundColor:'#EB8D48',
      marginRight:'5px',
      borderTopRightRadius:5,
      borderBottomRightRadius:5,
      borderColor: 'transparent'
    },
  
    appBar: {
      width: `calc(100% - ${theme.spacing(9) + 1}px)`,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shortest,
      }),
    },
  
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shortest,
      }),
    },
  }));