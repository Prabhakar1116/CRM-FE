import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCustomers } from '../Additionals/customerSlice';
import { AuthContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';

const Customers = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const { items: customers, status, error } = useSelector((state) => state.customers);

  useEffect(() => {
    if (user) {
      dispatch(fetchAllCustomers(user.token));
    }
  }, [dispatch, user]);

  if (status === 'loading') {
    return <p>Loading customers...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <h2>Customers</h2>
      <Link to="/customers/new" className="btn btn-primary mb-3">Add New Customer</Link>
      <ul className="list-group">
        {customers.map((customer) => (
          <li key={customer._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{customer.name}</h5>
              <p>{customer.email}</p>
            </div>
            <div>
              <Link to={`/customers/edit/${customer._id}`} className="btn btn-warning mr-2">Edit</Link>
              <Link to={`/customers/delete/${customer._id}`} className="btn btn-danger">Delete</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Customers;