import { FC, useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import Label from '../Label';
import DateUtils from '~/utils/DateUtils';
import { toast } from 'react-hot-toast';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const NewEventModal: FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({})

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);
    // Update form fields with event dates
    const eventData = { ...data, startDate, endDate };
    const formattedStartDate = DateUtils.formatDateToString(startDate);
    const formattedEndDate = DateUtils.formatDateToString(endDate);

    if (formattedStartDate > formattedEndDate) {
      toast.error('Start time must be before end time', { id: 'start-before' });
    } else if (formattedStartDate === formattedEndDate) {
      toast.error('Dates are the same', { id: 'same-dates' });
    }
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
        <button>Close</button>
      </form>
    </dialog>
  )
}

export default NewEventModal;
