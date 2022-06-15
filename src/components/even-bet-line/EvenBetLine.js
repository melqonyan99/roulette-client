import React, {useState} from 'react';
import {Button} from 'antd';

export default function EvenBetLine(props) {
    const {betAmount, onBet} = props;
    const [selectedEven, setSelectedEven] = useState([]);

    const handleBet = (value) => {
        onBet({betAmount, betType: 'even'});
    };

    return (
        <>
            <Button type='primary' onClick={handleBet} style={{background: 'green', borderColor: 'green'}}>EVEN</Button>
        </>

    )
}
