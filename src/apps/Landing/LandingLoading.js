import React from 'react';
import Radium from 'radium';

export default Radium(() => {
  const styles = {
    content: {
      maxWidth: 450,
      fontWeight: 400,
      lineHeight: 1.6,
      textAlign: 'justify',
      fontSize: 20,
      marginBottom: 24
    }
  };

  return (
      <div style={styles.content}>
        Loading
      </div>
    );
});