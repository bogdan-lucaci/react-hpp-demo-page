import { useEffect, useState } from 'react';

const useDarkMode = () => {
    const [theme, setTheme] = useState(window.localStorage.getItem('theme') || 'dark');
    const toggleTheme = () => {
        if (theme === 'light') {
            window.localStorage.setItem('theme', 'dark')
            setTheme('dark')
        } else {
            window.localStorage.setItem('theme', 'light')
            setTheme('light')
        }
        console.log('useDarkMode : theme = ', theme);
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme && setTheme(localTheme);
    }, []);

    return [theme, toggleTheme]
};

export default useDarkMode;