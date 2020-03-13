import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import Seat from "./Seat";
import { SeatContext } from "./SeatContext";

const TicketWidget = () => {
  const {
    state: { hasLoaded, numOfRows, seatsPerRow }
  } = useContext(SeatContext);
  return (
    <Wrapper>
      {hasLoaded ? (
        range(numOfRows).map(rowIndex => {
          const rowName = getRowName(rowIndex);
          return (
            <Row key={rowIndex}>
              <RowLabel>Row {rowName}</RowLabel>
              {range(seatsPerRow).map(seatIndex => {
                const seatNum = getSeatNum(seatIndex);
                const seatId = `${rowName}-${seatNum}`;
                return (
                  <SeatWrapper key={seatId}>
                    <Seat seatId={seatId} rowName={rowName} seatNum={seatNum} />
                  </SeatWrapper>
                );
              })}
            </Row>
          );
        })
      ) : (
        <StyledCircularProgress />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 8px;
  color: black;
  margin: 20px auto;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

const StyledCircularProgress = styled(CircularProgress)`
  align-self: center;
`;

const Row = styled.div`
  display: flex;
  position: relative;
  justify-content: center;

  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
  align-self: center;
  margin-right: 20px;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

export default TicketWidget;
