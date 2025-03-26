import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import TodoItem from '../components/TodoItem';

describe('TodoItem', () => {
  const todo = {
    id: 1,
    text: 'Test Todo',
    deadline: '2023-12-31',
    completed: false,
  };

  it('renders the TodoItem component', () => {
    render(<TodoItem todo={todo} toggleTodo={() => {}} deleteTodo={() => {}} />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });

  it('toggles a todo item', () => {
    const toggleTodo = vi.fn();
    render(<TodoItem todo={todo} toggleTodo={toggleTodo} deleteTodo={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(toggleTodo).toHaveBeenCalledWith(todo.id);
  });

  it('deletes a todo item', () => {
    const deleteTodo = vi.fn();
    render(<TodoItem todo={todo} toggleTodo={() => {}} deleteTodo={deleteTodo} />);
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    fireEvent.click(deleteButton);
    expect(deleteTodo).toHaveBeenCalledWith(todo.id);
  });
});