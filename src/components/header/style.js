const drawerWidth = 220;

export const headerStyles  = theme => ({
  appBar: {
    width: `calc(100% - ${theme.spacing(9) + 1}px)`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shortest,
    }),
    backgroundColor: 'white',
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shortest,
    }),
  },

  borderHeader: {
    borderBottomColor: '#CFD3DB',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px'
  }
})
