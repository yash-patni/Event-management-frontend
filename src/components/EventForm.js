import React, { useState } from 'react';
import { addEvent, fetchEvents } from '../services/api';

const EventForm = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = { name, date, location };
    const response = await fetch('http://127.0.0.1:8000/api/events/add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    });
    if (response.ok) {
      alert('Event added successfully');
    } else {
      alert('Error adding event');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Event Name"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Event Location"
        required
      />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default EventForm;
