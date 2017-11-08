import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
    // field parameter is necessary to know JSX is destined for <Field/> component
    // {...field.input} equivalent
        // onChange={filed.input.onChange}
        // onFocus={filed.input.onFocus}
        // onBlur={filed.input.onBlur}
    renderTitleField(field) { 
        return (
            <div>
                <input
                    type="text"
                    {...field.input}
                />
            </div>
        )
    }

    render() {
        // component is used to display Field comoponent.
        return (
            <form action="">
                <Field 
                    name="title"
                    component={this.renderTitleField}
                />
            </form>
        );
    }
}

export default reduxForm({
    // Think of 'form' property as name of the form. 
    // Gives ability to add multiple forms on a single page by adding more properties.
    // VERY CRITICAL that the string assigned to form property is unique to not interfere
    // with multiple forms.
    form: 'PostNewForm' 
})(PostsNew);