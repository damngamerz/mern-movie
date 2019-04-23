import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

/**
 * Contains Modal for Add Movie Component.
 * @class
 */
class AddMovie extends Component {
  state = {
    modal: false,
    name: '',
    release_date: '',
    duration: '',
    actors: '',
    average_user_rating: ''
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  /**
   * toggle used for ModalHeader toggle.
   * @instance
   */
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  /**
   * Create event and set the value from text box to targets.
   * @instance
   */
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * on sumbit button create event to supply details of new item to addItem prop.
   * @instance
   */
  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      release_date: this.state.release_date,
      duration: this.state.duration,
      actors: this.state.actors,
      average_user_rating: this.state.average_user_rating
    };

    // Add item via addItem action
    this.props.addItem(newItem);

    // Close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color='primary'
            style={{ marginBottom: '2rem' }}
            onClick={this.toggle}
            block
          >
            Add Movie
          </Button>
        ) : (
          <h4 className='mb-3 ml-4'>Please log in to add Movies</h4>
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Movie List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='movie'>Movie</Label>
                <Input
                  type='text'
                  name='name'
                  id='item'
                  placeholder='Add Movie name'
                  onChange={this.onChange}
                />
                <Label for='movie'>Release Date</Label>
                <Input
                  type='text'
                  name='release_date'
                  id='item'
                  placeholder='Add Movie Release Date'
                  onChange={this.onChange}
                />
                <Label for='movie'>Duration</Label>
                <Input
                  type='text'
                  name='duration'
                  id='item'
                  placeholder='Add Movie Duration'
                  onChange={this.onChange}
                />
                <Label for='movie'>Actors</Label>
                <Input
                  type='text'
                  name='actors'
                  id='item'
                  placeholder='Add Movie Actors'
                  onChange={this.onChange}
                />
                <Label for='movie'>Average User Rating</Label>
                <Input
                  type='text'
                  name='average_user_rating'
                  id='item'
                  placeholder='Add Average User Rating'
                  onChange={this.onChange}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Add Movie
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

/**
 * Reduce states using the authActions provided.
 * @function
 * @param {Object} state - contains current state items.
 * @returns - returns an object about authenticated and items.
 */
const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { addItem }
)(AddMovie);
