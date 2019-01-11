import { Component } from 'inferno';
import { VelocityComponent } from 'inferno4-velocity';
import { connect } from 'inferno-redux';
import { removeNotification } from "../../ducks/notifications";
import styles from './style.css';

class Notification extends Component {
  componentDidMount() {
    const { id, timer, dispatch } = this.props;
    if (timer > 0) {
      const timerInMs = timer * 1000;
      setTimeout(() => dispatch(removeNotification(id)), timerInMs);
    }
  }

  render() {
    const { message, yesText, noText, timer } = this.props;
    const timerInMs = timer * 1000;
    return (
      <div className={styles.notification}>
        <div className={styles.content}>
          <div className={styles.message}>{message}</div>
          {
            (yesText || noText) &&
            <div className={styles.commandsContainer}>
              {
                yesText && (
                  <div className={styles.commandWrapper}>
                    <div className={styles.f5Key}>F5</div>
                    <div className={styles.commandName}>{yesText}</div>
                  </div>
                )
              }
              {
                noText && (
                  <div className={styles.commandWrapper}>
                    <div className={styles.f6Key}>F6</div>
                    <div className={styles.commandName}>{noText}</div>
                  </div>
                )
              }
            </div>
          }
        </div>
        {
          timer && (
            <div className={styles.timerBarBackground}>
              <VelocityComponent
                animation={{ width: '100%' }}
                easing="linear"
                duration={timerInMs}
                runOnMount
              >
                <div className={styles.timerBar}></div>
              </VelocityComponent>
            </div>
          )
        }
      </div>
    );
  }
}

export default connect()(Notification);