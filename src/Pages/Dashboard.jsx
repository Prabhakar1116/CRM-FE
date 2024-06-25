import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCustomers } from '../Additionals/customerSlice';
import { AuthContext } from '../Context/AuthContext';

const Dashboard = () => {
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
      <h2>Dashboard</h2>
      <p>Welcome, {user?.email}</p>
      <h3>Customer List</h3>
      <ul className="list-group">
        {customers.map((customer) => (
          <li key={customer._id} className="list-group-item">
            {customer.name} - {customer.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;