import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    // field parameter is necessary to know JSX is destined for <Field/> component
    // {...field.input} equivalent
        // onChange={filed.input.onChange}
        // onFocus={filed.input.onFocus}
        // onBlur={filed.input.onBlur}
    // <label> was previously hardcoded but now with DRY you can use {field.label}
    renderField(field) { // field input represents single piece of state
        
        const { meta: { touched, error } } = field; //  Cray destructure --> touched = field.meta.touched and error = field.meta.error.
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        // this === component
        // console.log(values);
        this.props.createPost(values);
    }

    render() {

        // handleSubmit is a property being passed to the component on behalf of redux form.
        // it runs the redux side of things like making sure form is valid.
        // then if validation passes we will go ahead and submit the form data in
        // line <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        // which then passes the values out of the form using callback onSubmit(values)
        // bind(this) is appended to be sure we execute onSubmit in a different context
        // outside of our component since it's callback
        const { handleSubmit } = this.props;

        // component is used to display Field comoponent.
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title For Post" 
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

// Runs when user submits form with ENTER key.
// values is an object that contains all values entered into form.
function validate(values) { // object will look like {title: "asdf", categories: "asdf", content: "asdf"}

    const errors = {};

    // Validate the inputs from 'values'. It checks 'name' property from <Field /> component. 
    if (!values.title || values.title.length < 3) {
        errors.title = "Enter a title with at least 3 characters!";
    }

    if (!values.categories) {
        errors.categories = "Enter some categories.";
    }

    if (!values.content) {
        errors.content = "Enter some content please.";
    }

    // If errors object is empty the form is fine to submit.
    // If errors object has any properties redux-form assumes form is invalid.
    return errors;

}

export default reduxForm({
    validate, // ES6
    // Think of 'form' property as name of the form. 
    // Gives ability to add multiple forms on a single page by adding more properties.
    // VERY CRITICAL that the string assigned to form property is unique to not interfere
    // with multiple forms.
    form: 'PostNewForm' 
})(
    connect(null, { createPost })(PostsNew)
);