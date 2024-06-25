import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CommunicationHistory = () => {
  const { customerId } = useParams();
  const [communications, setCommunications] = useState([]);

  useEffect(() => {
    const fetchCommunications = async () => {
      try {
        const response = await axios.get(`/api/communications/${customerId}`);
        setCommunications(response.data.communications);
      } catch (error) {
        console.error(error);
        alert('Error fetching communications');
      }
    };

    fetchCommunications();
  }, [customerId]);

  return (
    <div className="container">
      <h2>Communication History for Customer {customerId}</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Timestamp</th>
            <th>Type</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {communications.map((comm) => (
            <tr key={comm.communicationId}>
              <td>{comm.communicationId}</td>
              <td>{comm.timestamp}</td>
              <td>{comm.type}</td>
              <td>{comm.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommunicationHistory;
