// Modules
import React from 'react';
import 'dhtmlx-scheduler';
// Styles
import './styles.scss';

const scheduler = window.scheduler;

class Scheduler extends React.Component {
  constructor(props) {
    super(props);
    this.schedulerContainer = React.createRef();
  }

  componentDidMount() {
    scheduler.config.autosize = 'y';
    scheduler.init(this.schedulerContainer.current, new Date(), 'month');
    scheduler.parse(this.props.tasks.events, 'json');
  }

  render() {
    return (
      <div ref={this.schedulerContainer} className="dhx_cal_container" style={{ width: '100%', height: 500, padding: '10px' }}>
        <div className="dhx_cal_navline">
          <div className="dhx_cal_prev_button">&nbsp;</div>
          <div className="dhx_cal_next_button">&nbsp;</div>
          <div className="dhx_cal_today_button" />
          <div className="dhx_cal_date" />
          <div className="dhx_cal_tab" name="day_tab" />
          <div className="dhx_cal_tab" name="week_tab" />
          <div className="dhx_cal_tab" name="month_tab" />
        </div>
        <div className="dhx_cal_header" />
        <div className="dhx_cal_data" />
      </div>
    );
  }
}

export default Scheduler;
