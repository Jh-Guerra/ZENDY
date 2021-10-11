import React, { createRef, useRef } from "react";
import { Grid } from '@material-ui/core';
import "assets/styles/zendy-app.css";
import { useHistory, withRouter } from "react-router-dom";

const CHMainFooter = props => {
  const inputRef = createRef();

  const [cursorPosition, setCursorPosition] = React.useState();

  React.useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  return (
    <>
    <Grid className="chat-footer" container alignItems="center" justify="center" ref={inputRef}>
  
      </Grid>
    </> 
  );
}

export default withRouter(CHMainFooter);
