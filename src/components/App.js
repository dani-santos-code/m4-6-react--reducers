import React, { useContext, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";
import { BookingContext } from "./BookingContext";
import TicketWidget from "./TicketWidget";
import PurchaseModal from "./PurchaseModal";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const {
    state: { numOfRows },
    actions: { receiveSeatInfoFromServer }
  } = useContext(SeatContext);

  const {
    state: { status }
  } = useContext(BookingContext);

  const handleClose = () => {
    return;
  };

  useEffect(() => {
    fetch("/api/seat-availability", { method: "GET" })
      .then(res => res.json())
      .then(data => receiveSeatInfoFromServer(data));
  }, []); // eslint-disable-line

  return (
    <>
      <GlobalStyles />
      This venue has {numOfRows} rows!
      <TicketWidget />
      <PurchaseModal />
      {status === "purchased" ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Alert
            style={{ width: "600px" }}
            severity="success"
            onClose={handleClose}
          >
            Successfully Booked
          </Alert>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
