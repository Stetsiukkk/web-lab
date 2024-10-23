import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './reg.module.css';


const LoginForm = ({ handleLogin, children }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(formData);
  };

  return (
    <form method="#" className={styles.logform} onSubmit={handleSubmit}>
      <label htmlFor="username" className={styles.loglabel}>Ім'я користувача:</label>
      <input
        className={styles.loginput}
        type="text"
        name="username"
        id="username"
        required
        value={formData.username}
        onChange={handleChange}
      /><br /><br />

      <label className={styles.loglabel} htmlFor="password">Пароль:</label>
      <input
        className={styles.loginput}
        type="password"
        name="password"
        id="password"
        required
        value={formData.password}
        onChange={handleChange}
      /><br /><br />

      <input className={styles.loginput} type="submit" value="Увійти" />
      {children}
    </form>

  );
};

export default LoginForm;
