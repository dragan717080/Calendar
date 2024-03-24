// Getting type for the 'DateTimeFormatOptions'
/// <reference lib="es2020.intl" />

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { ArrowButton, NewEventModal } from '~/components';
import moment from 'moment';
import CalendarNavigationButtonHandler from '~/utils/CalendarNavigationButtonHandler';
import { IoMdAdd } from 'react-icons/io';
import type { CalendarViewVariant } from '~/interfaces/types';
import type { Event, View as CalendarDefaultViewVariant, DateRange } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '~/styles/calendar.css';

const IndexPage: FC = () => {
  const [view, setView] = useState<CalendarViewVariant>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([
    {
      title: 'Event 1',
      start: new Date(2024, 3, 1),
      end: new Date(2024, 3, 3),
    },
    {
      title: 'Event 2',
      start: new Date(2024, 3, 5),
      end: new Date(2024, 3, 7),
    },
  ]);

  const calendarRef = useRef(null!);

  const localizer = momentLocalizer(moment);

  const openNewEventModal = () => {
    const modalElement: HTMLDialogElement | null = document.getElementById('my_modal_2') as HTMLDialogElement | null;
    modalElement ? modalElement.showModal() : console.error('Create new event element is not visible');
  }

  const toggleView = useCallback(() => {
    const v = view === 'day' ? 'month' : 'day';
    setView(v);
  }, [view]);

  const getSelectedDate = () => { 
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: '2-digit', year: 'numeric' };
    return selectedDate?.toLocaleDateString('en-US', options);
  }

  // Implement if needed, otherwise delete later
  const handleNavigate = () => {

  }

  const CalendarToolbar = () => 
    <div className='mx-10 ml-[45%] 2xl:pr-10 py-3 row-v justify-between'>
      <div className='row gap-6'>
        <ArrowButton 
          onClick={() =>
            CalendarNavigationButtonHandler.handlePrevButtonClick(view, selectedDate, setSelectedDate)
          }
        >
          &#60;
        </ArrowButton>
        <span className='min-w-[14rem] text-center text-xl mt-1.5'>{ getSelectedDate() }</span>
        <ArrowButton 
          onClick={() =>
            CalendarNavigationButtonHandler.handleNextButtonClick(view, selectedDate, setSelectedDate)
          }
        >
          &#62;
        </ArrowButton>
      </div>
      <div className="flex gap-6">
        <button
          className='bg-gray-100 text-black py-2 px-4 runded-lg duration-300 active:scale-75 text-lg rounded-lg'
          onClick={ toggleView }
        >
          { view === 'day' ? 'Month' : 'Day' } View
        </button>
        <button
          className='bg-primary text-white py-2 px-4 runded-lg duration-300 active:scale-75 text-lg row-v gap-2 rounded-lg'
          onClick={ openNewEventModal }
        >
          <span className='text-lg -mt-0.5'>New</span>
          <IoMdAdd size={24} />
        </button>
      </div>
      <NewEventModal />
    </div>

  const CalendarRenderComponents = ({
    toolbar: CalendarToolbar,
  });

  function usePrevious(value: any) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value; //assign the value of ref to the argument
    },[value]); //this code will run when the value of 'value' changes
    return ref.current; //in the end, return the current ref value.
  }
  const prevSelectedDate = usePrevious(selectedDate);

  const handleSelectSlot = ({ start, end }: DateRange): boolean => {
    setSelectedDate(start);
    setView('day');

    // Return true is statement to match expected '@types/react-big-calendar' return type
    return true;
  };

  const handleSelectView = (viewName: CalendarDefaultViewVariant): void => {
    // react-big-calendar 'View' type has more views so it is cast into the needed subset
    setView(viewName as CalendarViewVariant);
  }

  return (
    <div className="flex-1 min-h-screen">
      <Calendar
        ref={calendarRef}
        className="min-h-screen"
        localizer={localizer}
        components={CalendarRenderComponents}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelecting={handleSelectSlot}
        view={view}
        date={selectedDate}
        onView={handleSelectView}
        onNavigate={handleNavigate}
      />
    </div>
  )
}

export default IndexPage;
