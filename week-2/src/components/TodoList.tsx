import React, { useState } from 'react';
import TodoItem from './TodoItem';

interface Todo {
  id: number;
  text: string;
  deadline: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');

  const addTodo = () => {
    if (newTodo.trim() === '' || deadline.trim() === '') {
      setError('할일과 데드라인을 입력해주세요.');
      return;
    }
    if (newTodo.length > 100) {
      setError('할일은 100자 이하로 입력해주세요.');
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    if (deadline < today) {
      setError('데드라인은 오늘 날짜 이후로 설정해주세요.');
      return;
    }
    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
      deadline: deadline,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
    setDeadline('');
    setError('');
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
        <label htmlFor="deadline">Deadline</label>
        <input
          id="deadline"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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

export default TodoList;
