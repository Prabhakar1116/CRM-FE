import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCustomers, updateCustomer } from '../Services/Api';
import { AuthContext } from '../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EditCustomer = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    contact: '',
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const customers = await fetchCustomers(user.token);
        const customer = customers.find((cust) => cust._id === id);
        if (customer) {
          setInitialValues({
            name: customer.name,
            email: customer.email,
            contact: customer.contact,
          });
        }
      } catch (error) {
        toast.error('Failed to fetch customer data.');
      }
    };

    fetchCustomerData();
  }, [id, user.token]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    contact: Yup.string().required('Required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateCustomer(id, values, user.token);
      toast.success('Customer updated successfully!');
      navigate('/customers');
    } catch (error) {
      toast.error('Failed to update customer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h2>Edit Customer</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
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
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default EditCustomer;
