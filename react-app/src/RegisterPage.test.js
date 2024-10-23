import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import RegisterPage from './pages/Register';
import { MemoryRouter, useNavigate } from 'react-router-dom';

jest.mock('axios');

describe('RegisterPage', () => {
  test('handles registration correctly', async () => {
    const mockResponse = { message: 'Registration successful' };
    axios.post.mockResolvedValueOnce({ data: mockResponse });

    const MockComponent = () => {
      const navigate = useNavigate();
      const handleReg = async (formData) => {
        try {
          const response = await axios.post('http://127.0.0.1:5000/user/register', formData);
          localStorage.setItem('username', formData.username);
          localStorage.setItem('password', formData.password);
          navigate('/');
          console.log(localStorage);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      return <RegisterPage handleReg={handleReg} />;
    };

    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <MockComponent />
      </MemoryRouter>
    );

    const usernameInput = getByLabelText("Ім'я користувача:");
    const nameInput = getByLabelText("Ім'я:");
    const surnameInput = getByLabelText("Прізвище:");
    const emailInput = getByLabelText("Електронна пошта:");
    const passwordInput = getByLabelText("Пароль:");
    const confirmPasswordInput = getByLabelText("Підтвердження пароля:");

    fireEvent.change(usernameInput, { target: { value: 'testuser1' } });
    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.change(surnameInput, { target: { value: 'Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'testpassword' } });

    // Trigger the form submission
    const submitButton = getByText('Створити аккаунт');
    fireEvent.click(submitButton);

    await waitFor(() => {
          
      expect(localStorage.getItem('username')).toBe('testuser1');
      expect(localStorage.getItem('password')).toBe('testpassword');
    });
  });
});
