import React, { createContext, useReducer } from "react";

export const BookingContext = createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null
};

const reducer = (state, action) => {
  //   console.log(action);
  switch (action.type) {
    case "begin-booking-process":
      return {
        ...state,
        status: "seat-selected",
        selectedSeatId: action.seatNum,
        row: action.seatNum[0],
        seatNum: action.seatNum.slice(2),
        price: action.price
      };
    case "cancel-booking-process":
      return {
        status: "idle",
        error: null,
        selectedSeatId: null,
        price: null
      };
    case "purchase-ticket-request":
      return {
        ...state,
        error: null,
        status: "awaiting-response"
      };

    case "purchase-ticket-failure":
      return {
        ...state,
        status: "error",
        error: action.message
      };

    case "purchase-ticket-success":
      return {
        ...state,
        status: "purchased",
        selectedSeatId: null,
        price: null,
        error: null
      };
    default:
      throw new Error(`Unrecognized action ${action.type}`);
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const beginBookingProcess = data => {
    dispatch({
      type: "begin-booking-process",
      ...data
    });
  };

  const cancelBookingProcess = () => {
    dispatch({ type: "cancel-booking-process" });
  };

  const purchaseTicketRequest = () => {
    dispatch({ type: "purchase-ticket-request" });
  };

  const purchaseTicketSuccess = () => {
    dispatch({ type: "purchase-ticket-success" });
  };

  const purchaseTicketFailure = message => {
    dispatch({ type: "purchase-ticket-failure" }, message);
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketRequest,
          purchaseTicketSuccess,
          purchaseTicketFailure
        }
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
