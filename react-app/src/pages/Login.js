import React from 'react';
import LoginForm from './LoginForm';
import { Link, useNavigate } from 'react-router-dom';
import styles from './reg.module.css';





const LoginPage = () => {
    const navigate = useNavigate();

  const handleLogin = (formData) => {
    fetch('http://127.0.0.1:5000/user/login', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(formData.username + ':' + formData.password)
        }
      }).then(response => {
        if (response.ok) {
          localStorage.setItem('username', formData.username)
          localStorage.setItem('password', formData.password)
          navigate("/");
          console.log(localStorage);
        }
        else if (response.status === 401) {
            alert("Wrong credentials!");
            return;
        }
    }).catch(error => console.error(error));

  };

  return (
    <div>
      <h1 className={styles.logh1} >Вхід</h1>
      <LoginForm handleLogin={handleLogin} className={styles.logform}>
      <Link to="/Register" className={styles.linkStyle}> Створити аккаунт </Link>
      <Link to="/" className={styles.linkStyle}> Головна </Link>
      </LoginForm>
      <footer className={styles.elementStyle}>
        <p>&copy; Усі права захищено 2023 </p>
      </footer>
    </div>
  );
};

export default LoginPage;
