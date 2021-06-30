import React, { Component } from "react";

export default class ItemAvatar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="item-avatar-content" style={{ textAlign: 'center'}} >
        <div className="item-avatar"  style={{marginTop: '20px' }}>
          {this.props.Area}  
        </div>
      </div>
    );
  }
}