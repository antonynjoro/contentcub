import React from 'react'
import LandingPageNav from './components/LandingPageNav'
import TawkChatSnippet from '../../components/TawkChatSnippet'

export default function Layout({ children}) {
  return (
    <div>
        <LandingPageNav />
      {children}
      <TawkChatSnippet />
    </div>
  )
}
