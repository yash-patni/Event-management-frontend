import React, { useState } from 'react';
import { filterEvents, filterAttendees } from '../services/api';

const Filters = ({ onEventFilter, onAttendeeFilter }) => {
  const [eventFilter, setEventFilter] = useState('');
  const [attendeeFilter, setAttendeeFilter] = useState('');

  const handleEventFilter = async () => {
    const response = await filterEvents({ location: eventFilter, data: null });
    console.log(response)
    onEventFilter(response);
  };

  const handleAttendeeFilter = async () => {
    const response = await filterAttendees({ name: attendeeFilter });
    console.log(response)
    onAttendeeFilter(response);
  };

  return (
    <div>
      <h3>Filters</h3>
      <input
        type="text"
        value={eventFilter}
        onChange={(e) => setEventFilter(e.target.value)}
        placeholder="Filter Events by location"
      />
      <button onClick={handleEventFilter}>Filter Events</button>
      <br />
      <input
        type="text"
        value={attendeeFilter}
        onChange={(e) => setAttendeeFilter(e.target.value)}
        placeholder="Filter Attendees by Name"
      />
      <button onClick={handleAttendeeFilter}>Filter Attendees</button>
    </div>
  );
};

export default Filters;
