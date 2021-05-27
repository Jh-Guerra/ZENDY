import React, { Component } from "react";


export default class ItemAvatar extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className="Itemavatar_Content">
        <div className="Itemavatar" >
          <img src={this.props.image} />
          <span className={`ItemIsOnline ${this.props.isOnline}`}></span>
        </div>
      </div>
    );
  }
}
