import type { Dispatch, SetStateAction } from "react";
import type Event from "../Event";

export default interface NewEventModalProps {
  eventStartDate?: Date;
  eventEndDate?: Date;
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  createNewEventToast: () => void;
}
