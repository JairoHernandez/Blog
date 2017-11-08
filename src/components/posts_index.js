import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class PostIndex extends Component {
    
    // Executes right after component is loaded in the DOM. It then calls action creator again.
    // Data be empty at first ajax call since async ajax request promise/resolve has not completed yet.
    componentDidMount() {
        //console.log('componentDidMount');
        this.props.fetchPosts();
    }

    renderPosts() {
        // Because this is an object and not an array you cannot use map. 
        // So you have to use lodash map, which has object ability. It returns array though,
        // which is what React expects when trying to render a list of components.
        // Remember to use id for key since it's unique.
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post.id}>
                    {post.title}
                </li>
            );
        });
    }
    
    render() {
        console.log(this.props.posts);
        return (
            <div>
                <div className="text-xs-right">
                    <Link className="btn btn-primary" to="/posts/new">
                        Add a Post
                    </Link>
                </div>
                <h3>Posts</h3>
                <ul className="list-group">
                    {this.renderPosts() }
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { posts: state.posts };
}

// Shortcut to avoid use of mapDispatchToProps is by just passing in {fetchPosts}
// If you require say a computation then you can then bring back use of mapDispatchToProps.
export default connect(mapStateToProps, { fetchPosts })(PostIndex);