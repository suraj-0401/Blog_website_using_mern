import React, {useState } from 'react'
import MyThemeContext from './MyThemeContext';

function MyThemeContextProvider({children}) {
    const [isToggled,setIsToggled]=useState(false);
    const toggle=()=>{
        setIsToggled(!isToggled);
    }
  return (
    <MyThemeContext.Provider value={{isToggled,toggle}}>
        {children}
    </MyThemeContext.Provider>
  )
}

export default MyThemeContextProvider