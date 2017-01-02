import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import * as actions from '../../actions';

const required = value => value ? undefined : 'Required';

const validate = values => {
    const errors = {};
    if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = 'Please enter matching password.'
    }

    return errors;
}

const renderInput = field =>
    <div>
        <input {...field.input} type={field.type} className='form-control' />
        {field.meta.touched &&
         field.meta.error &&
        <span className='error'>{field.meta.error}</span>}
    </div>

class Signup extends Component {
    onSubmit({ email, password }) {
        this.props.signUpUser({ email, password });
    }

    renderAlert() {
        if(this.props.errorMsg) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops! </strong>{this.props.errorMsg}
                </div>
            );
        }
    }

    render() {
        const { handleSubmit, pristine, submitting } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className='signup'>
                <div className='form-group'>
                    <label htmlFor='email'>E-mail:</label>
                    <Field
                        name='email'
                        component={renderInput}
                        type='text'
                        validate={required} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <Field
                        name="password"
                        component={renderInput}
                        type="password"
                        validate={required} />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordConfirm">Confirm Password:</label>
                    <Field
                        name="passwordConfirm"
                        component={renderInput}
                        type="password"
                        validate={required} />
                </div>
                {this.renderAlert()}
                <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Sign up</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMsg: state.auth.error };
}

Signup = reduxForm({
    form: 'signup',
    validate
})(Signup);

export default Signup = connect(mapStateToProps, actions)(Signup);
