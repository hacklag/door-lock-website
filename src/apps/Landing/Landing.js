import React from 'react';
import Radium from 'radium';
import LeftBar from './LeftBar';
import Syncano from 'syncano';
import {CircularProgress} from 'material-ui';

const connection = Syncano({accountKey: SYNCANO_API_KEY});
const {Channel, DataObject} = connection;
const params = {
  name: SYNCANO_CHANNEL_NAME,
  instanceName: SYNCANO_INSTANCE_NAME
};
const query = {
  room: SYNCANO_CHANNEL_ROOM_NAME
};
const doorQuery = {
  id: SYNCANO_DOOR_ID,
  instanceName: SYNCANO_INSTANCE_NAME,
  className: SYNCANO_CLASS_NAME
};

// status 0 - 'loading',
// status 1 - 'door_closed',
// status 2 - 'access_denied',
// status 3 - 'access_granted',
// status 4 - 'door_is_open',
// status 5 - 'door_is_open_alers'

const STATUS_TABLE = [
  'Loading',
  'Hello World',
  'Access Denied',
  'Access Granted',
  'Welcome in Hacklag',
  'Close the door!'
];

export default Radium(React.createClass({
  getInitialState() {
    return {
      status: 0
    };
  },

  componentWillMount() {
    DataObject.please().get(doorQuery).then((object) => {
      this.setState({
        status: object.status
      });
    });

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
        fontSize: 48,
        width: 350
      },
      normalMessage: {
        color: '#4A4A4A'
      },
      acceptMessage: {
        color: 'green'
      },
      errorMessage: {
        color: 'red'
      },
      circularProgressStyle: {
        marginLeft: '40%'
      }
    };
  },

  messageStyle(status) {
    const {normalMessage, errorMessage, acceptMessage} = this.getStyles();

    if (status === 2 || status === 5) {
      return errorMessage;
    } else if (status === 3) {
      return acceptMessage;
    }
    return normalMessage;
  },

  contentForm() {
    const {circularProgressStyle} = this.getStyles();
    const {status} = this.state;

    if (status === 0) {
      return (<CircularProgress style={circularProgressStyle} color="black" />);
    }
    return (<span style={this.messageStyle(status)}>{STATUS_TABLE[status]}</span>);
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
