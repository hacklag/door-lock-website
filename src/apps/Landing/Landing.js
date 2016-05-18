import React from 'react';
import Radium from 'radium';
import LeftBar from './LeftBar';
import TopBar from './TopBar';
import Syncano from 'syncano';

export default Radium(React.createClass({

  getInitialState() {
    return {
      message: null,
      loading: false
    };
  },

  componentWillMount() {
    const connection = Syncano({accountKey: 'accoutKey'});
    const Channel = connection.Channel;
    const query = {
      name: 'channelName',
      instanceName: 'instanceName'
    };
    const poll = Channel.please().poll(query);

    poll.on('update', (data) => {
      let loadingVar = false;

      if (data.payload.status === 'loading') {
        loadingVar = true;
      }
      console.log(data.payload);
      this.setState({
        message: data.payload.message,
        loading: loadingVar
      });
    });

    poll.start();
  },

  componentDidMount() {
    window.analytics.page();
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
        marginTop: 40,
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
      }
    };
  },

  contentForm() {
    const styles = this.getStyles();
    const loading = this.state.loading;
    let message = this.state.message;

    if (!message) message = 'Hello Stranger';
    return (
      <div>
        <div style={styles.content}>
          <div style={styles.mainTextContainer}>
            <div style={styles.headerText}>
              {
                loading
                ? (<img src={'/img/loader.gif'} />)
                : (<span style={styles.semiBold}>{message}</span>)
              }
            </div>
          </div>
        </div>
      </div>
    );
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.componentBody}>
        <TopBar logo="hackbat_general.svg" />
        <LeftBar logo="hackbat_general.svg" />
        <div style={styles.contentBar}>
          {this.contentForm()}
        </div>
      </div>
    );
  }
}));
