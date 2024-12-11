import React from 'react'
import Hero from '../home/Hero'
import Trendings from '../home/Trendings'
import HomeCreators from '../home/HomeCreators'
import ChatApp from '../chatapp/ChatApp'
import Pagination from '../home/Pagination'
import ThemeButton from '../pages/ThemeButton'
function Home() {
  return (
    <div>
      <Hero/>
      <Trendings/>
      <Pagination/>
      <HomeCreators/>
      {/* <ChatApp/> */}
      {/* <ThemeButton/> */}
    </div>
  )
}

export default Home