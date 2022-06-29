import React from 'react';
import { Spinner as SpinnerComponent } from 'react-bootstrap';

const Spinner = () => {
   return (
      <span className="d-inline-block">
         <SpinnerComponent className="center" animation="border" size="sm"/>
      </span>
   );
}

export default Spinner;
