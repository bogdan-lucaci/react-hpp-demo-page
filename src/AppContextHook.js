import React, { useContext } from 'react';
import DataAccess from './data/DataAccess';
import useThemeSwitch from './components/UI/ThemeHook';

const DataContext = React.createContext();
const ThemeContext = React.createContext();

export const AppContext = (props) => {

    const [themeName, theme, setThemeName] = useThemeSwitch();

    return (
        <DataContext.Provider value={DataAccess}>
            {/* adding ThemeSwitch custom hook result to ThemeContext*/}
            <ThemeContext.Provider value={{ themeName, theme, setThemeName }}>
                {props.children}
            </ThemeContext.Provider>
        </DataContext.Provider>
    )
}

const useAppContext = (context) => {
    const x = {
        DataContext: useContext(DataContext),
        ThemeContext: useContext(ThemeContext)
    };

    if (!x[context]) {
        throw new Error (
            'useAppContext must be used within an <AppContext>. Wrap a parent component in <AppContext> to fix this error.'
        )
    }

    return x[context];
};

export default useAppContext;