import React, { useState, useEffect, useContext, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Typography } from '@material-ui/core';
import { AppContext } from '../../context/AppContext';
import moment from 'moment';
import axios from 'axios';
import swal from 'sweetalert';

const Calendar = ({ id, ownerID }) => {
  const { currentUser } = useContext(AppContext);
  const [onloadEvents, setOnloadEvents] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const isOwnedPet = useRef(false);

  useEffect(() => {
    if (ownerID) {
      axios
        .get(`/pets/${id}/events`)
        .then(({ data }) => {
          setOnloadEvents(data.events);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`/users/${id}/events`)
        .then(({ data }) => {
          setOnloadEvents(data.events);
        })
        .catch((err) => console.log(err));
    }

    if (ownerID === currentUser?._id) {
      isOwnedPet.current = true;
    }
    // eslint-disable-next-line
  }, [id, ownerID, refetch]);

  // from fullcalendar libary to handle calendar events
  const handleDateSelect = (selectInfo) => {
    if (ownerID === currentUser?._id || currentUser?._id === id) {
      let title = prompt('Please enter a new title for your event');
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      if (title) {
        let newEvent = {
          title,
          start: selectInfo.start,
          startStr: selectInfo.startStr,
          end: selectInfo.end,
          endStr: selectInfo.endStr,
          allDay: selectInfo.allDay
        };
        addEvent(newEvent);
      }
    }
  };

  const addEvent = (eventObj) => {
    setRefetch(true);
    if (ownerID) {
      axios
        .post(`/pets/${id}/events`, {
          events: {
            title: eventObj.title,
            start: eventObj.start,
            end: eventObj.end,
            allDay: eventObj.allDay
          }
        })
        .then(({ data }) => {
          setRefetch(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post('/user/me/events', {
          events: {
            title: eventObj.title,
            start: eventObj.start,
            end: eventObj.end,
            allDay: eventObj.allDay
          }
        })
        .then(({ data }) => {
          setRefetch(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deleteEvent = (eventID) => {
    if (!ownerID) {
      axios
        .delete(`/user/me/events/${eventID}`)
        .catch((error) => console.log(error));
    } else {
      axios
        .delete(`/pets/${id}/events/${eventID}`)
        .catch((error) => console.log(error));
    }
  };

  const handleEventClick = (clickInfo) => {
    const clickedEventID = clickInfo.event._def.extendedProps._id;
    const start = moment(clickInfo.event.start).format(
      'ddd, MMMM Do YYYY, h:mm a'
    );
    const end = moment(clickInfo.event.end).format('ddd, MMMM Do YYYY, h:mm a');
    if (ownerID === currentUser?._id || currentUser?._id === id) {
      swal({
        title: `Event: ${clickInfo.event.title}`,
        text: `From: ${start}\nTo: ${end}`,
        buttons: true,
        dangerMode: true
      }).then((willDelete) => {
        if (willDelete) {
          deleteEvent(clickedEventID);
          clickInfo.event.remove();
          swal('Your event has been deleted!', {
            icon: 'success'
          });
        }
      });
    } else {
      swal({
        title: `Event: ${clickInfo.event.title}`,
        text: `From: ${start}\nTo: ${end}`
      });
    }
  };

  return (
    <Typography component="div" id="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView="dayGridMonth"
        events={onloadEvents}
        selectable={!currentUser ? false : true}
        select={handleDateSelect}
        eventClick={handleEventClick}
      />
    </Typography>
  );
};

export default Calendar;
