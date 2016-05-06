import React from 'react';
import Radium from 'radium';
import LeftBar from './LeftBar';
import Declined from './LandingDeclined';
import Success from './LandingSuccess';
import Loading from './LandingLoading';
import TopBar from './TopBar';
import Syncano from 'syncano';

export default Radium(React.createClass({

  getInitialState() {
    return {
      status: null
    };
  },

  componentWillMount() {
    const connection = Syncano({accountKey: 'API_KEY'});
    const Channel = connection.Channel;
    const query = {
      name: 'CHANNEL_NAME',
      instanceName: 'INSTANCE_NAME'
    };
    const poll = Channel.please().poll(query);

    poll.on('update', (data) => {
      this.setState({
        status: data.payload.status
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
        '@media (max-width: 750px)': {
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '0px 16px 16px 16px'
        }
      }
    };
  },

  contentForm() {
    const styles = this.getStyles();

    return (
      <div style={styles.content}>
        <div style={styles.mainTextContainer}>
          <div style={styles.headerText}>
            <span style={styles.semiBold}>Hello Stranger</span>
          </div>
        </div>
      </div>
    );
  },

  renderContent() {
    const {status} = this.state;

    if (status === 'loading') {
      return <Loading/>;
    }
    if (status === 'permission') {
      return <Success/>;
    }
    if (status === 'no permission') {
      return <Declined/>;
    }
    return this.contentForm();
  },

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.componentBody}>
        <TopBar logo="hackbat_general.svg" />
        <LeftBar logo="hackbat_general.svg" />
        <div style={styles.contentBar}>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}));
