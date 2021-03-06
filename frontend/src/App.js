import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Posts from './components/Posts';
import PostDetails from './components/PostDetails';
import CreatePost from './components/CreatePost';
import CreateComment from './components/CreateComment';
import EditComment from './components/EditComment';
import EditPost from './components/EditPost';
import PostsByCategory from './components/PostsByCategory';
import SortByFilter from './components/SortByFilter';
import Error404 from './components/Error404';
import './App.css';
import * as CategoriesAPI from './services/categories-api';
import * as PostsAPI from './services/posts-api';
import { connect } from 'react-redux'
import * as action from './actions'
import * as categoriesAction from './actions/categories'

class App extends Component {
  componentDidMount() {
    CategoriesAPI.getCategories().then((categories) => { this.props.getCategories(categories); });
    PostsAPI.getPosts().then((posts) => { this.props.getPosts(posts); });
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavigationBar />
          {
            !this.props.displayErrorPage && (
              <SortByFilter/>
              )
          }
          <Switch>
            <Route exact path={'/:category'} component={PostsByCategory} />
            
            <Route exact path="/" component={Posts} />
            <Route exact path="/post/add" render={() => (
              <CreatePost />
            )} />
            <Route exact path="/:id/comment" render={() => (
              <CreateComment />
            )} />
            <Route exact path="/post/:id" render={() => (
              <EditPost/>
            )} />
            <Route exact path="/post/:postId/comment/:id" render={() => (
              <EditComment />
            )} />
            <Route exact path="/:category/:id" render={({ match }) => (
              <PostDetails match={match} />
            )} />
            <Route component={Error404} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    displayErrorPage: state.displayErrorPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: (categories) => dispatch(categoriesAction.getCategories(categories)),
    getPosts: (posts) => dispatch(action.getPosts(posts))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
