import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TableRowArrival from './TableRowArrival';
import NotFound from '../NotFound';
import * as tableSelectors from '../../table.selectors';

const TableBodyArrival = ({ arrival, searchingValue }) => {
  const currentFlights = arrival.filter(
    flight =>
      flight['airportFromID.city'].toUpperCase().includes(searchingValue.toUpperCase()) ||
      String(flight['carrierID.IATA'] + flight.fltNo)
        .toUpperCase()
        .includes(searchingValue.toUpperCase()),
  );

  if (currentFlights.length === 0) {
    return <NotFound />;
  }

  return (
    <tbody className="table-body">
      {currentFlights.map(flight => (
        <TableRowArrival
          term={flight.term}
          key={flight.ID}
          logo={flight.airline.en.logoSmallName}
          cityfrom={flight['airportFromID.city']}
          num={String(flight['carrierID.IATA'] + flight.fltNo)}
          companyName={flight['carrierID.code']}
          timeFact={flight.timeToStand}
          timeCalc={flight.timeLandCalc}
        />
      ))}
    </tbody>
  );
};

const mapState = state => {
  return {
    arrival: tableSelectors.arrivalSelector(state),
    searcheArrival: tableSelectors.searchArrivalSelector(state),
    searchingValue: state.searching.searchInfo,
  };
};

export default connect(mapState, null)(TableBodyArrival);
