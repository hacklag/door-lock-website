import React from 'react';
import Radium from 'radium';

export default Radium(React.createClass({
  displayName: 'LeftBar',

  propTypes: {
    logo: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      textFieldValue: ''
    };
  },

  getStyles() {
    return {
      logoBar: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 200,
        '@media (max-width: 750px)': {
          display: 'none'
        }
      },
      hacklagLogo: {
        marginRight: 'auto',
        marginLeft: 'auto',
        width: 165
      },
      logoDialog: {
        position: 'relative',
        left: -74,
        top: -53,
        width: 119,
        height: 77
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const {logo} = this.props;

    return (
      <div
        style={styles.logoBar} >
        <img
          src={require('../../assets/img/hackbat/' + logo)}
          style={styles.hacklagLogo}
          alt="Hacklag logo" />
      </div>
    );
  }
}));
