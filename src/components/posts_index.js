import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostIndex extends Component {
    
    // Executes right after component is loaded in the DOM.
    componentDidMount() {
        this.props.fetchPosts();
    }
    
    render() {
        return (
            <div>
                Posts Index
            </div>
        );
    }
}


// Shortcut to avoid use of mapDispatchToProps is by just passing in {fetchPosts}
// If you require say a computation then you can then bring back use of mapDispatchToProps.
export default connect(null, { fetchPosts })(PostIndex);