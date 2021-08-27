import React, { Component } from "react";


export default class ItemAvatar extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="item-avatar-content">
        <div className="item-avatar" >
          <img src={this.props.image} />
          {
            !this.props.isChatCompany ? <span className={`item-is-online ${this.props.isOnline ? this.props.isOnline : ""}`}></span> : null
          }
        </div>
      </div>
    );
  }
}
