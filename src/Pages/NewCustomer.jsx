import React from 'react';
import { createCustomer } from '../Services/Api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const NewCustomer = () => {
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    contact: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    contact: Yup.string().required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await createCustomer(values, user.token);
      toast.success('Customer created successfully!');
      navigate('/customers');
    } catch (error) {
      toast.error('Failed to create customer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h2>New Customer</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <Field type="text" className="form-control" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field type="email" className="form-control" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact:</label>
              <Field type="text" className="form-control" id="contact" name="contact" />
              <ErrorMessage name="contact" component="div" className="text-danger" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Add Customer
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default NewCustomer;
