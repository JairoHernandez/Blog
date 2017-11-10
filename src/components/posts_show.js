import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
    componentDidMount() {
        const { id } = this.props.match.params; // match propertly is directly from react-router
        this.props.fetchPost(id);

        /** For caching performance if you dont want to refetch the post everytime you 
         *  click on is from root page then move the previous 2 lines into 
         *  
         *  if (!this.props.post) { // Means if we already have a post.
         *  }
         * */
    }
    render() {
        const { post } = this.props;

        if (!post) {
            return (<div>Loading...</div>);
        }

        return (
            <div>
                <Link to="/">Back To Index</Link>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

// {posts} is what contains all our posts for our application
// ownProps(name is convention). ownProps is a props object headed to component PostsShow.
// it will allow us to send just the single post we care about to component.
// It's an important trick to avoid having to write typical handlerFunction inside the component class.
function mapStateToProps({posts}, ownProps) { 
    console.log('ownProps:', ownProps);
    console.log('posts:', posts);
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost })(PostsShow);