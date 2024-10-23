import React from 'react';
import RegForm from './RegForm';
import { Link, useNavigate } from 'react-router-dom';
import styles from './reg.module.css';

import axios from 'axios';

function ajax(url, method, data, callback, navigate) {
  axios({
    method: method,
    url: url,
    data: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      callback(response.data);
      localStorage.setItem('username', data.username);
      localStorage.setItem('password', data.password);
      navigate('/');
      console.log(localStorage);
    })
    .catch((error) => {
      // Handle error
      console.error(error);
    });
}

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleReg = (formData) => {

        console.log(formData);

        ajax("http://127.0.0.1:5000/user/register", "POST", formData, function (response) {
            console.log(response);
        }, navigate)
    };

    return (
        <div>
            <h1 className={styles.logh1} >Вхід</h1>
            <RegForm handleReg={handleReg} className={styles.logform}>
                <Link to="/Login" className={styles.linkStyle}> Увійти в існуючий аккаунт </Link>
                <Link to="/" className={styles.linkStyle}> Головна </Link>
            </RegForm>
            <footer className={styles.elementStyle}>
                <p>&copy; Усі права захищено 2023 </p>
            </footer>
        </div>
    );
};

export default RegisterPage;
