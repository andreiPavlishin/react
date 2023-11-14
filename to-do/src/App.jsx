// //App.jsx

// import { useState } from 'react';
// import UserAuth from './UserAuth';
// import RegisterForm from './RegisterForm';
// import ToDo from './ToDo';

// function App() {
//   const [user, setUser] = useState(null); // Использование хука useState для управления состоянием пользователя
//   const [tasks, setTasks] = useState([]); // Использование хука useState для управления списком задач
//   const { registerUser } = UserAuth(); // Инициализация функции регистрации пользователя из компонента UserAuth

//   const handleRegister = (username) => { // Обработчик регистрации пользователя
//     setUser({ username, tasks: [] }); // Установка нового пользователя с именем и пустым списком задач
//   };

//   if (!user) { // Проверка наличия пользователя
//     return <RegisterForm onRegister={handleRegister} />; // Возвращение компонента регистрации, если пользователь не зарегистрирован
//   }

//   return (
//     <ToDo user={user} tasks={tasks} setTasks={setTasks} /> // Возвращение компонента ToDo с передачей данных о пользователе и списка задач
//   );
// }

// export default App; // Экспорт компонента App

import { useState, useEffect } from 'react';
import UserAuth from './UserAuth';
import RegisterForm from './RegisterForm';
import ToDo from './ToDo';

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [tasks, setTasks] = useState([]);

  const { registerUser } = UserAuth();

  const handleRegister = (username) => {
    const newUser = { username, tasks: [] };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  if (!user) {
    return <RegisterForm onRegister={handleRegister} />;
  }

  return (
    <div>
      <button onClick={handleLogout}>Выход</button>
      {Object.values(JSON.parse(localStorage.getItem('users'))).map((user) => (
        <div key={user.id}>{user.username}</div>
      ))}
      <ToDo user={user} tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;