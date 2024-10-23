import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './reg.module.css';


const RegForm = ({ handleReg, children }) => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        password2:'',
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleReg(formData);
        setFormData({
            username: '',
            name: '',
            surname: '',
            email: '',
            password: '',
            password2: '',
          });
    };

    return (
        <form method="#" data-testid="registration-form" className={styles.logform} onSubmit={handleSubmit}>
            <label htmlFor="username" className={styles.loglabel}>Ім'я користувача:</label>
            <input
                className={styles.loginput}
                type="text"
                id="username"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
            /><br /><br />

            <label className={styles.loglabel} htmlFor="name">Ім'я:</label>
            <input
                className={styles.loginput}
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
            /><br /><br />

            <label className={styles.loglabel} htmlFor="surname">Прізвище:</label>
            <input
                className={styles.loginput}
                type="text"
                id="surname"
                name="surname"
                required
                value={formData.surname}
                onChange={handleChange}
            /><br /><br />

            <label className={styles.loglabel} htmlFor="email">Електронна пошта:</label>
            <input
                className={styles.loginput}
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
            /><br /><br />

            <label className={styles.loglabel} htmlFor="password">Пароль:</label>
            <input
                className={styles.loginput}
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
            /><br /><br />

            <label className={styles.loglabel} htmlFor="password2">Підтвердження пароля:</label>
            <input
                className={styles.loginput}
                data-testid="confirm-password-input"
                type="password"
                id="password2"
                name="password2"
                required
                value={formData.password2}
                onChange={handleChange}
            /><br /><br />

            <input className={styles.loginput} disabled={formData.password!=formData.password2} type="submit" value="Створити аккаунт" />
            {children}
        </form>

    );
};

export default RegForm;
