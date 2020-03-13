import React, { useContext } from "react";
import styled from "styled-components";

import { SeatContext } from "./SeatContext";
import seatImg from "../assets/seat-available.svg";
import Tippy from "@tippy.js/react";

const StyledImg = styled.img`
  filter: ${props => (props.isBooked ? "grayscale(100%)" : "grayscale(0%)")};
`;

const TippySpan = styled.span`
  background-color: #3e3b3b;
  color: white;
  width: 100px;
`;

const Seat = ({ seatId, rowName, seatNum }) => {
  const {
    state: { seats }
  } = useContext(SeatContext);
  const isBooked = seats[seatId].isBooked;

  return (
    <>
      <Tippy
        content={
          <TippySpan>
            Row {rowName}, Seat {seatNum} ${""}
            {seats[seatId].price}
          </TippySpan>
        }
      >
        <StyledImg src={seatImg} alt="" isBooked={isBooked} />
      </Tippy>
    </>
  );
};

export default Seat;
