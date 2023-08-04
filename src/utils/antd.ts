import { NotificationInstance } from 'antd/es/notification/interface';

class AntdUtils {
  notification: NotificationInstance | null = null;

  setNotification(notification: NotificationInstance) {
    this.notification = notification;
  }
}

export const antdUtils = new AntdUtils();
