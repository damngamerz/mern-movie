import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button
          ,Modal, ModalHeader, ModalBody, Label} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

/**
 * Contains Modal for Movie Dashboard/List.
 * @class
 */
class MovieList extends Component {
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
  state = {
    modal: false,
    _id:'',
    name:'',
    release_date:'',
    actors:'',
    average_user_rating:''
  }

  /**
   * Get items when this component Mounts.
   * @instance
   */
  componentDidMount() {
    this.props.getItems();
  }

  /**
   * Deletes a Movie Item.
   * @instance
   */
  onDeleteClick = id => {
    this.props.deleteItem(id);
    this.toggle();
  };
  
  /**
   * toggle used for ModalHeader toggle and also to pass current item info to Modal.
   * @instance
   */
  toggle = (_id, name, release_date, duration, actors, average_user_rating) => {
    this.setState({
      modal: !this.state.modal,
      _id: _id,
      name: name,
      release_date: release_date,
      duration: duration,
      actors: actors,
      average_user_rating: average_user_rating
    });
  };

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className='Movie-list'>
            {items.map(({ _id, name, release_date, duration, actors, average_user_rating }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                    <Button
                      onClick={()=>this.toggle(_id, name, release_date, duration, actors, average_user_rating)}
                      block
                    >
                    {name}
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                      <ModalHeader toggle={this.toggle}>Movie Details</ModalHeader>
                      <ModalBody>
                        {this.props.isAuthenticated ? (
                          <Button
                            className='remove-btn'
                            color='danger'
                            size='sm'
                            onClick={this.onDeleteClick.bind(this, this.state._id)}
                          >
                            &times;
                            Delete Movie
                          </Button>
                        ) : null}
                          <br/><br/>
                          <b>Movie Name: </b>
                          <Label for='movie'>{this.state.name}</Label><br/>
                          <b>Release Date: </b>
                          <Label for='movie'>{this.state.release_date}</Label><br/>
                          <b>Duration: </b>
                          <Label for='movie'>{this.state.duration}</Label><br/>
                          <b>Actors: </b>
                          <Label for='movie'>{this.state.actors}</Label><br/>
                          <b>Average User Rating: </b>
                          <Label for='movie'>{this.state.average_user_rating}</Label><br/>
                      </ModalBody>
                    </Modal>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
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
  { getItems, deleteItem }
)(MovieList);
