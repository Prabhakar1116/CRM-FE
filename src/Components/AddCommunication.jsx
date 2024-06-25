import React, { useState } from 'react';
import axios from 'axios';

const AddCommunication = () => {
  const [communication, setCommunication] = useState({
    customerId: '',
    timestamp: '',
    type: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommunication({
      ...communication,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/communications', communication);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert('Error adding communication');
    }
  };

  return (
    <div className="container">
      <h2>Add Communication</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer ID</label>
          <input
            type="text"
            className="form-control"
            name="customerId"
            value={communication.customerId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Timestamp</label>
          <input
            type="datetime-local"
            className="form-control"
            name="timestamp"
            value={communication.timestamp}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select
            className="form-control"
            name="type"
            value={communication.type}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="email">Email</option>
            <option value="call">Call</option>
            <option value="chat">Chat</option>
          </select>
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            className="form-control"
            name="message"
            value={communication.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Add Communication</button>
      </form>
    </div>
  );
};

export default AddCommunication;