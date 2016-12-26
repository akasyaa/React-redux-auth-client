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

class Signup extends Component {
    onSubmit({ email, password }) {
    }

    renderAlert() {
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
                <button type="submit" className="btn btn-primary" disabled={pristine || submitting}>Sign up</button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return { errorMsg: state.auth.error };
}

Signup = reduxForm({
    form: 'signup'
})(Signup);

export default Signup = connect(mapStateToProps, actions)(Signup);