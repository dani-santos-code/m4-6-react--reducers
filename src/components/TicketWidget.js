import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import seatImg from "../assets/seat-available.svg";

import { SeatContext } from "./SeatContext";

const TicketWidget = () => {
  // TODO: use values from Context
  // const numOfRows = 6;
  // const seatsPerRow = 6;

  const {
    state: { hasLoaded, numOfRows, seatsPerRow, seats }
  } = useContext(SeatContext);

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  return (
    <Wrapper>
      {hasLoaded ? (
        range(numOfRows).map(rowIndex => {
          const rowName = getRowName(rowIndex);
          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map(seatIndex => {
                const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                const isBooked = seats[seatId].isBooked;

                return (
                  <SeatWrapper key={seatId}>
                    {/* TODO: Render the actual <Seat /> */}
                    <StyledImg src={seatImg} alt="" isBooked={isBooked} />
                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })
      ) : (
        <CircularProgress />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #3e3b3b;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
`;

const StyledImg = styled.img`
  filter: ${props => (props.isBooked ? "grayscale(100%)" : "grayscale(0%)")};
`;
const Row = styled.div`
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
