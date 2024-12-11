import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import useThemeContext from '../themecontext/UseThemeContext';

function ThemeButton() {
    const { isToggled, toggle } = useThemeContext();
    return (
        <div className={`flex justify-center items-center h-screen transition duration-300 
            ${isToggled ? 'bg-blue-200' : 'bg-gray-200'}`}>
            <button 
                onClick={toggle} 
                className={`px-4 py-2 text-white font-semibold rounded-lg transition duration-300 
                    ${isToggled ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 hover:bg-gray-600'}`}
            >
                <FontAwesomeIcon icon={isToggled ? faSun : faMoon} />
            </button>
        </div>
    );
}

export default ThemeButton;