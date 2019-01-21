// Modules
import React from 'react';
import cx from 'classnames';
import { ButtonToolbar, Button, ButtonGroup, Input } from 'reactstrap';
// Styles
import './styles.scss';

class Toolbar extends React.Component {
  render() {
    const { zoom, priority, isCurrentDHTMLXGantt, isCurrentDHTMLXScheduler } = this.props;

    return (
      <ButtonToolbar className="zoom-bar">
        <Button onClick={this.toggleCurrentDHTMLX}>
          {isCurrentDHTMLXGantt && 'Scheduler'}
          {isCurrentDHTMLXScheduler && 'Gantt'}
        </Button>
        {isCurrentDHTMLXGantt && (
          <>
            <div>
              <b className="mr-1">Zooming:</b>{' '}
              {this.renderButtonGroup({ options: ['Hours', 'Days', 'Months'], active: zoom, handler: this.handleZoomChange })}
            </div>
            <div>
              <b className="mr-1">Filtering:</b>{' '}
              {this.renderButtonGroup({ options: ['Hight', 'Normal', 'Low'], active: priority, handler: this.handlePriorityChange })}
            </div>
            <div>
              <Input
                type="text"
                name="search"
                placeholder="Search"
                onChange={this.handleSerchStringChange}
              />
            </div>
          </>
        )}
      </ButtonToolbar>
    );
  }

  renderButtonGroup = ({ options, active, handler }) => {
    return (
      <ButtonGroup size="sm">
        {options.map((value) => {
          const isActive = active === value;
          const classNames = cx('zoom-bar__button', { 'zoom-bar__button--active': isActive });
          return (
            <Button
              key={value}
              className={classNames}
              onClick={() => handler(value)}
              children={value}
            />
          );
        })}
      </ButtonGroup>
    );
  }

  handleZoomChange = (value) => {
    if (this.props.onZoomChange) {
      this.props.onZoomChange(value);
    }
  }

  handlePriorityChange = (value) => {
    if (this.props.onPriorityChange) {
      this.props.onPriorityChange(value);
    }
  }

  handleSerchStringChange = (event) => {
    if (this.props.onSetSearchString) {
      this.props.onSetSearchString(event.target.value)
    }
  }

  toggleCurrentDHTMLX = () => {
    if (this.props.toggleDHTMLXHandler) {
      this.props.toggleDHTMLXHandler();
    }
  }
}

export default Toolbar;
