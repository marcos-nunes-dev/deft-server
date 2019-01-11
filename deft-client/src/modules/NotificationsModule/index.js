import { Component } from 'inferno';
import { connect } from 'inferno-redux';
import styles from './style.css';
import Notification from './Notification';
import { VelocityTransitionGroup } from 'inferno4-velocity'

class NotificationsModule extends Component {
  render() {
    const notifications = this.props.notifications || [];
    const data = notifications.notifications;
    data.sort(function(a, b) {
      return a.createdAt - b.createdAt;
    });
    return (
      <div className={styles.container}>
        <VelocityTransitionGroup
          component="div"
          enter={{ animation: { opacity: 1, translateX: 0 } }}
          leave={{ animation: { opacity: 0, translateX: '100%' } }}
        >
          {data.map(n => (
            <Notification
              key={n.id}
              id={n.id}
              message={n.message}
              yesText={n.yesText}
              noText={n.noText}
              timer={n.timer}
            />
          ))}
        </VelocityTransitionGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.notifications,
  };
}

export default connect(mapStateToProps)(NotificationsModule);