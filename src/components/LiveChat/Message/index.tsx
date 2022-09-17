import { Space } from '@autobid247/theme';
import classNames from 'classnames';
import dayjs from 'dayjs';
import React from 'react';
import Avatar from 'react-avatar';

import styles from './styles.module.scss';

export interface IMessage {
  text: string;
  time?: string;
  sentBy?: string;
  name?: string;
  isOffer?: boolean;
  amount?: number;
}
interface MessageProps extends IMessage {
  isSent?: boolean;
}

const Message: React.FC<MessageProps> = ({ text, time, isSent, name }) => {
  return (
    <div>
      <Space direction="vertical" size={4}>
        <Space size={16} align="flex-end" justify={isSent ? 'flex-end' : 'flex-start'}>
          {!isSent && <Avatar name={name || 'user'} maxInitials={2} round size="30px" />}
          <div>
            <div
              className={classNames(styles.message, {
                [styles.sent]: isSent,
                [styles.received]: !isSent,
              })}
            >
              {text}
            </div>
            {time && (
              <div
                className={classNames(styles.time, {
                  [styles.sent]: isSent,
                })}
              >
                {dayjs(time).format('hh:mm a')}
              </div>
            )}
          </div>

          {isSent && <Avatar name={name || 'user'} maxInitials={2} round size="30px" />}
        </Space>
      </Space>
    </div>
  );
};

export default Message;
