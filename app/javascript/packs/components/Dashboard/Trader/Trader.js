import React, { useContext } from 'react'
import Auth from '../../Contexts/Auth'
import MyStocks from './MyStocks'
import Header from './Header'
import Sidebar from './Sidebar'
import SearchHeader from './SearchHeader'
import Trade from './Trade'
import Wallet from './Wallet'

const Trader = () => {

    const { searchInput, searchShow, setSearchShow, traderMain } = useContext(Auth)
    
    return (
        <div style={{ backgroundColor: '#eaeff3' }}>
            <Sidebar />
            <Header />
            {searchShow ? <SearchHeader /> : null}
            {traderMain.main === 'wallet' ? <Wallet /> : null }
            {traderMain.main === 'trade' ? <Trade /> : null }
            {traderMain.main === 'stocks' ? <MyStocks /> : null }
        </div>
    )
}

export default Trader
