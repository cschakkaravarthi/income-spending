import React from 'react';
import { Button } from 'react-bootstrap';

function Footer(props) {
    const { addIncome, addSpending } = props;
    return (
        <footer>
            <div className="d-flex justify-content-around">
                <Button className="btn btn-success" onClick={addIncome}> Add Income</Button>
                <Button className="btn btn-danger" onClick={addSpending}> Add Spending</Button>
            </div>
        </footer>
    )
}

export default Footer;