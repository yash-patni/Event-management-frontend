import React from 'react';

const EventList = ({ events, onDeleteEvent }) => {
    const deleteEvent = async(id) => {
        try {
            await fetch("http://127.0.0.1:8000/api/events/remove/?event_id=" + id, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
            });

            // Call the passed function to update the events list in the parent component
            onDeleteEvent(id);
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
                            
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EventList;
