import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { Wait } from 'src/waits';
import { createTestComponent } from 'src/utils/create-test-component';
import WaitItem from './wait-item';


describe('WaitItem', () => {
  let props;
  let wait;


  beforeEach(() => {
    wait = new Wait({completed: true, title: 'test'});

    props = {
      wait,
      removeWait: sinon.spy(),
      updateWait: sinon.spy()
    };
  });


  describe('component', () => {
    let waitItem;

    beforeEach(() => {
      waitItem = createTestComponent(WaitItem, props);
    });


    describe('instantiation', () => {
      it('should initialize #state.editing to be false', () => {
        expect(waitItem.state.editing).toEqual(false);
      });

      it('should initialize #props.wait with a Wait instance', () => {
        expect(waitItem.props.wait instanceof Wait).toBe(true);
      });
    });

    describe('#delete() method', () => {
      it('should call #waitActions.deleteWait', () => {
        waitItem.remove();
        expect(waitItem.props.removeWait.callCount).toEqual(1);
        expect(waitItem.props.removeWait.calledWith(waitItem.props.wait)).toEqual(true);
      });
    });

    describe('#edit() method', () => {
      it('should set #state.editing to `true`', () => {
        waitItem.edit();
        expect(waitItem.state.editing).toEqual(true);
      });
    });

    describe('#stopEditing() method', () => {
      it('should set #state.editing to `false`', () => {
        waitItem.state.editing = true;
        waitItem.stopEditing();
        expect(waitItem.state.editing).toEqual(false);
      });
    });

    describe('#save() method', () => {
      it('should do nothing if not editing', () => {
        waitItem.stopEditing = sinon.spy();
        waitItem.state.editing = false;
        waitItem.save();
        expect(waitItem.stopEditing.callCount).toEqual(0);
      });

      it('should set #state.editing to `false`', () => {
        waitItem.state.editing = true;
        waitItem.save({
          target: {value: ''}
        });
        expect(waitItem.state.editing).toEqual(false);
      });

      it('should call #waitActions.updateWait', () => {
        waitItem.state.editing = true;
        waitItem.save({
          target: {value: 'foo'}
        });
        expect(waitItem.props.updateWait.callCount).toEqual(1);
        expect(waitItem.props.updateWait.args[0][0]).toEqual(wait);
        expect(waitItem.props.updateWait.args[0][1].title).toEqual('foo');
      });
    });

    describe('#toggleStatus() method', () => {
      it('should call #waitActions.updateWait', () => {
        waitItem.toggleStatus({
          target: {checked: true}
        });

        expect(waitItem.props.updateWait.callCount).toEqual(1);
      });

      it('should toggle wait.complete', () => {
        waitItem.toggleStatus();
        expect(waitItem.props.updateWait.args[0][1].completed).toEqual(!wait.completed);
      });
    });

    describe('#handleKeyUp() method', () => {
      describe('with enter key', () => {
        it('should call #save() with event object', () => {
          waitItem.save = sinon.spy();
          waitItem.handleKeyUp({keyCode: 13});
          expect(waitItem.save.callCount).toEqual(1);
        });
      });

      describe('with escape key', () => {
        it('should set #state.editing to `false`', () => {
          waitItem.state.editing = true;
          waitItem.handleKeyUp({keyCode: 27});
          expect(waitItem.state.editing).toEqual(false);
        });
      });
    });
  });


  describe('DOM', () => {
    describe('title', () => {
      it('should be rendered as a text input field when editing', () => {
        const wrapper = mount(<WaitItem {...props} />);
        wrapper.setState({editing: true});

        const titleInput = wrapper.find('input');
        const titleText = wrapper.find('.wait-item__title');

        expect(titleInput.length).toBe(1);
        expect(titleInput.get(0).value).toBe('test');
        expect(titleText.length).toBe(0);
      });

      it('should be rendered as text when not editing', () => {
        const wrapper = mount(<WaitItem {...props} />);
        wrapper.setState({editing: false});

        const titleInput = wrapper.find('input');
        const titleText = wrapper.find('.wait-item__title');

        expect(titleInput.length).toBe(0);
        expect(titleText.length).toBe(1);
        expect(titleText.text()).toBe('test');
      });
    });


    it('should set `onKeyUp` of input field to be #handleKeyUp()', () => {
      const wrapper = mount(<WaitItem {...props} />);
      wrapper.setState({editing: true});

      const component = wrapper.instance();
      const input = wrapper.find('input');
      expect(input.prop('onKeyUp')).toBe(component.handleKeyUp);
    });

    it('should set `onClick` of status button to be #toggleStatus()', () => {
      const wrapper = mount(<WaitItem {...props} />);
      const component = wrapper.instance();
      const buttons = wrapper.find('Button');
      expect(buttons.at(0).prop('onClick')).toBe(component.toggleStatus);
    });

    it('should set `onClick` of edit button to be #edit()', () => {
      const wrapper = mount(<WaitItem {...props} />);
      const component = wrapper.instance();
      const buttons = wrapper.find('Button');
      expect(buttons.at(1).prop('onClick')).toBe(component.edit);
    });

    it('should set `onClick` of clear button to be #stopEditing()', () => {
      const wrapper = mount(<WaitItem {...props} />);
      const component = wrapper.instance();
      const buttons = wrapper.find('Button');
      expect(buttons.at(2).prop('onClick')).toBe(component.stopEditing);
    });

    it('should set `onClick` of delete button to be #remove()', () => {
      const wrapper = mount(<WaitItem {...props} />);
      const component = wrapper.instance();
      const buttons = wrapper.find('Button');
      expect(buttons.at(3).prop('onClick')).toBe(component.remove);
    });
  });
});
