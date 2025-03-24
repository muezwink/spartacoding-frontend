import React, { useState } from 'react';
import TodoItem from '../components/TodoItem';

interface Todo {
  id: number;
  text: string;
  deadline: string;
  completed: boolean;
}

const TodoListComponent: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [deadline, setDeadline] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '' || deadline.trim() === '') return;
    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
      deadline: deadline,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
    setDeadline('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
      </div>
      <div>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoListComponent;

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

  it('does not add a todo item if text is more than 100 characters', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add a new todo');
    const dateInput = screen.getByLabelText('Deadline');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'A'.repeat(101) } });
    fireEvent.change(dateInput, { target: { value: '2023-12-31' } });
    fireEvent.click(addButton);

    expect(screen.queryByText('A'.repeat(101))).not.toBeInTheDocument();
    expect(screen.getByText('할일은 100자 이하로 입력해주세요.')).toBeInTheDocument();
  });

  it('does not add a todo item if deadline is before today', () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText('Add a new todo');
    const dateInput = screen.getByLabelText('Deadline');
    const addButton = screen.getByText('Add');

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.change(dateInput, { target: { value: '2020-01-01' } });
    fireEvent.click(addButton);

    expect(screen.queryByText('New Todo (by 2020-01-01)')).not.toBeInTheDocument();
    expect(screen.getByText('데드라인은 오늘 날짜 이후로 설정해주세요.')).toBeInTheDocument();
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
