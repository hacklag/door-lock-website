import React from 'react';
import Radium from 'radium';
import LeftBar from './LeftBar';
import Syncano from 'syncano';
import {CircularProgress} from 'material-ui';

export default Radium(React.createClass({

  getInitialState() {
    return {
      message: null,
      loading: false,
      status: 'waiting'
    };
  },

  componentWillMount() {
    const connection = Syncano({accountKey: 'api_key'});
    const Channel = connection.Channel;
    const params = {
      name: 'channel_name',
      instanceName: 'instance_name'
    };
    const query = {
      room: 'room_name'
    };
    const poll = Channel.please().poll(params, query);

    poll.on('update', (data) => {
      let loading = false;
      let {message, status} = data.payload;

      if (status === 'loading' || !status) loading = true;
      this.setState({
        message,
        loading,
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
    let style = styles.deniedMessage;
    let {message, status, loading} = this.state;

    if (status === 'granted' || status === 'waiting') style = styles.message;
    if (!message) message = 'Hello Stranger';
    return (
      <div>
        {
          loading
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
