// Форма регистрации пользователя
import { useState } from 'react';
export default function RegisterForm({ onRegister }) {
    const [username, setUsername] = useState(''); // Использование хука useState для управления состоянием имени пользователя

    function handleSubmit(event) {
        event.preventDefault();
        onRegister(username); // Вызов функции onRegister для регистрации пользователя с введенным именем
        setUsername('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={username} // Установка значения поля ввода как текущее имя пользователя
                onChange={e => setUsername(e.target.value)} // Обновление состояния имени пользователя на основе введенного значения
                autoFocus // Автоматический фокус на поле ввода при загрузке формы
            />
            <button type="submit">Зарегистрироваться</button> { }
        </form>
    );
}

