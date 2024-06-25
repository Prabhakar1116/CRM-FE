import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/feedback', { message: feedback });
      alert(response.data.message);
      setFeedback('');
    } catch (error) {
      console.error(error);
      alert('Error submitting feedback');
    }
  };

  return (
    <div className="container">
      <h2>Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Message</label>
          <textarea
            className="form-control"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
