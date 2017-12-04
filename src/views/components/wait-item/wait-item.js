import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../button';
import Icon from '../icon';

import './wait-item.css';


export class WaitItem extends Component {
  constructor() {
    super(...arguments);

    this.state = {editing: false};

    this.edit = this.edit.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
    this.stopEditing = this.stopEditing.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  edit() {
    this.setState({editing: true});
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.save(event);
    }
    else if (event.keyCode === 27) {
      this.stopEditing();
    }
  }

  remove() {
    this.props.removeWait(this.props.wait);
  }

  save(event) {
    if (this.state.editing) {
      const { wait } = this.props;
      const title = event.target.value.trim();

      if (title.length && title !== wait.title) {
        this.props.updateWait(wait, {title});
      }

      this.stopEditing();
    }
  }

  stopEditing() {
    this.setState({editing: false});
  }

  toggleStatus() {
    const { wait } = this.props;
    this.props.updateWait(wait, {completed: !wait.completed});
  }

  renderTitle(wait) {
    return (
      <div className="wait-item__title" tabIndex="0">
        {wait.title}
      </div>
    );
  }

  renderTitleInput(wait) {
    return (
      <input
        autoComplete="off"
        autoFocus
        className="wait-item__input"
        defaultValue={wait.title}
        maxLength="64"
        onKeyUp={this.handleKeyUp}
        type="text"
      />
    );
  }

  render() {
    const { editing } = this.state;
    const { wait } = this.props;

    let containerClasses = classNames('wait-item', {
      'wait-item--completed': wait.completed,
      'wait-item--editing': editing
    });

    return (
      <div className={containerClasses} tabIndex="0">
        <div className="cell">

        </div>

        <div className="cell">
          {editing ? this.renderTitleInput(wait) : this.renderTitle(wait)}
        </div>

        <div className="cell">
          <Button
            className={classNames('btn--icon', 'wait-item__button', {'hide': editing})}
            onClick={this.edit}>
            <Icon name="mode_edit" />
          </Button>
          <Button
            className={classNames('btn--icon', 'wait-item__button', {'hide': !editing})}
            onClick={this.stopEditing}>
            <Icon name="clear" />
          </Button>
          <Button
            className={classNames('btn--icon', 'wait-item__button', {'hide': editing})}
            onClick={this.remove}>
            <Icon name="delete" />
          </Button>
        </div>
      </div>
    );
  }
}

WaitItem.propTypes = {
  removeWait: PropTypes.func.isRequired,
  wait: PropTypes.object.isRequired,
  updateWait: PropTypes.func.isRequired
};


export default WaitItem;
