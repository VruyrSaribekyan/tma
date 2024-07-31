import React from 'react';
import './Energy.css';

type EnergyProps = {
    energy: number;
    maxEnergy: number;
};

const Energy: React.FC<EnergyProps> = ({ energy, maxEnergy }) => {
    const energyPercent = (energy / maxEnergy) * 100;
    return (
        <div className="energy">
            <div className="energy__bar">
                <div>
                    <span className="energy__present">Your Energy: </span>
                    <span className="energy__present">{energyPercent.toFixed(0)}%</span>
                </div>
                <div className="energy__fill">
                    <div className='energy__count'>
                        <span className='energy__title'>{energy}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Energy;
