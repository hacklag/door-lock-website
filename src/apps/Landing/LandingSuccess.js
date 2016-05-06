import React from 'react';
import Radium from 'radium';
import {RaisedButton, FontIcon} from 'material-ui';
import {ShareButtons} from 'react-share';

export default Radium(() => {
  const {FacebookShareButton, TwitterShareButton} = ShareButtons;
  const pageUrl = 'https://hacklag.org';
  const styles = {
    content: {
      maxWidth: 450,
      fontWeight: 300,
      lineHeight: 1.6,
      textAlign: 'justify',
      fontSize: 16
    }
  };

  return (
      <div style={styles.content}>
        You have access
      </div>
    );
});
