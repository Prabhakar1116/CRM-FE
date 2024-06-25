import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteCustomer, fetchCustomers } from '../Services/Api';
import { AuthContext } from '../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteCustomer = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const confirmDelete = async () => {
      if (window.confirm('Are you sure you want to delete this customer?')) {
        try {
          await deleteCustomer(id, user.token);
          toast.success('Customer deleted successfully!');
          navigate('/customers');
        } catch (error) {
          toast.error('Failed to delete customer. Please try again.');
        }
      } else {
        navigate('/customers');
      }
    };
    confirmDelete();
  }, [id, user.token, navigate]);

  return (
    <div className="container">
      <h2>Delete Customer</h2>
      <ToastContainer />
    </div>
  );
};

export default DeleteCustomer;