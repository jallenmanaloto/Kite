import React, { useContext } from 'react'
import Auth from '../../Contexts/Auth'
import Sidebar from './Sidebar'
import Header from './Header'
import SearchHeader from './SearchHeader'

const Trader = () => {

    const { searchInput, searchShow, setSearchShow } = useContext(Auth)
    return (
        <div style={{ backgroundColor: '#eaeff3' }}>
            <Sidebar />
            <Header />
            {searchShow ? <SearchHeader /> : null}
        </div>
    )
}

export default Trader
