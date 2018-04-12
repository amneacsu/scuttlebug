import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Content from '../Content';
import css from './index.css';

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
      <div>
        type: {type}
      </div>

      <Content
        type={props.type}
        data={props.content}
      />
    </div>
  );
};

Message.propTypes = {
  sequence: PropTypes.number.isRequired,
  timestamp: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  content: PropTypes.any,
  feed: PropTypes.object.isRequired,
};

export default Message;
