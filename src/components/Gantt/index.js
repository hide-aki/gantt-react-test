// Modules
import React from 'react';
import 'dhtmlx-gantt';
// Styles
import './styles.scss';

const gantt = window.gantt;

class Gantt extends React.Component {
  constructor(props) {
    super(props);
    this.ganttContainer = React.createRef();
  }

  componentDidMount() {
    const { onTaskUpdated, onLinkUpdated } = this.props;

    gantt.attachEvent('onAfterTaskAdd', (id, task) => {
      if (onTaskUpdated) {
        onTaskUpdated(id, 'inserted', task);
      }
    });

    gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
      if (onTaskUpdated) {
        onTaskUpdated(id, 'updated', task);
      }
    });

    gantt.attachEvent('onAfterTaskDelete', (id) => {
      if (onTaskUpdated) {
        onTaskUpdated(id, 'deleted');
      }
    });

    gantt.attachEvent('onAfterLinkAdd', (id, link) => {
      if (onLinkUpdated) {
        onLinkUpdated(id, 'inserted', link);
      }
    });

    gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
      if (onLinkUpdated) {
        onLinkUpdated(id, 'updated', link);
      }
    });

    gantt.attachEvent('onAfterLinkDelete', (id) => {
      if (onLinkUpdated) {
        onLinkUpdated(id, 'deleted');
      }
    });

    gantt.attachEvent('onBeforeTaskDisplay', (id, task) => {
      if ((task.priority === this.props.priority) || this.props.priority === null) {
        if (!this.props.search) {
          return true;
        }
        return this.taskDisplay(task.text);
      }
      return false;
    });

    const textEditor = { type: 'text', map_to: 'text' };

    gantt.config.sort = true;
    gantt.config.touch = 'force';
    gantt.config.autosize = 'y';

    gantt.config.columns = [
      { name: 'text', label: 'Task name', resize: true, tree: true, width: 156, sort: true, editor: textEditor },
      { name: 'start_date', label: 'Start time', align: 'center', resize: true, width: 90 },
      { name: 'duration', label: 'Duration', align: 'center', width: 70 },
      { name: 'priority', label: 'Priority', align: 'center', width: 70 },
      { name: 'add', max_width: 44, min_width: 44, width: 44 }
    ];

    gantt.config.lightbox.sections = [
      {
        name:"description",
        height:38,
        map_to:"text",
        type:"textarea",
        focus:true,
      },
      {
        name:"priority",
        height:38,
        map_to:"priority",
        type:"select",
        options: [
          { key: 'High', label: 'High' },
          { key: 'Normal', label: 'Normal' },
          { key: 'Low', label: 'Low' },
        ],
        default_value: 'Normal',
      },
      {
        name:"time",
        height:72,
        type:"duration",
        map_to:"auto"
      }
    ];

    gantt.locale.labels.section_priority = 'Priority';

    gantt.init(this.ganttContainer.current);
    gantt.parse(this.props.tasks);
  }

  componentDidUpdate(prevProps) {
    const { zoom, priority, search } = this.props;

    if (zoom !== prevProps.zoom || priority !== prevProps.priority || search !== prevProps.search) {
      gantt.render();
    }
  }

  render() {
    const { zoom } = this.props;
    this.setZoom(zoom);
    return (
      <div ref={this.ganttContainer} style={{ width: '100%', height: '100%' }} />
    );
  }

  taskDisplay = (searchField) => {
    const regExp = new RegExp(`${this.props.search}`, 'gi');
    return regExp.test(searchField);
  }

  setZoom = (value) => {
    switch (value) {
      case 'Hours': {
        gantt.config.scale_unit = 'day';
        gantt.config.date_scale = '%d %M';

        gantt.config.scale_height = 60;
        gantt.config.min_column_width = 30;
        gantt.config.subscales = [
          { unit:'hour', step:1, date:'%H' }
        ];
        break;
      }

      case 'Days': {
        gantt.config.min_column_width = 70;
        gantt.config.scale_unit = "week";
        gantt.config.date_scale = "#%W";
        gantt.config.subscales = [
          { unit: "day", step: 1, date: "%d %M" }
        ];
        gantt.config.scale_height = 60;
        break;
      }

      case 'Months': {
        gantt.config.min_column_width = 70;
        gantt.config.scale_unit = "month";
        gantt.config.date_scale = "%F";
        gantt.config.scale_height = 60;
        gantt.config.subscales = [
          { unit:"week", step:1, date:"#%W" }
        ];
        break;
      }

      default: {
        break;
      }
    }
  }
}

export default Gantt;
