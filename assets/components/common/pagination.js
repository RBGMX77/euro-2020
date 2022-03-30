import React from 'react';
import _ from 'lodash';

const Pagination = ({itemsCount , pageSize , currentPage, onPageChange , previousPage , nextPage}) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if(pagesCount===1) return null;
    const pages = _.range(1, pagesCount+1);
    
    return (
        <nav>
            <ul className="pagination-list">
                <li className="pagination-link" onClick={previousPage}>&#60;</li>
                { pages.map(page => (
                    <li key={page} 
                        className={ page === currentPage? "pagination-link is-current" : "pagination-link"}
                        onClick={() => onPageChange(page)}
                        >                        
                        {page}
                    </li>
                ))}      
                <li className="pagination-link" onClick={nextPage}>&#62;</li>          
            </ul>
        </nav>
    );
}
 
export default Pagination;