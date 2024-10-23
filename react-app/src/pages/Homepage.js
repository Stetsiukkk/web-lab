import React, { useState } from 'react';

const HomePage = () => {
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    setUsername('');
  };

  return (
    <div>
      {username && (
        <div>
          <p>Вітаю, {username}!</p>
          <a onClick={handleLogout}>Вийти</a>
        </div>
      )}
      {!username && (
        <div>
          <p>Ви не увійшли.</p>
          {/* Додайте тут код для форми входу */}
        </div>
      )}
    </div>
  );
};

export default HomePage;