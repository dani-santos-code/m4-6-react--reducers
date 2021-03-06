import React, { useContext } from "react";
import styled from "styled-components";

import { SeatContext } from "./SeatContext";
import { BookingContext } from "./BookingContext";
import seatImg from "../assets/seat-available.svg";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

const StyledImg = styled.img`
  filter: ${props => (props.isBooked ? "grayscale(100%)" : "grayscale(0%)")};
`;

const TippySpan = styled.span`
  background-color: #3e3b3b;
  color: white;
  width: 100px;
`;

const SeatButton = styled.button`
  margin: 0;
  padding: 0;
  cursor: pointer;
  background-color: #eee;
  border: none;
`;
const Seat = ({ seatId, rowName, seatNum }) => {
  const {
    state: { seats }
  } = useContext(SeatContext);
  const isBooked = seats[seatId].isBooked;

  const {
    actions: { beginBookingProcess }
  } = useContext(BookingContext);

  const handleClick = () => {
    beginBookingProcess({
      seatNum: `${rowName}-${seatNum}`,
      price: seats[seatId].price
    });
  };

  return (
    <Tippy
      delay={0}
      duration={0}
      content={
        <TippySpan>
          Row {rowName}, Seat {seatNum} ${""}
          {seats[seatId].price}
        </TippySpan>
      }
    >
      <SeatButton
        onClick={() => {
          if (!isBooked) {
            handleClick();
          }
        }}
      >
        <StyledImg src={seatImg} alt="" isBooked={isBooked} />
      </SeatButton>
    </Tippy>
  );
};

export default Seat;
