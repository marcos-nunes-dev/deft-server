// Groups
const groups = {
  'jobRequest': {
    unique: false,
  },
  'jobRequestedTracking': {
    unique: true,
  },
  'jobRequestTracking': {
    unique: true,
  },
};

// Initial State
const INITIAL_STATE = {
  notifications: [],
};

// Actions
const ADD_NOTIFICATION = 'notifications/ADD_NOTIFICATION';
const REMOVE_NOTIFICATION = 'notifications/REMOVE_NOTIFICATION';
const CLEAR_NOTIFICATIONS_GROUP = 'notifications/CLEAR_NOTIFICATIONS_GROUP';

const COMMAND_YES = 'notifications/COMMAND_YES';
const COMMAND_NO = 'notifications/COMMAND_NO';

// Reducer
export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      const newNotification = {
        id: action.id,
        message: action.message,
        group: action.group,
        yesText: action.yesText,
        noText: action.noText,
        timer: action.timer,
        data: action.data,
        ignore: false,
        createdAt: new Date(),
      };

      const notificationOfGroup = action.group && state.notifications.find(n => n.group === action.group);
      // If there is already a notification with the given group and it is unique
      if (groups[action.group] && groups[action.group].unique && notificationOfGroup) {
        // Replace with new action
        return {
          ...state,
          notifications: state.notifications.map(
            n => n.id === notificationOfGroup.id
              ? newNotification
              : n
          )
        };
      }

      // If not, create a new one
      return {
        ...state,
        notifications: [
          ...state.notifications,
          newNotification
        ]
      };

    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.id)
      };

    case CLEAR_NOTIFICATIONS_GROUP:
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.group !== action.group),
      };

    case COMMAND_YES: {
      const notifications = state.notifications;
      if (notifications.length === 0) {
        return state;
      }

      // Get the first notification
      const notification = notifications[0];
      if (notification.ignore) {
        // Ignore the notification until the server erases it
        return state;
      }

      // Do notifications logic here
      // First we check if is a job request
      if (notification.group === 'jobRequest') {
        // And send to server
        mp.trigger('CEFacceptJobRequest', notification.id);
        
        // Ignore future requests to the same notification
        return {
          ...state,
          notifications: state.notifications.map(notif =>
            (notif.id === notification.id)
              ? { ...notif, ignore: true }
              : notif
          )
        };
      }

      // Nothing done to the notifications
      return state;
    }

    case COMMAND_NO: {
      const notifications = state.notifications;
      if (notifications.length === 0) {
        return state;
      }

      // Get the first notification
      const notification = notifications[0];
      // First check if the notification doesn't have a NO command,
      // then if it should be ignored until the server erases it
      if (!notification.noText || notification.ignore) {
        return state;
      }

      // Do notifications logic here
      if (notification.data) {
        if (notification.data.phase === 'taxi_going') {
          // Player is cancelling the taxi, he should pay a tax
          const { requestId } = notification.data;
          mp.trigger('CEF_cancelTaxiWithTax', requestId);
          
          // Ignore future requests to the same notification
          return {
            ...state,
            notifications: state.notifications.map(notif =>
              (notif.id === notification.id)
                ? { ...notif, ignore: true }
                : notif
            )
          };
        }
        
        if (notification.data.phase === 'ride_in_progress') {
          // Taxist is finishing the ride
          mp.trigger('CEF_finishTaxiRide');
          
          // Ignore future requests to the same notification
          return {
            ...state,
            notifications: state.notifications.map(notif =>
              (notif.id === notification.id)
                ? { ...notif, ignore: true }
                : notif
            )
          };
        }
      }

      // Remove it
      return {
        ...state,
        notifications: state.notifications.filter(notf => notf.id !== notification.id)
      };
    }

    default:
      return state;
  }
}

// Action creators
export function addNotification(id, message, group, yesText, noText, timer, data) {
  return { type: ADD_NOTIFICATION, id, message, group, yesText, noText, timer, data };
}

export function removeNotification(id) {
  return { type: REMOVE_NOTIFICATION, id };
}

export function clearNotificationsGroup(group) {
  return { type: CLEAR_NOTIFICATIONS_GROUP, group };
}

// Bridge (connects string & props to action creators)
export function bridge(eventName, props) {
  switch (eventName) {
    case ADD_NOTIFICATION:
      return addNotification(props.id, props.message, props.group, props.yesText, props.noText, props.timer, props.data);

    case REMOVE_NOTIFICATION:
      return removeNotification(props.id);

    case CLEAR_NOTIFICATIONS_GROUP:
      return clearNotificationsGroup(props.group);
      
    case COMMAND_YES:
      return { type: COMMAND_YES };

    case COMMAND_NO:
      return { type: COMMAND_NO };
  }

  return null;
}

// Middleware
// export const middleware = store => next => action => {
//   //const accepts = [NOTIFICATION_COMMAND_YES, COMMAND_NO];
//   const accepts = [];
//   if (accepts.indexOf(action.type) === -1) {
//     return next(action);
//   }

//   const state = store.getState();

//   // Accepts job requests activated with F5
//   if (action.type === NOTIFICATION_COMMAND_YES) {
//     const notifications = state.getState().notifications;
//     if (notifications.length === 0) {
//       console.log('sem notificações');
//       return next(action);
//     }

//     // Get the first action and send to server
//     const notification = notifications[0];

//   }

//   console.log('accept job request middleware');
//   const notifications = store.getState().notifications;
//   console.log('notifications: ', notifications);
//   next(action);
// }