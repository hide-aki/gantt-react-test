// Modules
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

class MessageArea extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <div className="message-area">
        <ListGroup>
          {messages.map(({ key, message }) => (
            <ListGroupItem key={key}>{message}</ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

MessageArea.defaultProps = {
  messages: []
};

export default MessageArea;
