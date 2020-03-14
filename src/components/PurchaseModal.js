import React, { useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import { BookingContext } from "./BookingContext";

const PurchaseModal = () => {
  const {
    state: { selectedSeatId },
    actions: { cancelBookingProcess }
  } = useContext(BookingContext);
  return (
    <>
      <Dialog open={selectedSeatId !== null} onClose={cancelBookingProcess} />
    </>
  );
};

export default PurchaseModal;
