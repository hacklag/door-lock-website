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

// status 0 - 'loading',
// status 1 - 'door_closed',
// status 2 - 'access_denied',
// status 3 - 'access_granted',
// status 4 - 'door_is_open',
// status 5 - 'door_is_open_alers'

const STATUS_TABLE = [
  'Hello World',
  'Access Denied',
  'Access Granted',
  'Welcome in Hacklag',
  'Close the door!'
];

export default Radium(React.createClass({
  getInitialState() {
    return {
      status: 1
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
      information: {
        width: 350
      },
      message: {
        fontSize: 48
      },
      acceptMessage: {
        fontSize: 48,
        color: 'green'
      },
      deniedMessage: {
        fontSize: 48,
        color: 'red'
      },
      circularProgressStyle: {
        marginLeft: '40%'
      }
    };
  },

  messageStyle(status) {
    const {message, deniedMessage, acceptMessage} = this.getStyles();

    if (status === 2 || status === 5) {
      return deniedMessage;
    } else if (status === 3) {
      return acceptMessage;
    }
    return message;
  },

  contentForm() {
    const {circularProgressStyle} = this.getStyles();
    const {status} = this.state;

    if (status === 0) {
      return (<CircularProgress style={circularProgressStyle} color="black" />);
    }
    return (<span style={this.messageStyle(status)}>{STATUS_TABLE[status - 1]}</span>);
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.componentBody}>
        <LeftBar logo="hackbat_general.svg" />
        <div style={styles.contentBar}>
          <div style={styles.information}>
            {this.contentForm()}
          </div>
        </div>
      </div>
    );
  }
}));
