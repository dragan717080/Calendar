import type { CalendarViewVariant } from '~/interfaces/types';
import moment, { type Moment } from 'moment';

abstract class CalendarNavigationButtonHandler {
  static handlePrevButtonClick(
    view: CalendarViewVariant,
    date: Date,
    setDate: (date: Date) => void
  ): void {
    const parsedDate = moment(date);
    setDate(view === 'day' ? this.goToPrevDay(parsedDate) : this.goToPrevMonth(parsedDate))
  }

  static handleNextButtonClick(
    view: CalendarViewVariant,
    date: Date,
    setDate: (date: Date) => void
  ): void {
    const parsedDate = moment(date);
    setDate(['agendar', 'day'].includes(view) ? this.goToNextDay(parsedDate) : this.goToNextMonth(parsedDate))
  }

  static goToPrevDay = (date: Moment): Date =>
    date.add(-1, 'days').toDate();

  static goToPrevMonth = (date: Moment): Date =>
    date.add(-1, 'months').toDate();

  static goToNextDay = (date: Moment): Date =>
    date.add(1, 'days').toDate();

  static goToNextMonth = (date: Moment): Date =>
    date.add(1, 'months').toDate();
}

export default CalendarNavigationButtonHandler;
