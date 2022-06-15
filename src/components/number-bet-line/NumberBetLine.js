import React, {useState} from 'react';
import {Button, Col, Row} from 'antd';
import {NUMBER_BET} from "../../constants/NUMBER_BET";

export default function NumberBetLine(props) {
    const {betAmount, onBet} = props;

    const [selectedNumbers, setSelectedNumbers] = useState([]);

    const handleChange = (value) => {
        setSelectedNumbers(value)
        onBet(value);
    };

    const addBet = (bettingNumber) => {
        onBet({betAmount: betAmount, betType: bettingNumber})
    }

    return (
        <>
            <Row gutter={16}>
                <Col span={24}>
                    <Button type="primary" size='large' style={{background: 'green', borderColor: 'green'}}
                            key={0}>0</Button>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {NUMBER_BET.map((e, index) => {
                    if (e.value !== 0) {
                        return (
                            <Col span={2} key={e.value}>
                                <Button type="primary" size='large' style={{
                                    background: index % 2 === 0 ? 'black' : 'red',
                                    borderColor: index % 2 === 0 ? 'black' : 'red'
                                }} onClick={() => addBet(e.value)}>{e.value}</Button>
                            </Col>
                        )
                    }
                })}
            </Row>
        </>

    )
}
