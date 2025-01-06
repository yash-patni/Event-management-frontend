// import React, { useState, useEffect } from 'react';
// import EventList from './components/EventList';
// import AttendeeList from './components/AttendeeList';
// import EventForm from './components/EventForm';
// import AttendeeForm from './components/AttendeeForm';
// import UpdateEventForm from './components/UpdateEventForm';
// import UpdateAttendeeForm from './components/UpdateAttendeeForm';
// import Filters from './components/Filters';
// import './App.css';  // Import the CSS file for styling

// const App = () => {
//   const [events, setEvents] = useState([]);
//   const [attendees, setAttendees] = useState([]);
//   const [eventToUpdate, setEventToUpdate] = useState(null);
//   const [attendeeToUpdate, setAttendeeToUpdate] = useState(null);

//   // Fetching events and attendees data
//   const fetchData = async () => {
//     try {
//       const eventsResponse = await fetch('http://127.0.0.1:8000/api/events/');
//       const attendeesResponse = await fetch('http://127.0.0.1:8000/api/attendees/');

//       if (!eventsResponse.ok) {
//         throw new Error('Failed to fetch events');
//       }
//       if (!attendeesResponse.ok) {
//         throw new Error('Failed to fetch attendees');
//       }

//       const eventsData = await eventsResponse.json();
//       const attendeesData = await attendeesResponse.json();

//       setEvents(eventsData);
//       setAttendees(attendeesData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Handling filters
//   const handleEventFilter = (filteredEvents) => {
//     setEvents(filteredEvents);
//   };

//   const handleAttendeeFilter = (filteredAttendees) => {
//     setAttendees(filteredAttendees);
//   };

//   const handleDeleteEvent = (id) => {
//     // Update the state to remove the event with the given id
//     setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
// };

// const handleDeleteAttendee = (id) => {
//   // Update the state to remove the event with the given id
//   setAttendees((prevAttendees) => prevAttendees.filter((attendee) => attendee.id !== id));
// };



//   return (
//     <div className="app-container">
//       <div className="left-column">
//         <h1 className="heading">Event Management System</h1>
//         <Filters onEventFilter={handleEventFilter} onAttendeeFilter={handleAttendeeFilter} />
//         <h2>Events</h2>
//         <EventList events={events} onDeleteEvent={handleDeleteEvent} />
//         <div className="form-container">
//           <h2>Add New Event</h2>
//           <EventForm />
//         </div>
//       </div>

//       <div className="right-column">
//         <h2>Attendees</h2>
//         <AttendeeList attendees={attendees} events={events} onDeleteAttendee={handleDeleteAttendee} />
//         <div className="form-container">
//           <h2>Add New Attendee</h2>
//           <AttendeeForm />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import AttendeeList from './components/AttendeeList';
import EventForm from './components/EventForm';
import AttendeeForm from './components/AttendeeForm';
import Filters from './components/Filters';
import './App.css'; // Import the CSS file for styling

const App = () => {
  const [events, setEvents] = useState([]); // Initialize as empty array
  const [attendees, setAttendees] = useState([]); // Initialize as empty array

  // Fetching events and attendees data
  const fetchData = async () => {
    try {
      const eventsResponse = await fetch('http://127.0.0.1:8000/api/events/');
      const attendeesResponse = await fetch('http://127.0.0.1:8000/api/attendees/');

      if (!eventsResponse.ok) {
        throw new Error('Failed to fetch events');
      }
      if (!attendeesResponse.ok) {
        throw new Error('Failed to fetch attendees');
      }

      const eventsData = await eventsResponse.json();
      const attendeesData = await attendeesResponse.json();

      setEvents(eventsData);
      setAttendees(attendeesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('Events:', events);
    console.log('Attendees:', attendees);
  }, [events, attendees]);

  // Handling filters
  const handleEventFilter = (filteredEvents) => {
    setEvents(filteredEvents);
  };

  const handleAttendeeFilter = (filteredAttendees) => {
    setAttendees(filteredAttendees);
  };

  const handleDeleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const handleDeleteAttendee = (id) => {
    setAttendees((prevAttendees) => prevAttendees.filter((attendee) => attendee.id !== id));
  };

  return (
    <div className="app-container">
      <div className="left-column">
        <h1 className="heading">Event Management System</h1>
        <Filters onEventFilter={handleEventFilter} onAttendeeFilter={handleAttendeeFilter} />
        <h2>Events</h2>
        <EventList events={events} onDeleteEvent={handleDeleteEvent} />
        <div className="form-container">
          <h2>Add New Event</h2>
          <EventForm />
        </div>
      </div>

      <div className="right-column">
        <h2>Attendees</h2>
        <AttendeeList
          attendees={attendees}
          events={events}
          onDeleteAttendee={handleDeleteAttendee}
        />
        <div className="form-container">
          <h2>Add New Attendee</h2>
          <AttendeeForm />
        </div>
      </div>
    </div>
  );
};

export default App;
