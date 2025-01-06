import React, { useState } from 'react';

const UpdateEventForm = ({ event, onUpdate }) => {
  const [name, setName] = useState(event.name);
  const [location, setLocation] = useState(event.location);
  const [date, setDate] = useState(event.date);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedEvent = { name, location, date };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/events/update/${event.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEvent),
      });

      if (response.ok) {
        const data = await response.json();
        onUpdate(data);
      } else {
        console.error('Failed to update the event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Event</h3>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Event Name" required />
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button type="submit">Update Event</button>
    </form>
  );
};

export default UpdateEventForm;
