import React, { Fragment, useEffect, useState } from 'react';
import Menu from './Menu';
import ReservTable from './ReservTable';

function Reserv() {


    return (
        <Fragment>
            <Menu />
            <ReservTable></ReservTable>
        </Fragment>
    );
}

export default Reserv;
