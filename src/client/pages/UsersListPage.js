import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchUsers } from '../actions';

class UsersList extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>
    });
  }

  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users loaded`}</title>
        <meta property="og:type" content="Users App" />
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
        Here's list of users
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

function loadData(store) {
  return store.dispatch(fetchUsers());
}

function mapStateToProps(state) {
  return { users: state.users };
}

export default {
  loadData: loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersList),
};
