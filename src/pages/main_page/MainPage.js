import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import { Grid } from "@material-ui/core";
import MainHeader from "pages/main_page/Childrens/MainHeader";
import MainBody from "pages/main_page/Childrens/MainBody";
//import MainFooter from "pages/main_page/Childrens/MainFooter";

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  async componentDidMount(){

  }

  componentWillUnmount() {
    
  }

  render() {
    return (
      <Grid container style={{height:'100vh'}}>
        <Grid item xs={12} style={{height:'13vh'}}>
          <MainHeader/>
        </Grid>
        <Grid item xs={12} style={{height:'74vh'}}>
          <MainBody/>
        </Grid>
        {/* <Grid item xs={12} style={{height:'13vh'}}>
          <MainFooter/>
        </Grid> */}
      </Grid>
    );
  }
}

export default MainPage;
