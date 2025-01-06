import React, { useState } from 'react';

const UpdateAttendeeForm = ({ attendee, events, onUpdate }) => {
  const [name, setName] = useState(attendee.name);
  const [email, setEmail] = useState(attendee.email);
  const [event, setEvent] = useState(attendee.event);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAttendee = { name, email, event };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/attendees/update/${attendee.id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAttendee),
      });

      if (response.ok) {
        const data = await response.json();
        onUpdate(data);
      } else {
        console.error('Failed to update the attendee');
      }
    } catch (error) {
      console.error('Error updating attendee:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Attendee</h3>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <select value={event} onChange={(e) => setEvent(e.target.value)} required>
        <option value="">Select Event</option>
        {events.map((ev) => (
          <option key={ev.id} value={ev.id}>
            {ev.name}
          </option>
        ))}
      </select>
      <button type="submit">Update Attendee</button>
    </form>
  );
};

export default UpdateAttendeeForm;
