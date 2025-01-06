import React, { useState } from 'react';
import { addAttendee, fetchAttendees } from '../services/api';

const AttendeeForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [eventId, setEventId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAttendee = { name, email, event: eventId };
    const response = await fetch('http://127.0.0.1:8000/api/attendees/add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAttendee),
    });
    if (response.ok) {
      alert('Attendee added successfully');
    } else {
      alert('Error adding attendee');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Attendee Name"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Attendee Email"
        required
      />
      <input
        type="number"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        placeholder="Event ID"
        required
      />
      <button type="submit">Add Attendee</button>
    </form>
  );
};

export default AttendeeForm;
