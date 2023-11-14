// // Создание to-do компонентов

import { useState, useEffect } from 'react';

export default function ToDo(props) {
  const { user, setTasks } = props;
  const [tasks, setTasksState] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasksState(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
    };
    setTasksState(prevTasks => [...prevTasks, newTask]);
    setTitle('');
  }

  function toggleCompleted(id) {
    setTasksState(prevTasks =>
      prevTasks.map(task => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  }

  function deleteTask(id) {
    setTasksState(prevTasks => prevTasks.filter(task => task.id !== id));
  }

  useEffect(() => {
    setTasks(tasks);
  }, [tasks, setTasks]);

  function handleChange(e) {
    setTitle(e.target.value);
  }

  return (
    <div className="todo-container">
      <h1>Привет {user.username}, вот твои задачи</h1>
      <form onSubmit={addTask}>
        <input value={title} onChange={handleChange} />
        <button>Добавить задачу</button>
      </form>
      <div className="tasks">
        {tasks.map(task => (
          <div key={task.id} className="task">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleted(task.id)}
            />
            <div className={task.completed ? 'task-title completed' : 'task-title'}>
              {task.title}
            </div>
            <button onClick={() => deleteTask(task.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
}
