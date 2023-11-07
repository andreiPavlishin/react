// Создание to-do компонентов

import { useState, useEffect } from 'react';

export default function ToDo(props) {

    const { user, tasks, setTasks } = props;

    const [title, setTitle] = useState('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Использование хука useEffect для сохранения задач в localStorage
    }, [tasks]);

    function addTask(e) { // Функция для добавления новой задачи
        e.preventDefault();

        const newTask = {
            id: Date.now(), // Создание уникального идентификатора для новой задачи
            title,
            completed: false
        };

        setTasks(prevTasks => [...prevTasks, newTask]); // Обновление списка задач с новой задачей
        setTitle('');
    }

    function handleChange(e) {
        setTitle(e.target.value);
    }

    function toggleCompleted(id) {
        setTasks(prevTasks => prevTasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        }));
    }

    function deleteTask(id) { // Удаление задачи
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }

    return (
        <div className="todo-container">

            <h1>Задачи для {user.username}</h1> {/* Отображение имени пользователя */}

            <form onSubmit={addTask}>
                <input
                    value={title}
                    onChange={handleChange} // Привязка обработчика изменения к полю ввода
                />
                <button>Добавить задачу</button>
            </form>

            <div className="tasks">
                {tasks.map(task => {
                    return (
                        <div key={task.id} className="task">
                            <input
                                type="checkbox"
                                checked={task.completed} // Установка состояния чекбокса на основе статуса завершенности задачи
                                onChange={() => toggleCompleted(task.id)} // Привязка обработчика переключения завершенности к чекбоксу
                            />
                            <div className={task.completed ? 'task-title completed' : 'task-title'}>
                                {task.title} {/* Отображение заголовка задачи */}
                            </div>
                            <button onClick={() => deleteTask(task.id)}>
                                Удалить
                            </button>
                        </div>
                    );
                })}
            </div>

        </div>
    );

}
