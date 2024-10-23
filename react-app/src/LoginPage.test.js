import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import LoginPage from './pages/Login.js';

describe('LoginPage', () => {
  test('renders login page correctly', () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    // Check if the login page title is rendered
    const pageTitle = screen.getByText('Вхід');
    expect(pageTitle).toBeInTheDocument();

    // Check if the "Створити аккаунт" link is rendered
    const createAccountLink = screen.getByText('Створити аккаунт');
    expect(createAccountLink).toBeInTheDocument();

    // Check if the "Головна" link is rendered
    const homeLink = screen.getByText('Головна');
    expect(homeLink).toBeInTheDocument();
  });

  test('handles login correctly', async () => {
    // Mock the fetch request
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
      })
    );

    // Mock the localStorage.setItem function
    Storage.prototype.setItem = jest.fn();

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    // Enter username and password
    const usernameInput = screen.getByLabelText("Ім'я користувача:");
    const passwordInput = screen.getByLabelText('Пароль:');
    const loginButton = screen.getByRole('button', { name: 'Увійти' });

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    await act(async () => { // Wrap the code inside act()
        fireEvent.click(loginButton);
      });

    // Check if the fetch request was called with the correct URL and headers
    expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:5000/user/login', {
      method: 'POST',
      headers: {
        Authorization: 'Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk',
      },
    });

    // Check if localStorage.setItem was called with the correct values
    expect(localStorage.setItem).toHaveBeenCalledWith('username', 'testuser');
    expect(localStorage.setItem).toHaveBeenCalledWith('password', 'testpassword');
    
    // Mock the alert function
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Mock a 401 response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 401,
      })
    );

    // Perform login again
    await act(async () => {
      fireEvent.click(loginButton);
    });

    // Assert that the alert was called with the correct message
    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith('Wrong credentials!');

    // Restore the original alert function
    mockAlert.mockRestore();
  });
});