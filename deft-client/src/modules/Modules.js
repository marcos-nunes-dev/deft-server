import NotificationsModule from './NotificationsModule/';
import HudModule from './HudModule/';
import styles from './styles.css';

export default () => (
  <div className={styles.container}>
    <NotificationsModule />
    <HudModule />
  </div>
);