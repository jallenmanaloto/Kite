import React, { useState } from 'react'
import App from './App'
import Auth from './Contexts/Auth'

const Page = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [searchStock, setSearchStock] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [searchShow, setSearchShow] = useState(false)
    
    return (
        <div>
            <Auth.Provider value={{ currentUser, setCurrentUser, searchInput, setSearchInput, searchShow, setSearchShow, searchStock, setSearchStock }}>
                <App />
            </Auth.Provider>
        </div>
    )
}

export default Page
