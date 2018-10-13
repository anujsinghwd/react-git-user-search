import React, { Component } from 'react';

class ProfilePicture extends Component {
  render(){
    return(
      <div>
        <img
      		style={{
      			width: '60px',
      			height: '60px',
      			borderRadius: '100%',
      			border: `3px solid ${this.props.borderColor}`,
      		}}
      		src={this.props.imgSrc}
      	/>
      </div>
    );
  }
}

export default ProfilePicture;
