import { notification } from 'antd';

export const openNotification = (type = 'success', message = 'success', description = 'success') => {
    return notification[type]({ message, description, placement: 'bottomRight' })
}