import React from 'react';
import { registerUser } from '../Services/Api';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const navigate = useNavigate();

  // Initial form values
  const initialValues = {
    username: '',
    name: '',
    email: '',
    password: '',
    usertype: ''
  };

  // Validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
    usertype: Yup.string().required('User type is required')
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await registerUser(values); // Send user data to the backend
      toast.success('Registration successful! Please check your email to approve your account.');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setSubmitting(false); // Stop the loading indicator
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                className="form-control"
                id="username"
                name="username"
              />
              <ErrorMessage name="username" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <Field
                type="text"
                className="form-control"
                id="name"
                name="name"
              />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field
                type="email"
                className="form-control"
                id="email"
                name="email"
              />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="usertype">User Type:</label>
              <Field
                as="select"
                className="form-control"
                id="usertype"
                name="usertype"
              >
                <option value="">Select...</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Field>
              <ErrorMessage name="usertype" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default Register;
