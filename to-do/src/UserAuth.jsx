import { useState } from 'react';

export default function UserAuth() {

    const [user, setUser] = useState(null);
    // Использование хука useState для управления состоянием пользователя

    function registerUser(username) {
        setUser({
            username,
            tasks: []
        });
    }
    /* Функция registerUser вызывается для регистрации нового пользователя 
     с переданным именем пользователя и пустым списком задач
    */

    return {
        user,
        registerUser // Возвращение функции registerUser для регистрации нового пользователя
    }

}
