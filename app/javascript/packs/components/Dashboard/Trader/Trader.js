import React, { useContext } from 'react'
import Auth from '../../Contexts/Auth'
import Sidebar from './Sidebar'
import Header from './Header'
import Wallet from './Wallet'
import SearchHeader from './SearchHeader'

const Trader = () => {

    const { searchInput, searchShow, setSearchShow, traderMain } = useContext(Auth)
    
    return (
        <div style={{ backgroundColor: '#eaeff3' }}>
            <Sidebar />
            <Header />
            {searchShow ? <SearchHeader /> : null}
            {traderMain.main === 'wallet' ? <Wallet /> : null }
        </div>
    )
}

export default Trader
