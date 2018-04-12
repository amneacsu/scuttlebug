import React from 'react';
import { format } from 'date-fns';
import Content from './Content';
import css from './Message.css';

const Message = (props) => {
  const {
    sequence,
    timestamp,
    type,
    feed,
  } = props;

  return (
    <div className={css.Message}>
      <div>
        Sequence: {sequence}
      </div>
      <div>
        Datetime: {format(timestamp, 'YYYY-MM-DD HH:mm:ss')}
      </div>
      <div>
        Author: {feed.name || 'no name'}
      </div>

      <Content
        type={props.type}
        data={props.content}
      />

    </div>
  );
};

export default Message;
