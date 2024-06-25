import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('/api/customers');
        setCustomers(response.data.customers);
      } catch (error) {
        console.error(error);
        alert('Error fetching customers');
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await axios.delete(`/api/customers/${customerId}`);
        setCustomers(customers.filter((customer) => customer._id !== customerId));
        alert('Customer deleted successfully');
      } catch (error) {
        console.error(error);
        alert('Error deleting customer');
      }
    }
  };

  return (
    <div className="container">
      <h2>Customer Management</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer._id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>
                <button className="btn btn-info">View</button>
                <button className="btn btn-danger" onClick={() => handleDelete(customer._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagement;