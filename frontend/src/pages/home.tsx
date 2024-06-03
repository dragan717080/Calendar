// Getting type for the 'DateTimeFormatOptions'
/// <reference lib="es2020.intl" />

import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { ArrowButton, NewEventModal } from '~/components';
import moment from 'moment';
import CalendarNavigationButtonHandler from '~/utils/CalendarNavigationButtonHandler';
import { IoMdAdd } from 'react-icons/io';
import type { CalendarViewVariant } from '~/interfaces/types';
import type { View as CalendarDefaultViewVariant, DateRange } from 'react-big-calendar';
import type Event from '~/interfaces/Event';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import { useAuthStore } from '~/store/zustandStore';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '~/styles/calendar.css';

const IndexPage: FC = () => {
  const [view, setView] = useState<CalendarViewVariant>('month');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  // If needed import events from 'constants'
  const [events, setEvents] = useState<Event[]>([]);
  const { username } = useAuthStore()

  const calendarRef = useRef(null!);

  const localizer = momentLocalizer(moment);

  /**
   * When new Event is added from other component, show a toast,
   * this function is passed down to 'NewEventModal' component 
   */
  const createNewEventToast = () => {
    toast.success('New Event added!');
  }

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
    <div className='mx-10 2xl:pr-10 py-7 md:py-3 flex-col md:flex-row row-v justify-between'>
      <button 
        onClick={() => setView('agenda')}
        className='bg-gray-100 text-black py-2 px-4 2xl:ml-16 runded-lg duration-300 active:scale-75 text-lg rounded-lg'>
          See All Events
      </button>
      <div className='row gap-3 md:gap-6 my-9 md:my-0'>
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
      <NewEventModal events={events} setEvents={setEvents} createNewEventToast={() => createNewEventToast()} />
    </div>

  const CalendarRenderComponents = ({
    toolbar: CalendarToolbar,
  });

  /**
   * Handles slot click (day in monthly view and time slot (from hour to hour + 1) in day view).
   * If it is day view, enable user to open an Event Modal with those dates preselected.
   * 
   * @param {Date} start Start Date.
   * @param {Date} end End Date
   * 
   * @returns {boolean} Just to comply with expected function signature from 'react-big-calendar'.
   */
  const handleSelectSlot = ({ start, end }: DateRange): boolean => {
    if (view === 'day') {
      openNewEventModal();
    }

    setSelectedDate(start);
    setView('day');

    // Return true is statement to match expected '@types/react-big-calendar' return type
    return true;
  };

  const handleSelectView = (viewName: CalendarDefaultViewVariant): void => {
    // react-big-calendar 'View' type has more views so it is cast into the needed subset
    setView(viewName as CalendarViewVariant);
  }

  const getAllEvents = async () => {
    const response = await fetch(`http://127.0.0.1:8000/events?username=${username}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  };

  const { data, error, isLoading, isError } = useQuery(['data'], getAllEvents);

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const events = data.map(event => ({
        title: event.title,
        description: event.description,
        start: new Date(event.start_time),
        end: new Date(event.end_time),
      }))

      setEvents(events)
    }
  }, [data, isLoading, isError]);

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
