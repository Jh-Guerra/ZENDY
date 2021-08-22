import React, { Component } from "react";
import { setImageProfile } from 'utils/default-profile-image';

export default class Avatar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // console.log('props>>',this.props)
    return (
      <div className="avatar">
        <div className="avatar-img">
          <img src={setImageProfile('Cliente', this.props.image)} alt="#" />
        </div>
        <span className={`is-online ${this.props.isOnline}`}></span>
      </div>
    );
  }
}
