import React, { useContext, useState } from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { BookingContext } from "./BookingContext";

const StyledTableContainer = styled(TableContainer)``;

const PurchaseModal = () => {
  const {
    state: { selectedSeatId, row, price, seatNum },
    actions: { cancelBookingProcess }
  } = useContext(BookingContext);

  const [creditCard, setCreditCard] = useState("");
  const [expiration, setExpiration] = useState("");

  return (
    <>
      <Dialog open={selectedSeatId !== null} onClose={cancelBookingProcess}>
        <DialogContentText style={{ padding: "15px", color: "black" }}>
          You're purchasing <b>1</b> ticket for the price of ${price}
        </DialogContentText>
        <StyledTableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Row </TableCell>
                <TableCell>Seat</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{row}</TableCell>
                <TableCell>{seatNum}</TableCell>
                <TableCell>${price}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </StyledTableContainer>
        <form noValidate autoComplete="off">
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <TextField
              id="credit-card"
              label="Credit Card"
              name="credit-card"
              value={creditCard}
              onChange={e => setCreditCard(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px"
            }}
          >
            <TextField
              id="expiration-date"
              name="expiration-date"
              label="Expiry Date"
              value={expiration}
              onChange={e => setExpiration(e.target.value)}
              required
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px"
            }}
          >
            <Button
              variant="outlined"
              style={{ backgroundColor: "#01019d", color: "white" }}
            >
              Purchase
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default PurchaseModal;
