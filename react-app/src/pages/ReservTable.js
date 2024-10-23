import React, { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './reg.module.css';
import styles1 from './reserv.module.css';

function ReservTable() {
    const [data, setData] = useState([]);
    const [editReservationId, setEditReservationId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/reservation/rooms', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + btoa(localStorage.username + ':' + localStorage.password)
                }
            });
            const jsonData = await response.json();
            setData(jsonData);
            console.log(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (reservationId) => {
        try {
            await fetch(`http://127.0.0.1:5000/reservation/rooms/${reservationId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Basic ' + btoa(localStorage.username + ':' + localStorage.password)
                }
            });
            console.log('Reservation deleted successfully');
            // Оновити дані після видалення
            fetchData();
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
    };

    const handleEdit = async (item) => {
        try {
            const roomId = document.getElementById('edit_room').value;
            const startTime = document.getElementById('edit_start_time').value;
            const endTime = document.getElementById('edit_end_time').value;
            const formattedStartTime = startTime.replace('T', ' ');
            const formattedEndTime = endTime.replace('T', ' ');

            const formData = {
                roomId: roomId,
                beginTime: formattedStartTime,
                endTime: formattedEndTime,
            };

            const response = await fetch(`http://127.0.0.1:5000/reservation/rooms/${item.ReservationId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(localStorage.username + ':' + localStorage.password)
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Reservation updated successfully');
                console.log(formData);
                // Оновити дані після оновлення резервації
                fetchData();
                setEditReservationId(null); // Скинути ID редагованої резервації
            } else {
                console.error('Error updating reservation:', response.status);
            }
        } catch (error) {
            console.error('Error updating reservation:', error);
        }
    };

    const handleReservation = async () => {
        try {
            const room = document.getElementById('room').value;
            const startTime = document.getElementById('start_time').value;
            const endTime = document.getElementById('end_time').value;
            

            const formattedStartTime = startTime.replace('T', ' ');
            const formattedEndTime = endTime.replace('T', ' ');

            const formData = {
                roomId: room,
                beginTime: formattedStartTime,
                endTime: formattedEndTime,
            };

            const response = await fetch('http://127.0.0.1:5000/reservation/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa(localStorage.username + ':' + localStorage.password)
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Reservation created successfully');
                console.log(formData);
                // Оновити дані після створення резервації
                fetchData();
            } else {
                console.error('Error creating reservation:', response.status);
            }
        } catch (error) {
            console.error('Error creating reservation:', error);
        }
    };

    return (
        <Fragment>
            <main>
                <table id="table" className={styles1.table}>
                    <thead>
                        <tr>
                            <th>Номер аудиторії</th>
                            <th>Час початку</th>
                            <th>Час закінчення</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr key={index}>
                                <td>{item.RoomId}</td>
                                <td>{item.BeginTime.replace('T', ' ')}</td>
                                <td>{item.EndTime.replace('T', ' ')}</td>
                                <td>
                                    {editReservationId === item.ReservationId ? (
                                        <Fragment>
                                            <select id="edit_room" name="edit_room" defaultValue={item.RoomId}>
                                                <option value="1">Аудиторія 1</option>
                                                <option value="2">Аудиторія 2</option>
                                                <option value="3">Аудиторія 3</option>
                                                <option value="4">Аудиторія 4</option>
                                                <option value="5">Аудиторія 5</option>
                                                <option value="6">Аудиторія 6</option>
                                            </select>
                                            <input
                                                type="datetime-local"
                                                id="edit_start_time"
                                                name="edit_start_time"
                                                defaultValue={item.BeginTime.replace(' ', 'T')}
                                            />
                                            <input
                                                type="datetime-local"
                                                id="edit_end_time"
                                                name="edit_end_time"
                                                defaultValue={item.EndTime.replace(' ', 'T')}
                                            />
                                            <button className="btnReserv" onClick={() => handleEdit(item)}>
                                                Зберегти
                                            </button>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            <button className="btnReserv" onClick={() => setEditReservationId(item.ReservationId)}>
                                                Редагувати
                                            </button>
                                            <button className="btnReserv" onClick={() => handleDelete(item.ReservationId)}>
                                                Видалити
                                            </button>
                                        </Fragment>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
            <section>
                <h2>Резервування аудиторій</h2>
                <label htmlFor="room">Аудиторія:</label>
                <select id="room" name="room" required>
                    <option value="">Оберіть аудиторію</option>
                    <option value="1">Аудиторія 1</option>
                    <option value="2">Аудиторія 2</option>
                    <option value="3">Аудиторія 3</option>
                    <option value="4">Аудиторія 4</option>
                    <option value="5">Аудиторія 5</option>
                    <option value="6">Аудиторія 6</option>
                </select>
                <label htmlFor="start_time">Час початку:</label>
                <input type="datetime-local" id="start_time" name="start_time" required />
                <label htmlFor="end_time">Час закінчення:</label>
                <input type="datetime-local" id="end_time" name="end_time" required />
                <button id="resis" onClick={handleReservation}>Забронювати</button>
            </section>
            <footer className={styles.elementStyle}>
                <p>&copy; Усі права захищено 2023 </p>
            </footer>
        </Fragment>
    );
}

export default ReservTable;
