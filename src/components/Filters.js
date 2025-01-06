import React, { useState } from 'react';
import { filterEvents, filterAttendees } from '../services/api';

const Filters = ({ onEventFilter, onAttendeeFilter }) => {
  const [eventFilter, setEventFilter] = useState({
    location: '',
    date: '',
  });
  const [attendeeFilter, setAttendeeFilter] = useState('');

  const handleEventFilter = async () => {
    try {
      const response = await filterEvents(eventFilter);
      console.log(response);
      onEventFilter(response);
    } catch (error) {
      console.error('Error filtering events:', error);
    }
  };

  const handleAttendeeFilter = async () => {
    try {
      const response = await filterAttendees({ name: attendeeFilter });
      console.log(response);
      onAttendeeFilter(response);
    } catch (error) {
      console.error('Error filtering attendees:', error);
    }
  };

  return (
    <div>
      <h3>Filters</h3>
      <div>
        <input
          type="text"
          value={eventFilter.location}
          onChange={(e) =>
            setEventFilter({ ...eventFilter, location: e.target.value })
          }
          placeholder="Filter Events by Location"
        />
        <input
          type="date"
          value={eventFilter.date}
          onChange={(e) =>
            setEventFilter({ ...eventFilter, date: e.target.value })
          }
          placeholder="Filter Events by Date"
        />
        <button onClick={handleEventFilter}>Filter Events</button>
      </div>
      <br />
      <div>
        <input
          type="text"
          value={attendeeFilter}
          onChange={(e) => setAttendeeFilter(e.target.value)}
          placeholder="Filter Attendees by Name"
        />
        <button onClick={handleAttendeeFilter}>Filter Attendees</button>
      </div>
    </div>
  );
};

export default Filters;
