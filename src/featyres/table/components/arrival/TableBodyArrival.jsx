import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TableRow from '../TableRow';
import * as flightsActions from '../../table.actions.js';
import * as selectors from '../../table.selectors';

const TableBodyArrival = ({ getFlights, arrival }) => {
  useEffect(() => {
    getFlights();
  }, []);
  const currentFlights = arrival.splice(0, 23);

  return (
    <tbody className="table-body">
      {currentFlights.map(flight => (
        <TableRow
          term={flight.term}
          key={flight.ID}
          logo={flight.logo}
          cityTo={flight['airportToID.city']}
          num={String(flight['carrierID.IATA'] + flight.fltNo)}
          companyName={flight['carrierID.code']}
          timeFact={flight.timeToStand}
          timeCalc={flight.timeLandCalc}
        />
      ))}
    </tbody>
  );
};

const mapDispatch = {
  getFlights: flightsActions.fetchStartFlights,
};

const mapState = state => {
  return {
    arrival: selectors.arivalSelector(state),
  };
};

export default connect(mapState, mapDispatch)(TableBodyArrival);