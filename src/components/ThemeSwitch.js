import React, { useContext, useState } from 'react';

import { ThemeContext } from '../App';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Tooltip from '@material-ui/core/Tooltip';


const ThemeIcon = ({ theme, isDarkMode }) => {
	const lightIconStyle = {fill: theme.palette.primary.light};
	const darkIconStyle = {fill: theme.palette.primary.dark};
	if (isDarkMode)
		return (
			<svg xmlns="http://www.w3.org/2000/svg" style={lightIconStyle} height="24" width="24">
				<path fill="none" d="M0 0h24v24H0z"></path>
				<path d="M11.1 12.08c-2.33-4.51-.5-8.48.53-10.07C6.27 2.2 1.98 6.59 1.98 12c0 .14.02.28.02.42.62-.27 1.29-.42 2-.42 1.66 0 3.18.83 4.1 2.15A4.01 4.01 0 0111 18c0 1.52-.87 2.83-2.12 3.51.98.32 2.03.5 3.11.5 3.5 0 6.58-1.8 8.37-4.52-2.36.23-6.98-.97-9.26-5.41z"></path>
				<path d="M7 16h-.18C6.4 14.84 5.3 14 4 14c-1.66 0-3 1.34-3 3s1.34 3 3 3h3c1.1 0 2-.9 2-2s-.9-2-2-2z"></path>
			</svg>
		)
	return (
		<svg xmlns="http://www.w3.org/2000/svg" style={darkIconStyle}  height="24" width="24">
			<path d="M0 0h24v24H0z" fill="none"></path>
			<path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"></path>
		</svg>
	)
};

// themeName, theme (object), setThemeName provided by ThemeSwitchHook from ThemeContext
const ThemeSwitch = () => {
	const {themeName: currentThemeName, theme: currentTheme, setThemeName} = useContext(ThemeContext);
	const [switchState, setSwitchState] = useState({
		dark: currentThemeName === 'dark',
		//light: false
	});

	const handleChange = (event) => {
		setThemeName(switchState.dark ? 'dark' : 'light');
		setSwitchState({ ...switchState, [event.target.name]: event.target.checked });
	};    

	return (
		<Tooltip title={`Toggle ${switchState.dark ? 'Light' : 'Dark'}  mode`} placement="right" arrow>
		{/*
			<>
			<ThemeIcon theme={currentTheme} isDarkMode={false} />
		*/}
			<FormControlLabel
				value="top"
				control={
					<Switch 
						checked={switchState.dark}
						onChange={handleChange}
						name="dark"
						inputProps={{ 'aria-label': 'secondary checkbox' }}                
						color="primary" 
					/>
				}
				//label={ !switchState.dark ? "Dark Mode" : "Light Mode"}
				label={ <ThemeIcon theme={currentTheme} isDarkMode={!switchState.dark} /> }
				labelPlacement="top"
			/>
		{/*
			<ThemeIcon theme={currentTheme} isDarkMode={true} />
			</>
		*/}
		</Tooltip>
	);
};


export default ThemeSwitch;