import React from 'react';
import Radium from 'radium';
import LeftBar from './LeftBar';
import Syncano from 'syncano';
import {CircularProgress} from 'material-ui';

const connection = Syncano({accountKey: SYNCANO_API_KEY});
const Channel = connection.Channel;
const params = {
  name: SYNCANO_CHANNEL_NAME,
  instanceName: SYNCANO_INSTANCE_NAME
};
const query = {
  room: SYNCANO_CHANNEL_ROOM_NAME
};

export default Radium(React.createClass({
  getInitialState() {
    return {
      status: 'waiting'
    };
  },

  componentWillMount() {
    const poll = Channel.please().poll(params, query);

    poll.on('update', (data) => {
      const {status} = data.payload;

      this.setState({
        status
      });
    });

    poll.start();
  },

  getStyles() {
    return {
      componentBody: {
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        '@media (max-width: 750px)': {
          flexDirection: 'column',
          marginTop: -12
        }
      },
      contentBar: {
        marginLeft: 72,
        marginTop: 'auto',
        marginBottom: 'auto',
        '@media (max-width: 750px)': {
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '0px 16px 16px 16px'
        }
      },
      fullScreenComponent: {
        position: 'relative'
      },
      centerLoader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: '-50px 0px 0px -50px'
      },
      message: {
        fontSize: 48
      },
      deniedMessage: {
        fontSize: 48,
        color: 'red'
      }
    };
  },

  contentForm() {
    const styles = this.getStyles();
    const {status} = this.state;
    let style = styles.deniedMessage;
    let message = '';

    if (status === 'granted') {
      style = styles.message;
      message = 'Access Granted';
    } else if (status === 'waiting') {
      style = styles.message;
      message = 'Hello Stranger';
    } else if (status === 'nopermission') {
      message = 'No rights';
    }
    return (
      <div>
        {
          status === 'loading'
          ? (<CircularProgress color="black" />)
          : (<span style={style}>{message}</span>)
        }
      </div>
    );
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.componentBody}>
        <LeftBar logo="hackbat_general.svg" />
        <div style={styles.contentBar}>
          {this.contentForm()}
        </div>
      </div>
    );
  }
}));
