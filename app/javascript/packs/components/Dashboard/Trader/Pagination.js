import React from 'react'

const Pagination = ({ tradesPerPage, totalTrades, paginate }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalTrades / tradesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav style={{ position: 'fixed', bottom: '2em' }}>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li style={{ cursor: 'pointer' }} key={number} className='page-item'>
                        <a onClick={() => paginate(number)} className='page-link' style={{ color: 'black' }}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination
