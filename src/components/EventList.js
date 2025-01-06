// import React from 'react';

// const EventList = ({ events, onDeleteEvent }) => {
//     const deleteEvent = async(id) => {
//         try {
//             await fetch("http://127.0.0.1:8000/api/events/remove/?event_id=" + id, {
//                 method: "DELETE",
//                 headers: { 'Content-Type': 'application/json' },
//             });

//             // Call the passed function to update the events list in the parent component
//             onDeleteEvent(id);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     return (
//         <div>
//             {events.length === 0 ? (
//                 <p>No events found</p>
//             ) : (
//                 <ul>
//                     {events.map((event) => (
//                         <li key={event.id}>
//                             {event.id} - {event.name} - {event.date} - {event.location}
//                             <button onClick={() => deleteEvent(event.id)}>X</button>

//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default EventList;


import React, { useState } from 'react';


const EventList = ({ events, onDeleteEvent }) => {
  const [editingEvent, setEditingEvent] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', date: '', location: '' });
  const deleteEvent = async (id) => {
    try {
      await fetch("http://127.0.0.1:8000/api/events/remove/?event_id=" + id, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
      });
      onDeleteEvent(id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (event) => {
    setEditingEvent(event.id);
    setEditFormData({
      name: event.name,
      date: event.date,
      location: event.location,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://127.0.0.1:8000/api/events/update/?event_id=${editingEvent}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });
      setEditingEvent(null);
      window.location.href = "/"
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              {event.id} - {event.name} - {event.date} - {event.location}
              <button onClick={() => deleteEvent(event.id)}>X</button>
              <button onClick={() => handleEditClick(event)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
      {editingEvent && (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            name="name"
            value={editFormData.name}
            onChange={handleEditChange}
            placeholder="Event Name"
          />
          <input
            type="date"
            name="date"
            value={editFormData.date}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="location"
            value={editFormData.location}
            onChange={handleEditChange}
            placeholder="Location"
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditingEvent(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default EventList;
