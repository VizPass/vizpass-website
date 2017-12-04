import React, { Component } from 'react';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getNotification, notificationActions } from 'src/notification';
import { getTaskFilter, getVisibleTasks, tasksActions } from 'src/tasks';
import { getWaitFilter, getVisibleWaits, waitsActions } from 'src/waits';

import Notification from '../../components/notification';

// import TaskFilters from '../../components/task-filters';
// import TaskForm from '../../components/task-form';
import TaskList from '../../components/task-list';

// import WaitFilters from '../../components/wait-filters';
// import WaitForm from '../../components/wait-form';
import WaitList from '../../components/wait-list';


export class TasksPage extends Component {
  static propTypes = {
    createWait: PropTypes.func.isRequired,
    createTask: PropTypes.func.isRequired,
    dismissNotification: PropTypes.func.isRequired,
    filterWaits: PropTypes.func.isRequired,
    filterTasks: PropTypes.func.isRequired,
    filterType: PropTypes.string.isRequired,
    loadWaits: PropTypes.func.isRequired,
    loadTasks: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired,
    removeWait: PropTypes.func.isRequired,
    waits: PropTypes.instanceOf(List).isRequired,
    updateWait: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    tasks: PropTypes.instanceOf(List).isRequired,
    undeleteTask: PropTypes.func.isRequired,
    unloadWaits: PropTypes.func.isRequired,
    unloadTasks: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.loadTasks();
    this.props.filterTasks(
      this.getFilterParam(this.props.location.search)
    );
    this.props.loadWaits();
    this.props.filterWaits(
      this.getFilterParam(this.props.location.search)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.props.filterTasks(
        this.getFilterParam(nextProps.location.search)
      );
    }
    if (nextProps.location.search !== this.props.location.search) {
      this.props.filterWaits(
        this.getFilterParam(nextProps.location.search)
      );
    }
  }

  componentWillUnmount() {
    this.props.unloadTasks();
    this.props.unloadWaits();
  }

  getFilterParam(search) {
    const params = new URLSearchParams(search);
    return params.get('filter');
  }

  renderNotification() {
    const { notification } = this.props;
    return (
      <Notification
        action={this.props.undeleteTask}
        actionLabel={notification.actionLabel}
        dismiss={this.props.dismissNotification}
        display={notification.display}
        message={notification.message}
      />
    );
  }

  render() {
    return (
<<<<<<< HEAD
      <div className="g-row">
      <div className="g-col-2">
        <img src="./lhd.png" width="87" height="109"></img>
      </div>
        <div className="g-col-1">
          <TaskList
            removeTask={this.props.removeTask}
            tasks={this.props.tasks}
            updateTask={this.props.updateTask}
=======
      <div className="g-row-1">


        <div className="g-col-1">
          <div className="g-col-text">
            <h2>In Event</h2>
          </div>

          <WaitList
            removeWait={this.props.removeWait}
            waits={this.props.waits}
            updateWait={this.props.updateWait}
>>>>>>> baa414e9c81d7bd70a8f508e58ced384ee05562d
          />

        </div>

        {this.props.notification.display ? this.renderNotification() : null}
      </div>
    );
  }
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = createSelector(
  getNotification,
  getTaskFilter,
  getVisibleTasks,
  (notification, filterType, tasks) => ({
    notification,
    filterType,
    tasks
  }),
  getWaitFilter,
  getVisibleWaits,
  (notification, filterType, waits) => ({
    notification,
    filterType,
    waits
  })
);

const mapDispatchToProps = Object.assign(
  {},
  tasksActions,
  waitsActions,
  notificationActions
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksPage);
