import React, { useState, useEffect } from 'react';
import './FruitClicker.css';
import Balance from '../Balance/Balance';
import Energy from '../Energy/Energy';
import { fetchUserData, sendUserData } from '../../services/api';
import { useInterval } from '../../hooks/useInterval';

const FruitClicker = () => {
    const [coins, setCoins] = useState(0);
    const [energy, setEnergy] = useState(1000);
    const [isAnimating, setIsAnimating] = useState(false);
    const [tapCount, setTapCount] = useState(0);
    const [tapPosition, setTapPosition] = useState({ x: 0, y: 0 });
    const maxEnergy = 1000;

    const handleTap = (numberOfTouches, clientX, clientY) => {
        if (energy >= numberOfTouches) {
            setCoins(coins + numberOfTouches);
            setEnergy(energy - numberOfTouches);
            setTapCount(numberOfTouches);
            setTapPosition({ x: clientX, y: clientY });
            animateFruit();
        }
    };

    const handleClick = (event) => handleTap(1, event.clientX, event.clientY);

    const handleTouchStart = (event) => {
        const numberOfTouches = event.touches.length;
        const touch = event.touches[0];
        handleTap(numberOfTouches, touch.clientX, touch.clientY);
    };

    const animateFruit = () => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
    };

    useEffect(() => {
        const fetchData = async () => {
            const userId = 7170554231;
            const data = await fetchUserData(userId);
            setCoins(data.coins);
            setEnergy(data.energy);
        };
        fetchData();
    }, []);

    useInterval(() => {
        if (energy < maxEnergy) {
            setEnergy((prevEnergy) => Math.min(prevEnergy + 1, maxEnergy));
        }
        setCoins((prevCoins) => prevCoins + 1);
    }, 1000);

    useEffect(() => {
        const handleUnload = () => {
            const userId = 7170554231;
            sendUserData(userId, coins, energy);
        };
        window.addEventListener('beforeunload', handleUnload);
        return () => window.removeEventListener('beforeunload', handleUnload);
    }, [coins, energy]);

    return (
        <div className="clicker-container">
            <Balance coins={coins} />
            <div className='fruitbg'>
                <div
                    className={`fruit ${isAnimating ? 'animate' : ''}`}
                    onClick={handleClick}
                    onTouchStart={handleTouchStart}
                >
                    <img style={{ cursor: 'pointer' }} src="fruit.png" alt="Fruit" />
                    {isAnimating && (
                        <div
                            className="tap-count"
                            style={{ top: tapPosition.y, left: tapPosition.x }}
                        >
                            +{tapCount}
                        </div>
                    )}
                </div>
            </div>
            <Energy energy={energy} maxEnergy={maxEnergy} />
        </div>
    );
};

export default FruitClicker;
