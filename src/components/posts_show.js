import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
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

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
        /** It's not a good idea to replace the above 2 lines with just this
         * 
         * this.props.deletePost(id);
         * 
         * That would load the component before the ajax request to backend
         * completes so our component will not know what to delete. */
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return (<div>Loading...</div>);
        }

        return (
            <div>
                <Link to="/">Back To Index</Link>
                <button 
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
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

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);