import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import TodoList from '../components/TodoList';

describe('TodoList', () => {
  it('renders the TodoList component', () => {
    render(<TodoList />);
    expect(screen.getByText('Todo List')).toBeInTheDocument();
  });

  it('adds a new todo item', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add a new todo');
    const dateInput = screen.getByLabelText('Deadline');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.change(dateInput, { target: { value: '2023-12-31' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Todo (by 2023-12-31)')).toBeInTheDocument();
  });

  it('toggles a todo item', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add a new todo');
    const dateInput = screen.getByLabelText('Deadline');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.change(dateInput, { target: { value: '2023-12-31' } });
    fireEvent.click(addButton);

    const todoItem = screen.getByText('New Todo (by 2023-12-31)');
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(todoItem).toHaveStyle('text-decoration: line-through');
  });

  it('deletes a todo item', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add a new todo');
    const dateInput = screen.getByLabelText('Deadline');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.change(dateInput, { target: { value: '2023-12-31' } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('New Todo (by 2023-12-31)')).not.toBeInTheDocument();
  });
});