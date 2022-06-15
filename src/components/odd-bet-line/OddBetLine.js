import React, {useState} from 'react';
import {Button} from 'antd';

export default function OddBetLine(props) {
    const {betAmount, onBet} = props;
    const [selectedOdd, setSelectedOdd] = useState([]);

    const handleBet = (value) => {
        onBet({betAmount, betType: 'odd'});
    };

    return (
        <>
            <Button type="primary" onClick={handleBet} style={{background: 'green', borderColor: 'green'}}>ODD</Button>
        </>

    )
}
