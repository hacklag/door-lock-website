import React from 'react';
import Radium from 'radium';
import LeftBar from './LeftBar';
import Syncano from 'syncano';
import {CircularProgress} from 'material-ui';

const connection = Syncano({accountKey: '6f989ca9d095880e5eef79396c5f71c9b09606ec'});
const Channel = connection.Channel;
const params = {
  name: 'door_informations',
  instanceName: 'muddy-paper-3302'
};
const query = {
  room: '2'
};

const STATUS_TABLE = [
  'door_closed',
  'loading',
  'access_denied',
  'access_granted',
  'door_is_open',
  'door_is_open_alers'
];

export default Radium(React.createClass({
  getInitialState() {
    return {
      status: 0
    };
  },

  componentWillMount() {
    const poll = Channel.please().poll(params, query);

    poll.on('update', (data) => {
      const {status} = data.payload;

      this.setState({
        status: parseInt(status, 10)
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
      },
      information: {
        width: 350
      },
      circularProgressStyle: {
        marginLeft: '40%'
      }
    };
  },

  contentForm() {
    const {message, deniedMessage, circularProgressStyle} = this.getStyles();
    const {status} = this.state;

    if (status === 1) {
      return (<CircularProgress style={circularProgressStyle} color="black" />);
    } else if (status === 2 || status === 5) {
      return (<span style={deniedMessage}>{STATUS_TABLE[status]}</span>);
    }
    return (<span style={message}>{STATUS_TABLE[status]}</span>);
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
