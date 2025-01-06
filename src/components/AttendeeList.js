// import React, { useEffect, useState } from 'react';

// const AttendeeList = ({ attendees, events, onDeleteAttendee }) => {
//   const [attendeesData, setAttendeesData] = useState(attendees);

//   // Function to update attendees with their corresponding events
//   const updateAttendeesWithEvents = () => {
//     const updatedAttendees = attendees.map((attendee) => {
//       const event = events.find((evnt) => evnt.id === attendee.event);
//       return {
//         ...attendee,
//         event: event || null, // Add event details or null if no event found
//       };
//     });
//     setAttendeesData(updatedAttendees);
//   };

//   useEffect(() => {
//     updateAttendeesWithEvents();
//   }, [attendees, events]);

//   const deleteAttendee = async(id) => {
//     try {
//         await fetch("http://127.0.0.1:8000/api/attendees/remove/?attendee_id=" + id, {
//             method: "DELETE",
//             headers: { 'Content-Type': 'application/json' },
//         });

//         // Call the passed function to update the events list in the parent component
//         onDeleteAttendee(id);
//     } catch (err) {
//         console.error(err);
//     }
// }

//   return (
//     <div>
//       {attendeesData.length === 0 ? (
//         <p>No attendees found</p>
//       ) : (
//         <ul>
//           {attendeesData.map((attendee) => (
//             <li key={attendee.id}>
//               {attendee.name} - {attendee.email} - {attendee.event ? attendee.event.name : 'No event'}
//               <button onClick={() => deleteAttendee(attendee.id)}>X</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AttendeeList;


import React, { useEffect, useState } from 'react';

const AttendeeList = ({ attendees = [], events = [], onDeleteAttendee }) => {
  const [attendeesData, setAttendeesData] = useState(attendees);

  // Function to update attendees with their corresponding events
  const updateAttendeesWithEvents = () => {
    const updatedAttendees = attendees.map((attendee) => {
      const event = events.find((evnt) => evnt.id === attendee.event);
      return {
        ...attendee,
        event: event || null, // Add event details or null if no event found
      };
    });
    setAttendeesData(updatedAttendees);
  };

  useEffect(() => {
    console.log('Attendees:', attendees);
    console.log('Events:', events);
    if (attendees && events) {
      updateAttendeesWithEvents();
    }
  }, [attendees, events]);
  

  const deleteAttendee = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/attendees/remove/?attendee_id=${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      // Call the passed function to update the attendees list in the parent component
      onDeleteAttendee(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {attendeesData.length === 0 ? (
        <p>No attendees found</p>
      ) : (
        <ul>
          {attendeesData.map((attendee) => (
            <li key={attendee.id}>
              {attendee.name} - {attendee.email} - {attendee.event ? attendee.event.name : 'No event'}
              <button onClick={() => deleteAttendee(attendee.id)}>X</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendeeList;
