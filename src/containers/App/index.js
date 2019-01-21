// Modules
import React from 'react';
import { Container, Row, Col, CardHeader, CardBody, CardFooter, Card } from 'reactstrap';
// Containers
import Gantt from '../../components/Gantt';
// Components
import Toolbar from '../../components/Toolbar';
import MessageArea from '../../components/MessageArea';
import Scheduler from '../../components/Scheduler';
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
  ],
  events: [
    { id: 1, text: 'Meeting', start_date: '01/20/2019 14:00', end_date: '01/20/2019 17:00' },
    { id: 2, text: 'Conference', start_date: '01/21/2019 12:00', end_date: '04/21/2019 19:00' },
    { id: 3, text: 'Interview', start_date: '01/19/2019 09:00' ,end_date: '01/19/2019 10:00' }
  ],
};

class App extends React.Component {
  state = {
    currentZoom: 'Days',
    currentPriority: null,
    messages: [],
    searchValue: '',
    currentDHTMLX: 'scheduler'
  };

  render() {
    const { currentZoom, messages, searchValue, currentPriority, currentDHTMLX } = this.state;
    const isGantt = currentDHTMLX === 'gantt';
    const isScheduler = currentDHTMLX === 'scheduler';
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
                  toggleDHTMLXHandler={this.toggleDHTMLXHandler}
                  isCurrentDHTMLXGantt={isGantt}
                  isCurrentDHTMLXScheduler={isScheduler}
                />
              </CardHeader>
              <CardBody>
                {isGantt && (
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
                )}
                {isScheduler && (
                  <div className="scheduler-container">
                    <Scheduler tasks={data} />
                  </div>
                )}
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

  toggleDHTMLXHandler = () => {
    this.setState((prevProps) => ({
      currentDHTMLX: prevProps.currentDHTMLX === 'gantt' ? 'scheduler' : 'gantt',
    }));
  }
}

export default App;
