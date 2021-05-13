import { Card, ClickAwayListener, Grow, Popper } from '@material-ui/core';
import React from 'react';

const CustomMenu = props => {
  return (
    <Popper
      open={props.open}
      anchorEl={props.anchorEl}
      role={undefined}
      transition
      placement={props.placement? props.placement : "bottom"}
      modifiers={{
        flip: {
          enabled: false,
        },
        preventOverflow: {
          enabled: true,
          boundariesElement: 'window',
        },
      }}
    >
      {({ TransitionProps, placement }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
          <div className={props.cardStyle}>
            <ClickAwayListener onClickAway={props.onCloseMenu}>
              <Card elevation={6} style={{ marginTop: '6px' }}>
                {props.children}
              </Card>
            </ClickAwayListener>
          </div>
        </Grow>
      )}
    </Popper>
  );
};

export default CustomMenu;
