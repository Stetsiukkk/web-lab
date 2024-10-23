import React, { Fragment } from 'react';
import Menu from './Menu';
import './style.css';


function Index() {
    return (
        <Fragment>
            <Menu />
            <main>
                <div className="container">
                    <ul className="list">
                        <li>
                            <img src="/assets/images/image1.jpg" width="300" height="200" />
                            <div className="caption">
                                <h3>Аудитоторія 1</h3>
                                <p>Велика аудиторія на 160 людей. У аудиторії наявний проектор розташований позаду слухачів. Також наявний стіл на сцені.</p>
                            </div>
                        </li>
                        <li>
                            <img src="/assets/images/image2.jpg" width="300" height="200" />
                            <div className="caption">
                                <h3>Аудиторія 2</h3>
                                <p>Велика аудиторія на 150 людей. У адутиторії розміщена велика дошка та трибуна для виступів. </p>
                            </div>
                        </li>
                        <li>
                            <img src="/assets/images/image3.jpg" width="300" height="200" />
                            <div className="caption">
                                <h3>Аудиторія 3</h3>
                                <p>Невелика аудиторія на 36 людей. У аудиторії наявні стільчики зі столами, а також стіл, трибуна, дошка та проектор для викладача.</p>
                            </div>
                        </li>
                        <li>
                            <img src="/assets/images/image4.jpg" width="300" height="200" />
                            <div className="caption">
                                <h3>Аудиторія 4</h3>
                                <p>Дуже велика аудиторія на 500 місць. Наявний мікрофон з колонками для кращого звуку, та велика сцена. Також є місця на балконах на 2 поверсі.</p>
                            </div>
                        </li>
                        <li>
                            <img src="/assets/images/image5.jpg" width="300" height="200" />
                            <div className="caption">
                                <h3>Аудиторія 5</h3>
                                <p>Середня аудиторія для 60 людей. Наявний прямокутний стіл та відкрита зона у кімнаті. </p>
                            </div>
                        </li>
                        <li>
                            <img src="/assets/images/image6.jpg" width="300" height="200" />
                            <div className="caption">
                                <h3>Аудиторія 6 </h3>
                                <p>Невелика аудиторія на 40 людей. Наявна дошка, карта світу, проектор.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </main>
            <footer>
                <p>© Усі права захищено 2023 </p>
            </footer>

        </Fragment>
    )
}

export default Index;
