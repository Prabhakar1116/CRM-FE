import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Analytics = () => {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/api/analytics/customers');
        setAnalytics(response.data.analytics);
      } catch (error) {
        console.error(error);
        alert('Error fetching analytics');
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="container">
      <h2>Customer Analytics</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Customers</h5>
              <p className="card-text">{analytics.totalCustomers}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Active Customers</h5>
              <p className="card-text">{analytics.activeCustomers}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Inactive Customers</h5>
              <p className="card-text">{analytics.inactiveCustomers}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">New Customers (This Month)</h5>
              <p className="card-text">{analytics.newCustomersThisMonth}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
