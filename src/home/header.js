import React from 'react';
import { Row, Col } from 'react-bootstrap';

function Header(props) {
    const { totalBalance, totalIncome, totalSpending } = props;
    return (
        <header>
            <Row>
                <Col>
                    <span className="p-2 balance">Balance</span>
                </Col>
            </Row>
            <Row>
                <Col><span className="p-2 totalBalance">₹{totalBalance}</span></Col>
            </Row>
            <Row>
                <Col><span className="p-2 pr-3 incomeColor">Income : ₹{totalIncome}</span><span className="spendingColor">Spendings : ₹{totalSpending}</span> </Col>
            </Row>
        </header>
    );
}

export default Header;