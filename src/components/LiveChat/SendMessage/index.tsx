import { Button, Form, Input, Space } from '@autobid247/theme';
import React from 'react';

import styles from './styles.module.scss';

interface SendMessageProps {
  onSend: (message: string) => void;
  onTyping: () => void;
}
const SendMessage: React.FC<SendMessageProps> = ({ onSend, onTyping }) => {
  return (
    <div className={styles.formContainer}>
      <Form
        onSubmit={({ message }: { message: string }, { resetForm }) => {
          onSend(message);
          resetForm();
        }}
        initialValues={{ message: '' }}
      >
        <Space className={styles.space} justify="space-between" align="center">
          <Input
            label=""
            name="message"
            placeholder="Write your question here..."
            className={styles.input}
            type="text"
            onKeyUp={() => onTyping()}
          />
          <Button type="submit" className={styles.sendButton}>
            Send
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default SendMessage;
