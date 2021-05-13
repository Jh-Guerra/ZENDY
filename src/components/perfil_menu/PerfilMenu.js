import { Box, Grid, MenuItem, MenuList } from '@material-ui/core';
import React from 'react';
import CustomMenu from '../CustomMenu';
import PerfilItem from './PerfilItem';

const PerfilMenu = (props) => {

  const handleItemsClick = (action) => {
    props.handleActions(action)
  }

  return (
    <CustomMenu open={props.open} onCloseMenu={props.onCloseMenu} anchorEl={props.anchorEl}>
      <Grid container direction="column">
        <Grid item>
          <MenuList>
            {props.menuData.menuItems.map((item, index) => {
              return (
                <MenuItem key={index} onClick={() => { handleItemsClick(item.action) }}>
                  <PerfilItem boxColor={item.color} text={item.text} />
                </MenuItem>
              )
            })}
          </MenuList>
        </Grid>
      </Grid>
    </CustomMenu>
  )
}

export default PerfilMenu