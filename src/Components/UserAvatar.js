import React, { Component } from "react";

class UserAvatar extends Component {
  state = {
    error: false
  };
  //If photo fails to load, fallback to letter
  handleError = () => {
    this.setState({ error: true });
  };

  render() {
    const { background, name, avatar } = this.props;
    const { error } = this.state;
    return (
      <div className="avatar" style={{ background }}>
        {(!avatar || error) && <p className="avatar__letter">{name[0]}</p>}
        {avatar && !error && (
          <img
            className="avatar__image"
            onError={this.handleError}
            src={avatar}
            alt={`${name}'s avatar`}
          />
        )}
      </div>
    );
  }
}

export default UserAvatar;
