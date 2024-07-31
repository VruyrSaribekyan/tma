import React from 'react';
import './Balance.css';

type BalanceProps = {
    coins: number;
};

const Balance: React.FC<BalanceProps> = ({ coins }) => {
    return (
        <div className="balance">
            <div className='balance__inner'>
                <img className='balance__icon' src='balanceIcon.png' />
                <span className='balance__title'>{coins}</span>
            </div>
        </div>
    );
};

export default Balance;
