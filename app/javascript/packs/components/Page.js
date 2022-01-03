import React, { useState } from 'react'
import App from './App'
import Auth from './Contexts/Auth'

const Page = () => {
    const [currentUser, setCurrentUser] = useState({})
    return (
        <div>
            <Auth.Provider value={{ currentUser, setCurrentUser }}>
                <App />
            </Auth.Provider>
        </div>
    )
}

export default Page
