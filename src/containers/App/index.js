// Modules
import React from 'react';
import { Container, Row, Col, CardHeader, CardBody, CardFooter, Card } from 'reactstrap';
// Containers
import Gantt from '../../components/Gantt';
// Components
import Toolbar from '../../components/Toolbar';
import MessageArea from '../../components/MessageArea';
// Styles
import './styles.scss';

const data = {
  data: [
    { id: 1, text: 'First task name #1', start_date: '15-04-2017', duration: 1, progress: 0.6, priority: 'Hight' },
    { id: 2, text: 'Second task #2 name', start_date: '18-04-2017', duration: 3, progress: 0.4, priority: 'Low' },
    { id: 3, text: 'Third name task #3', start_date: '21-04-2017', duration: 2, progress: 0.9, priority: 'Normal' }
  ],
  links: [
    { id: 1, source: 1, target: 2, type: '0' }
  ]
};

class App extends React.Component {
  state = {
    currentZoom: 'Days',
    currentPriority: null,
    messages: [],
    searchValue: '',
  };

  render() {
    const { currentZoom, messages, searchValue, currentPriority } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <Card className="app__container app">
              <CardHeader>
                <Toolbar
                  zoom={currentZoom}
                  priority={currentPriority}
                  onZoomChange={this.handleZoomChange}
                  onPriorityChange={this.handlePriorityChange}
                  onSetSearchString={this.setSerchString}
                />
              </CardHeader>
              <CardBody>
                <div className="gantt-container">
                  <Gantt
                    tasks={data}
                    zoom={currentZoom}
                    onTaskUpdated={this.logTaskUpdate}
                    onLinkUpdated={this.logLinkUpdate}
                    search={searchValue}
                    priority={currentPriority}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <MessageArea messages={messages} />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  handleZoomChange = (zoom) => {
    this.setState({
      currentZoom: zoom,
    });
  };

  handlePriorityChange = (priority) => {
    this.setState((prevState) => ({
      currentPriority: (prevState.currentPriority === priority) ? null : priority,
    }));
  };

  setSerchString = (str) => {
    this.setState({ searchValue: str })
  }

  addMessage = (message) => {
    const messages = this.state.messages.slice();
    const prevKey = messages.length ? messages[0].key: 0;

    messages.unshift({ key: prevKey + 1, message });

    if (messages.length > 40) {
      messages.pop();
    }

    this.setState({ messages });
  };

  logTaskUpdate = (id, mode, task) => {
    const text = task && task.text ? ` (${task.text})`: '';
    const message = `Task ${mode}: ${id} ${text}`;

    this.addMessage(message);
  };

  logLinkUpdate = (id, mode, link) => {
    let message = `Link ${mode}: ${id}`;

    if (link) {
      message += ` (source: ${link.source}, target: ${link.target})`;
    }

    this.addMessage(message);
  }
}

export default App;
