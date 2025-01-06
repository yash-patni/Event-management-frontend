// api.js

// Fetch all events
export const fetchEvents = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/events');
      return await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };
  
  // Fetch all attendees
  export const fetchAttendees = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/attendees/');
      return await response.json();
    } catch (error) {
      console.error('Error fetching attendees:', error);
    }
  };
  
  // Add a new event
  export const addEvent = async (eventData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/events/add/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };
  
  // Add a new attendee
  export const addAttendee = async (attendeeData) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/attendees/add/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attendeeData),
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding attendee:', error);
    }
  };
  
  // Filter events
  export const filterEvents = async (filterData) => {
    let filterStr = "?"
    if(filterData.location !== "" && filterData.date === ""){
        filterStr += "location="+filterData.location
    }
    else if(!filterData.location === "" && filterData.date !== ""){
        filterStr += "date="+filterData.date
    }
    else{
        filterStr += "location="+filterData.location +'&'+ "date=" + filterData.date
    }
    const response = await fetch('http://127.0.0.1:8000/api/events/filter/' + filterStr, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  };
  
  export const filterAttendees = async (filterData) => {
    
    let filterAtt = "?name="+filterData.name
    const response = await fetch('http://127.0.0.1:8000/api/attendees/filter/' + filterAtt, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  };
  