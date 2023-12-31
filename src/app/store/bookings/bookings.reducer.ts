import { createReducer, on } from '@ngrx/store';
import { IBooking, IBookingResponse } from 'src/app/models/IBooking';
import { BookingsActions } from './bookings.actions';
import { Status } from 'src/app/models/Status';
import { formatDate } from 'src/app/utilities/formatDate';

export interface IBookingsState {
  bookings: IBookingResponse[];
  currentBooking: IBookingResponse | null;
  userBookings: IBookingResponse[];
  error: string | null;
  getBookingsStatus: Status;
  makeBookingStatus: Status;
  selectedTime: string;
  latestBooking: IBooking | undefined;
}

// const dummyLatestBooking: IBooking = {
//   email: 'fdsafdsa',
//   firstName: 'fdsafda',
//   lastName: 'ghghgf',
//   persons: 4,
//   tableNumber: 4,
//   time: formatDate(18),
// };

export const initialState: IBookingsState = {
  bookings: [],
  currentBooking: null,
  userBookings: [],
  error: null,
  getBookingsStatus: Status.Idle,
  makeBookingStatus: Status.Idle,
  selectedTime: formatDate(18),
  latestBooking: undefined,
};

export const BookingsReducer = createReducer(
  initialState,
  // All
  on(BookingsActions.getBookings, (state) => ({
    ...state,
    getBookingsStatus: Status.Pending,
  })),
  on(BookingsActions.getBookingsFailure, (state, action) => ({
    ...state,
    error: action.err,
    getBookingsStatus: Status.Error,
  })),
  on(BookingsActions.getBookingsSuccess, (state, action) => ({
    ...state,
    bookings: action.bookings,
    error: null,
    getBookingsStatus: Status.Success,
  })),

  // By user id
  on(BookingsActions.getBookingsByUserId, (state) => ({
    ...state,
    getBookingsStatus: Status.Pending,
  })),
  on(BookingsActions.getBookingsByUserIdFailure, (state, { error }) => ({
    ...state,
    error: error,
    getBookingsStatus: Status.Error,
  })),
  on(BookingsActions.getBookingsByUserIdSuccess, (state, { userBookings }) => ({
    ...state,
    error: null,
    userBookings: userBookings,
    getBookingsStatus: Status.Success,
  })),

  // By date
  on(BookingsActions.getBookingsByDate, (state) => ({
    ...state,
    getBookingsStatus: Status.Pending,
  })),
  on(BookingsActions.getBookingsByDateFailure, (state, { error }) => ({
    ...state,
    error: error,
    getBookingsStatus: Status.Error,
  })),
  on(BookingsActions.getBookingsByDateSuccess, (state, { bookings }) => ({
    ...state,
    error: null,
    bookings: bookings,
    getBookingsStatus: Status.Success,
  })),

  // By month
  on(BookingsActions.getBookingsByMonth, (state) => ({
    ...state,
    getBookingsStatus: Status.Pending,
  })),
  on(BookingsActions.getBookingsByMonthFailure, (state, { error }) => ({
    ...state,
    error: error,
    getBookingsStatus: Status.Error,
  })),
  on(BookingsActions.getBookingsByMonthSuccess, (state, { bookings }) => ({
    ...state,
    error: null,
    bookings: bookings,
    getBookingsStatus: Status.Success,
  })),

  // Set/Reset current booking
  on(BookingsActions.setCurrentBooking, (state, { bookingId }) => {
    const currentBooking = state.bookings.find(
      (booking) => booking._id === bookingId
    );
    return {
      ...state,
      currentBooking: currentBooking || null,
    };
  }),
  on(BookingsActions.setCurrentBookingWithDetails, (state, action) => {
    return { ...state, currentBooking: action.bookingDetails };
  }),
  on(BookingsActions.resetCurrentBooking, (state) => ({
    ...state,
    currentBooking: null,
  })),

  // Make bookings
  on(BookingsActions.makeBooking, (state) => ({
    ...state,
    makeBookingStatus: Status.Pending,
  })),
  on(BookingsActions.makeBookingFailure, (state, { error }) => ({
    ...state,
    error: error,
    makeBookingStatus: Status.Error,
  })),
  on(BookingsActions.makeBookingSuccess, (state, { booking }) => ({
    ...state,
    error: null,
    latestBooking: booking,
    makeBookingStatus: Status.Success,
  })),

  // Delete booking
  on(BookingsActions.deleteBooking, (state) => ({
    ...state,
    status: Status.Pending,
  })),
  on(BookingsActions.deleteBookingFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: Status.Error,
  })),
  on(BookingsActions.deleteBookingSuccess, (state, { deletedId }) => {
    console.log(deletedId);
    return {
      ...state,
      error: null,
      currentBooking: null,
      bookings: state.bookings.filter(
        (booking: IBookingResponse) => booking._id !== deletedId
      ),
      status: Status.Success,
    };
  }),

  // Update booking
  on(BookingsActions.updateBooking, (state) => ({
    ...state,
    makeBookingStatus: Status.Pending,
  })),

  on(BookingsActions.updateBookingFailure, (state, { error }) => ({
    ...state,
    error,
    makeBookingStatus: Status.Error,
  })),

  on(BookingsActions.updateBookingSuccess, (state) => ({
    ...state,
    error: null,
    makeBookingStatus: Status.Success,
  })),

  // Reset status
  on(BookingsActions.resetMakeBookingStatus, (state) => ({
    ...state,
    makeBookingStatus: Status.Idle,
  })),
  on(BookingsActions.setTime, (state, { time, newDate }) => {
    if (newDate) return { ...state, selectedTime: formatDate(time, newDate) };
    else {
      return {
        ...state,
        selectedTime: formatDate(time),
      };
    }
  }),
  on(BookingsActions.setLatestBooking, (state, { bookingDetails }) => {
    return {
      ...state,
      latestBooking: bookingDetails,
    };
  })
);
