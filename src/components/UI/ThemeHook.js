import { useEffect, useState } from 'react';
import { LightTheme, DarkTheme } from '../../res/themes';

const useThemeSwitch = () => {
    const [themeName, setThemeName] = useState(window.localStorage.getItem('theme') || 'dark');
    const toggleTheme = () => {
        if (themeName === 'light') {
            window.localStorage.setItem('theme', 'dark')
            setThemeName('dark')
        } else {
            window.localStorage.setItem('theme', 'light')
            setThemeName('light')
        }
        //console.log('useDarkMode : theme = ', themeName);
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme && setThemeName(localTheme);
    }, []);

    return [themeName, themeName === 'dark' ? DarkTheme : LightTheme, toggleTheme]
};

export default useThemeSwitch;