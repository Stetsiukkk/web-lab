import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Homepage from './Homepage.js';



function Menu() {
    return (
        <Fragment>
            <header>
                <h1>Резервування аудиторій</h1>
                <nav>
                    <ul>
                        <li> <Link to="/" > Головна </Link> </li>
                        <li> <Link to="/reserv" > Зарезервувати кімнату </Link></li>
                        <li> <Link to="/login" > Увійти </Link> </li>
                    </ul>
                    <ul className="nickname">
                        <Homepage/>


                    </ul>
                </nav>
            </header>
        </Fragment>
    )
}

export default Menu;