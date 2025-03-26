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

    // "New Todo"라는 텍스트가 문서에 있는지 확인합니다.
    expect(screen.getByDisplayValue('New Todo')).toBeInTheDocument();

    // "2023-12-31"이라는 텍스트가 문서에 있는지 확인합니다.
    expect(screen.getByDisplayValue('2023-12-31')).toBeInTheDocument();
  });

  it('does not add a todo item with more than 100 characters', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add a new todo');
    const dateInput = screen.getByLabelText('Deadline');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'a'.repeat(101) } });
    fireEvent.change(dateInput, { target: { value: '2023-12-31' } });
    fireEvent.click(addButton);

    expect(screen.queryByText('a'.repeat(101))).not.toBeInTheDocument();
  });

  it('does not add a todo item with a past deadline', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add a new todo');
    const dateInput = screen.getByLabelText('Deadline');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.change(dateInput, { target: { value: '2000-01-01' } });
    fireEvent.click(addButton);

    expect(screen.queryByText('New Todo (by 2000-01-01)')).not.toBeInTheDocument();
  });
});
