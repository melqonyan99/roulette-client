import React, {useState, useEffect} from 'react';
import {Slider, Row, Col, Button, Statistic, Tooltip, message} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import NumberBetLine from "../../components/number-bet-line/NumberBetLine";
import OddBetLine from "../../components/odd-bet-line/OddBetLine";
import EvenBetLine from "../../components/even-bet-line/EvenBetLine";
import axios from 'axios';
import CryptoJS from 'crypto-js'

const KEY = 'roulette-game';

export default function Roulette() {
    const [activeBalance, setActiveBalance] = useState(0);
    const [fullBet, setFullBet] = useState([]);
    const [fullAmount, setFullAmount] = useState(0);
    const [size, setSize] = useState(10);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:5000/create').then(response => {
            if (response.data) {
                setActiveBalance(response.data)
                localStorage.setItem('balance', response.data);
            }
        })
    }, []);

    useEffect(() => {
        if (fullBet.length > 0) {
            setFullAmount(fullAmount + fullBet[fullBet.length - 1].betAmount)
        }
        console.log(fullBet)
    }, [fullBet]);

    const handleBet = (value) => {
        if (fullAmount + value.betAmount > activeBalance) {
            message.error(`Your total bet is more than your active balance`);
        } else {
            message.success(`Your ${value.betAmount}$ bet successfully confirmed on number ${value.betType}`)
            setFullBet([...fullBet, value]);
        }
    }

    const Spin = () => {
        setLoading(true)
        const data = {betInfo: [...fullBet], activeBalance, fullAmount}
        axios.post('http://localhost:5000/spin', data).then((response) => {
            setActiveBalance(response.data.newBalance);
            setFullAmount(0);
            setFullBet([]);
            localStorage.setItem('balance',response.data.newBalance);
            setLoading(false)
            console.log(response.data)
        });
    }
    return (
        <>
            <NumberBetLine betAmount={size} onBet={handleBet}/>
            <Row gutter={16}>
                <Col span={12}>
                    <OddBetLine betAmount={size} onBet={handleBet}/>
                </Col>
                <Col span={12}>
                    <EvenBetLine betAmount={size} onBet={handleBet}/>
                </Col>
            </Row>

            <Slider min={10} max={100} step={10} value={size} onChange={value => setSize(value)}/>

            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="Active Balance" value={activeBalance}/>
                </Col>
                <Col span={12}>
                    <Statistic title="Total Bet" value={fullAmount}/>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Tooltip placement="top" title="Spin">
                        <Button
                            type="primary"
                            size="large"
                            shape="circle"
                            style={{background: 'green', borderColor: 'green'}}
                            icon={<SyncOutlined/>}
                            loading={loading}
                            onClick={Spin}
                        />
                    </Tooltip>
                </Col>
            </Row>
        </>
    )
}