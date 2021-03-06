import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as action from '../actions'
import * as PostsAPI from '../services/posts-api';
import { withRouter } from 'react-router-dom'

class CreatePost extends Component {
    state = {
        error: ''
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.title || !this.state.body || !this.state.author || !this.state.category){
            this.setState ({
                error: 'Please enter all the required fields'
            })
            return false;
        }

        const uuid = require('uuid/v1');
        const post = {
            id: uuid(),
            timestamp: Date.now(),
            title: this.state.title,
            body: this.state.body,
            author: this.state.author,
            category: this.state.category,
            voteScore: 1,
            deleted: false,
            commentCount: 0
        }
        PostsAPI.createPost(post).then((item) => {
            this.props.addPost(item);
            this.props.history.push('/');
        });
    }
    render() {
        const { categories, history } = this.props
        return (
            <div className="container">
                <form onSubmit={this.onSubmit.bind(this)}>
                    <h3>Add a new Post</h3>
                    {(this.state.error) && 
                        (<div class="alert alert-danger" role="alert">
                       <p>{this.state.error}</p> 
                    </div>
                    )}
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Author</label>
                        <div className="col-sm-8">
                            <input type="text" id="author" name="author" onChange={(e) => this.setState({ author: e.target.value })} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Category</label>
                        <div className="col-sm-8">
                            <select id="category" name="category" onChange={(e) => this.setState({ category: e.target.value })}>
                                <option value="">Select a Category</option>
                                {categories && categories.items && categories.items.map((category) => (
                                    <option key={category.path} value={category.path} >{category.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Title</label>
                        <div className="col-sm-8">
                            <input type="text" id="title" name="title" onChange={(e) => this.setState({ title: e.target.value })} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Body</label>
                        <div className="col-sm-8">
                            <textarea id="body" name="body" placeholder="Write something.." onChange={(e) => this.setState({ body: e.target.value })}></textarea>
                        </div>
                    </div>
                    <div className="row">
                        <div className="offset-sm-4 col-sm-8">
                            <div class="btn-group">
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </div>
                            <div class="btn-group">
                                <button type="button" class="btn btn-secondary" onClick={(e) => { history.goBack(); }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addPost: (post) => dispatch(action.addPost(post))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatePost))
