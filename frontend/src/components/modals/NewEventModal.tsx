import { FC, useRef, useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import Label from '../Label';
import DateUtils from '~/utils/DateUtils';
import { toast } from 'react-hot-toast';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { useAuthStore } from '~/store/zustandStore';
import axios, { AxiosError, AxiosResponse } from 'axios';
import NewEventModalProps from '~/interfaces/props/NewEventModalProps';

import 'react-datepicker/dist/react-datepicker.css';

const NewEventModal: FC = ({ eventStartDate, eventEndDate, events, setEvents, createNewEventToast }: NewEventModalProps) => {
  const [startDate, setStartDate] = useState<Date>(eventStartDate ? eventStartDate : new Date());
  const [endDate, setEndDate] = useState<Date>(eventEndDate ? eventEndDate : new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({})

  const closeModalButtonRef = useRef<HTMLButtonElement | null>(null!);

  const { authToken, username } = useAuthStore();

  /**
   * Creates an event.
   * 
   * Event routes are protected by middleware and must pass authToken in headers.
   * Start date must be strictly before the end date.
   * 
   * @param {FieldValues} data - The form values for the event.
   */
  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);
    // Update form fields with event dates
    const formattedStartDate = DateUtils.formatDateToString(startDate);
    const formattedEndDate = DateUtils.formatDateToString(endDate);

    if (formattedStartDate > formattedEndDate) {
      toast.error('Start time must be before end time', { id: 'start-before' });
      return;
    } else if (formattedStartDate === formattedEndDate) {
      toast.error('Dates are the same', { id: 'same-dates' });
      return;
    }

    const eventData = { ...data, username, startTime: formattedStartDate, endTime: formattedEndDate };
    // To do: use react-query optimistic mutate
    axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/events`,
      { ...eventData },
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    )
    .then((response: AxiosResponse) => {
      const { title, description, start, end }: Event = response.data;
      closeModalButtonRef?.current.click();
      createNewEventToast();
      setEvents([...events, { title, description, start, end }])
  })
    .catch((err: AxiosError) => {
      console.error(err);
    })
  }

  return (
    <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box scrollbar-hide">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="bold text-lg gradient-title">New Event</h3>
          <Input 
            id='title'
            label='Title'
            type='text'
            register={register}
            required
            errors={errors}
            disabled={isLoading}
          />
          <div>
            <Label id='description'>Description</Label>
            <textarea className="
              textarea 
              w-full
              ring-1 
              ring-inset 
              ring-gray-300
              focus:ring-2 
              focus:ring-inset 
              focus:ring-sky-600"
              {...register('description', { required: false })}
            />
          </div>
          <div className='flex justify-between datepicker-input-wrapper'>
            <span className=''>Start date</span>
            <DatePicker
              className='ml-auto'
              selected={startDate}
              showTimeSelect
              timeIntervals={15}
              onChange={(date: Date) => setStartDate(date)}
              dateFormat="Pp"
            />
          </div>
          <div className='flex justify-between datepicker-input-wrapper'>
            <span className=''>End date</span>
            <DatePicker
              className='ml-auto'
              selected={endDate}
              showTimeSelect
              onChange={(date: Date) => setEndDate(date)}
              dateFormat="Pp"
            />
          </div>
          <Button disabled={false} isFullWidth type="submit">
            Create Event
          </Button>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        {/* Entire screen is backdrop and when it is clicked it shall close the modal */}
        <button ref={closeModalButtonRef}>Close</button>
      </form>
    </dialog>
  )
}

export default NewEventModal;
