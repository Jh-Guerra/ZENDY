import React, { createRef, useRef } from "react";

import "assets/styles/zendy-app.css";
import { useHistory, withRouter } from "react-router-dom";

const CHMainFooter = props => {
  const inputRef = createRef();

  const [cursorPosition, setCursorPosition] = React.useState();

  React.useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  return (
    <div className="chat-footer" ref={inputRef}>
          
    </div>  
  );
}

export default withRouter(CHMainFooter);
