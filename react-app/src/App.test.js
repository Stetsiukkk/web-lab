import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import App from './App';

describe('App Component', () => {
  let container = null;

  beforeEach(() => {
    // Set up a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up on exiting
    unmountComponentAtNode(container);
    container.remove();
  });

  it('renders without crashing', () => {
    act(() => {
      render(<App />, container);
    });
    expect(container.textContent).toBe('Резервування аудиторій  Головна    Зарезервувати кімнату   Увійти  Ви не увійшли.Аудитоторія 1Велика аудиторія на 160 людей. У аудиторії наявний проектор розташований позаду слухачів. Також наявний стіл на сцені.Аудиторія 2Велика аудиторія на 150 людей. У адутиторії розміщена велика дошка та трибуна для виступів. Аудиторія 3Невелика аудиторія на 36 людей. У аудиторії наявні стільчики зі столами, а також стіл, трибуна, дошка та проектор для викладача.Аудиторія 4Дуже велика аудиторія на 500 місць. Наявний мікрофон з колонками для кращого звуку, та велика сцена. Також є місця на балконах на 2 поверсі.Аудиторія 5Середня аудиторія для 60 людей. Наявний прямокутний стіл та відкрита зона у кімнаті. Аудиторія 6 Невелика аудиторія на 40 людей. Наявна дошка, карта світу, проектор.© Усі права захищено 2023 ');
  });
});
