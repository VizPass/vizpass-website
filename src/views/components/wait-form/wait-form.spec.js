import { Simulate } from 'react-dom/test-utils';
import { findDOMNode } from 'react-dom';
import sinon from 'sinon';
import { createTestComponent } from 'src/utils/create-test-component';
import WaitForm from './wait-form';


describe('WaitForm', () => {
  let waitForm;


  beforeEach(() => {
    waitForm = createTestComponent(WaitForm, {
      handleSubmit: sinon.spy()
    });
  });


  describe('component', () => {
    describe('instantiation:', () => {
      it('should set #state.title with an empty string', () => {
        expect(waitForm.state.title).toEqual('');
      });
    });

    describe('#clearInput() method', () => {
      it('should set #state.title with an empty string', () => {
        waitForm.state.title = 'foo';
        expect(waitForm.state.title).toEqual('foo');

        waitForm.clearInput();
        expect(waitForm.state.title).toEqual('');
      });
    });


    describe('#handleChange() method', () => {
      it('should set #state.title with event.target.value', () => {
        const event = {target: {value: 'value'}};
        waitForm.handleChange(event);
        expect(waitForm.state.title).toEqual(event.target.value);
      });
    });


    describe('#handleKeyUp() method', () => {
      describe('with escape key', () => {
        it('should set #state.title with an empty string', () => {
          waitForm.state.title = 'foo';
          waitForm.handleKeyUp({keyCode: 27});
          expect(waitForm.state.title).toEqual('');
        });
      });
    });


    describe('#handleSubmit() method', () => {
      it('should prevent the default action of the event', () => {
        const event = {preventDefault: sinon.spy()};
        waitForm.handleSubmit(event);
        expect(event.preventDefault.callCount).toEqual(1);
      });

      it('should call waitActions#handleSubmit with #state.title', () => {
        const event = {preventDefault: sinon.spy()};

        waitForm.state.title = 'foo';
        waitForm.handleSubmit(event);

        expect(waitForm.props.handleSubmit.callCount).toEqual(1);
        expect(waitForm.props.handleSubmit.calledWith('foo')).toEqual(true);
      });

      it('should set #state.title with an empty string', () => {
        const event = {preventDefault: sinon.spy()};

        waitForm.state.title = 'foo';
        waitForm.handleSubmit(event);

        expect(waitForm.state.title).toEqual('');
      });

      it('should not save if title evaluates to an empty string', () => {
        const event = {preventDefault: sinon.spy()};

        waitForm.state.title = '';
        waitForm.handleSubmit(event);

        expect(waitForm.props.handleSubmit.callCount).toBe(0);

        waitForm.state.title = '    ';
        waitForm.handleSubmit(event);

        expect(waitForm.props.handleSubmit.callCount).toBe(0);
      });
    });
  });


  describe('DOM', () => {
    describe('`keyup` event triggered on text field with escape key', () => {
      it('should set #state.title with an empty string', () => {
        waitForm.setState({title: 'foo'});
        Simulate.keyUp(waitForm.titleInput, {keyCode: 27});
        expect(waitForm.state.title).toEqual('');
      });

      it('should set text field value with an empty string', () => {
        waitForm.setState({title: 'foo'});
        Simulate.keyUp(waitForm.titleInput, {keyCode: 27});
        expect(waitForm.titleInput.value).toEqual('');
      });
    });


    describe('`change` event triggered on text field', () => {
      it('should set #state.title with the value from the text field', () => {
        waitForm.titleInput.value = 'foo';
        expect(waitForm.state.title).toEqual('');
        Simulate.change(waitForm.titleInput);
        expect(waitForm.state.title).toEqual('foo');
      });
    });


    describe('`submit` event triggered on form', () => {
      it('should prevent the default action of the event', () => {
        const event = {preventDefault: sinon.spy()};
        Simulate.submit(findDOMNode(waitForm), event);
        expect(event.preventDefault.callCount).toEqual(1);
      });

      it('should set text field value with an empty string', () => {
        const event = {preventDefault: sinon.spy()};
        waitForm.setState({title: 'foo'});
        Simulate.submit(findDOMNode(waitForm), event);
        expect(waitForm.titleInput.value).toEqual('');
      });
    });
  });
});
