import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction" 
const Calender = () => {
  const  initialtSate = 
         [
   
          {
            title: "Rejected",
            start: "2024-01-14",
            end: "2024-01-14",
            allDay: true, HostName: "William2",
            color:'red'
          },
          {
            title: "Pending",
            start: "2024-01-24",
            end: "2024-01-26",
            allDay: true, HostName: "William2",
            color:'orange'
          },
          {
            title: "Approved",
            start: "2024-01-01",
            end: "2024-01-03",
            allDay: true, HostName: "William2",
            color:'green'
          }
        ];
        const [events,setEvents] = useState(initialtSate);
      
    // const handleDateClick =(arg) =>{
    //     alert(arg.dateStr);
    //     // console.log(arg.dateStr);
    // }
     const handleSelectDates = (info) => {
// console.log(info.endStr);
const title = prompt('Enter type of leave');
if(title!== null){
    const newEvent = {
        title,
        start:info.startStr,
        end: info.endStr,
        color
    }
  setEvents(prevEvents => [...prevEvents,newEvent])


}
else{
    console.log("nothing");
}
     }

    return (
     
            <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView='dayGridMonth'
        
            // weekends={false}
            // events={[
            //     {title:'event 14', date:'2024-01-01'}
            // ]}
            // dateClick = {handleDateClick}
            selectable={true}
            // select={handleSelectDates}
            editable={true}
            events={events}
            />
          
     
    );
};

export default Calender;