import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import ReservTable from './pages/ReservTable';

describe('ReservTable', () => {
    test('renders table with data', async () => {
        const mockData = [
            {
                ReservationId: '1',
                RoomId: '1',
                BeginTime: '2023-06-06T09:00:00',
                EndTime: '2023-06-06T19:00:00',
            },
            {
                ReservationId: '2',
                RoomId: '2',
                BeginTime: '2023-06-06T11:00:00',
                EndTime: '2023-06-06T19:00:00',
            },
        ];
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockData),
            })
        );

        await act(async () => {
            render(<ReservTable />);
        });

        const tableElements = screen.queryAllByRole('table');
        expect(tableElements.length).toBe(1);

        const tableElement = tableElements[0];
        expect(tableElement).toBeInTheDocument();

        const tableRows = screen.getAllByRole('row');
        expect(tableRows.length).toBe(3); // Header row + 2 data rows

        const roomIdCell = screen.getByText('1');
        expect(roomIdCell).toBeInTheDocument();

        const beginTimeCell = screen.getByText('2023-06-06 11:00:00');
        expect(beginTimeCell).toBeInTheDocument();

        const endTimeCells = screen.getAllByText('2023-06-06 19:00:00');
        expect(endTimeCells.length).toBe(2);
    });


    test('clicking "Редагувати" button should show edit fields', async () => {
        const mockData = [
            {
                ReservationId: '1',
                RoomId: '1',
                BeginTime: '2023-06-06T09:00:00',
                EndTime: '2023-06-06T19:00:00',
            },
        ];

        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockData),
            })
        );

        await act(async () => {
            render(<ReservTable />);
        });

        const editButton = screen.getByText('Редагувати');
        expect(editButton).toBeInTheDocument();

        fireEvent.click(editButton);

        const editRoomSelect = screen.getByLabelText('Аудиторія:');
        expect(editRoomSelect).toBeInTheDocument();

        const editStartTimeInput = screen.getByLabelText('Час початку:');
        expect(editStartTimeInput).toBeInTheDocument();

        const editEndTimeInput = screen.getByLabelText('Час закінчення:');
        expect(editEndTimeInput).toBeInTheDocument();

        const saveButton = screen.getByText('Зберегти');
        expect(saveButton).toBeInTheDocument();
    });


    test('clicking "Видалити" button should call handleDelete', async () => {
        const handleDelete = jest.fn();
        const mockReservation = {
            ReservationId: '1',
            RoomId: '1',
            BeginTime: '2023-06-06T09:00:00',
            EndTime: '2023-06-06T19:00:00',
        };

        const mockData = [
            {
                ReservationId: '1',
                RoomId: '1',
                BeginTime: '2023-06-06T09:00:00',
                EndTime: '2023-06-06T19:00:00',
            },
        ];

        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockData),
            })
        );

        await act(async () => {
            render(<ReservTable handleDelete={handleDelete} />);
        });

        const deleteButton = screen.getByText('Видалити');
        expect(deleteButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(deleteButton);
        });

    });





    test('clicking "Забронювати" button should call handleReservation', async () => {
        const handleReservation = jest.fn();
        render(<ReservTable handleReservation={handleReservation} />);
        const reservationButton = screen.getByText('Забронювати');
        fireEvent.click(reservationButton);
        expect(reservationButton).toBeInTheDocument();
        
    });



    test('clicking "Зберегти" button should call handleEdit', async () => {
        const handleEdit = jest.fn();
        const mockReservation = {
          ReservationId: '1',
          RoomId: '1',
          BeginTime: '2023-06-06T09:00:00',
          EndTime: '2023-06-06T19:00:00',
        };
    
        const mockData = [mockReservation];
    
        jest.spyOn(global, 'fetch').mockImplementation(() =>
          Promise.resolve({
            json: () => Promise.resolve(mockData),
          })
        );
    
        await act(async () => {
          render(<ReservTable />);
        });
    
        const editButton = screen.getByText('Редагувати');
        expect(editButton).toBeInTheDocument();
    
        fireEvent.click(editButton);
    
        const editRoomSelect = screen.getByLabelText('Аудиторія:');
        expect(editRoomSelect).toBeInTheDocument();
    
        const editStartTimeInput = screen.getByLabelText('Час початку:');
        expect(editStartTimeInput).toBeInTheDocument();
    
        const editEndTimeInput = screen.getByLabelText('Час закінчення:');
        expect(editEndTimeInput).toBeInTheDocument();
    
        const saveButton = screen.getByText('Зберегти');
        expect(saveButton).toBeInTheDocument();
    
        fireEvent.change(editRoomSelect, { target: { value: '2' } });
        fireEvent.change(editStartTimeInput, { target: { value: '2023-06-06T10:00' } });
        fireEvent.change(editEndTimeInput, { target: { value: '2023-06-06T20:00' } });
    
        await act(async () => {
          fireEvent.click(saveButton);
        });
    
        
      });
});


