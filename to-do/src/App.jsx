import { useState } from 'react';
import UserAuth from './UserAuth';
import RegisterForm from './RegisterForm';
import ToDo from './ToDo';

function App() {
  const [user, setUser] = useState(null); // Использование хука useState для управления состоянием пользователя
  const [tasks, setTasks] = useState([]); // Использование хука useState для управления списком задач
  const { registerUser } = UserAuth(); // Инициализация функции регистрации пользователя из компонента UserAuth

  const handleRegister = (username) => { // Обработчик регистрации пользователя
    setUser({ username, tasks: [] }); // Установка нового пользователя с именем и пустым списком задач
  };

  if (!user) { // Проверка наличия пользователя
    return <RegisterForm onRegister={handleRegister} />; // Возвращение компонента регистрации, если пользователь не зарегистрирован
  }

  return (
    <ToDo user={user} tasks={tasks} setTasks={setTasks} /> // Возвращение компонента ToDo с передачей данных о пользователе и списка задач
  );
}

export default App; // Экспорт компонента App
