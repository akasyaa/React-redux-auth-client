import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import * as actions from '../../actions';

const renderInput = field =>
    <div>
        <input {...field.input} type={field.type} className='form-control' />
        {field.meta.touched &&
         field.meta.error &&
        <span className='error'>{field.meta.error}</span>}
    </div>

class Signin extends Component {
    componentWillMount() {
        this.props.resetError();
    }

    onSubmit({ email, password }) {
        //Authentication
        this.props.signInUser({ email, password });
    }

    renderAlert() {
        if (this.props.errorMsg) {
            return (
                <div className="alert alert-danger">
                    <strong>ERROR! Unable to Signin</strong>
                </div>
            );
        }
    }

    render() {
        const { handleSubmit, pristine, submitting } = this.props;

        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className='signin'>
                <div className='form-group'>
                    <label htmlFor='email'>E-mail:</label>
                    <Field
                        name='email'
                        component={renderInput}
                        type='text' />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <Field
                        name="password"
                        component={renderInput}
                        type="password" />
                </div>
                {this.renderAlert()}
                <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Sign in</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMsg: state.auth.error };
}

Signin = reduxForm({
    form: 'signin'
})(Signin);

export default Signin = connect(mapStateToProps, actions)(Signin);
