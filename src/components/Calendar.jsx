import React, { useEffect, useState ,useRef} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction" 
import employee from '../services/employee';
import '../assets/styles/Dashboard.css';
const Calendar = () => {

  const [currentMonthNumber, setcurrentMonthNumber] = useState(null);

  const [events,setEvents]= useState([])
  const calendarRef = useRef(null);
  const userInfoData = JSON.parse(localStorage.getItem('userInfo'));
  const userId = userInfoData?.emp_id;


  const getMonthNumber = () =>{
    const calendarApi = calendarRef.current.getApi();
    const currentDate = calendarApi.getDate();
    const monthNumber = currentDate.getMonth()+1;
    setcurrentMonthNumber(monthNumber);
    return monthNumber;
  }

  useEffect(()=>{
   
     const fetchData = async()=>
     {
try {
  const monthNumber = getMonthNumber();
  const holidays = await employee.calenderHoilday();

  const leaveDates = await employee.leaveDates(userId);
  console.log(leaveDates);
  const  leaveDatesByMonth =  await employee.leaveDatesByMonth(userId,monthNumber);
  
  // console.log(leaveDatesByMonth);
  const holidayEvents = holidays?.map((date)=> createEventObject('Holiday',date,'red'));
  const leaveEvents = leaveDates?.map(({leave_type,leave_date,color})=>createEventObject(leave_type,leave_date,color));
  const  leaveDatesByMonthEvents = leaveDatesByMonth.map(({leave_type,leave_date,color})=>createEventObject(leave_type,leave_date,color));

  setEvents([...holidayEvents,...leaveEvents,...leaveDatesByMonthEvents])
} catch (error) {
  console.log(error);
}
 }
 fetchData();
  },[currentMonthNumber]);


 
 

  useEffect(()=>{
    if (calendarRef.current) {
        
      const prevButton = document.querySelector('.fc-prev-button');
      const nextButton = document.querySelector('.fc-next-button');
    

      prevButton.addEventListener('click', handleButtonClick);
      nextButton.addEventListener('click', handleButtonClick);
      
    }
    
  },[calendarRef.current])

  const handleButtonClick = () => {
   getMonthNumber();
  };

  const createEventObject = (title,start,backgroundColor) =>({

    title:title,
    start:start,
    allDay:true,
     display: 'background',
     backgroundColor:backgroundColor

  })


    return (
<div className='shadow-lg'>

            <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView='dayGridMonth'
            selectable={true}
            editable={true}
            events={events}
  
            height={500}
            headerToolbar={
              {
                start:'prev',
                center:'title',
                end:'next'
 }
            }
            />
</div>
          
     
    );
};

export default Calendar;