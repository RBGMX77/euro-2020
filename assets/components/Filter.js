import React from 'react';

const Filter = ({items,onItemSelect,selectedItem,label}) => {

    return ( 
        <div className="dropdown-trigger">
            <button className="button">
                <span>Filtrer par {label.toLowerCase()}</span>
                <span className="icon is-small">
                    <img src="/images/angledown.svg"/>
                </span>
            </button>
            <div className="dropdown-menu">
                <div className="dropdown-content">
                    <div className="dropdown-item">
                        <p className={'' === selectedItem ? 'selection is-active' : 'selection'} onClick={ () => onItemSelect('All')}>Tous</p>
                        {items.map(item =>
                        <p 
                            key={item} 
                            className={item === selectedItem ? 'selection is-active' : 'selection'} 
                            onClick={ () => onItemSelect(item)}
                        >
                            {label !== 'Groupe '? item : label + item}
                        </p>
                    )}                
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Filter;