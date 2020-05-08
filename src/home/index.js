import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Header from './header';
import Footer from './footer';

function Home() {

    const LS_INCOME = 'LS_INCOME_LIST';

    const [dataIS, setDataIS] = useState({
        totalBalance: 0.00,
        totalIncome: 0.00,
        totalSpending: 0.00,
        incomeSpendingList: [],
        rowCount: 0
    });

    useEffect(() => {
        const incomeList = JSON.parse(localStorage.getItem(LS_INCOME));
        incomeList && setDataIS(incomeList);
    },[]);

    useEffect(() => {
        localStorage.setItem(LS_INCOME, JSON.stringify(dataIS));
    }, [dataIS]);


    const addIncome = () => {
        const { totalSpending, incomeSpendingList, totalBalance, totalIncome, rowCount } = dataIS;
        const pFrom = prompt('Income From : ');
        const pAmount = parseFloat(prompt('Enter the Income amount : '));
        if (pFrom === null || pAmount === null) return;
        if (!isNaN(pAmount) && pAmount > 0) {
            const reTotalBalance = totalBalance + pAmount;
            const reTotalIncome = totalIncome + pAmount;
            const callCount = rowCount + 1;
            incomeSpendingList.push({ id: callCount, txt: pFrom, amount: pAmount, isIncome: true, date: getDate() });
            setDataIS({ totalSpending, totalBalance: reTotalBalance, totalIncome: reTotalIncome, incomeSpendingList: incomeSpendingList, rowCount: callCount });
        } else {
            alert("Please Enter the valid amount");
        }
    }

    const addSpending = () => {
        const { totalIncome, incomeSpendingList, totalBalance, totalSpending, rowCount } = dataIS;
        const pFor = prompt('Spending for : ');
        const pAmount = parseFloat(prompt('Enter the Spending amount : '));
        if (pFor === null || pAmount === null) return;
        if (!isNaN(pAmount) && pAmount > 0) {
            const reTotalBalance = totalBalance - pAmount;
            const reTotalSpending = totalSpending > 1 ? totalSpending + pAmount : pAmount;
            const callCount = rowCount + 1;
            incomeSpendingList.push({ id: callCount, txt: pFor, amount: pAmount, isIncome: false, date: getDate() });
            setDataIS({ totalIncome, totalBalance: reTotalBalance, totalSpending: reTotalSpending, incomeSpendingList: incomeSpendingList, rowCount: callCount });
        } else {
            alert("Please Enter the valid amount");
        }
    }

    const deleteRow = (id) => {
        let { totalBalance, totalIncome, totalSpending, incomeSpendingList, rowCount } = dataIS;
        const delList = incomeSpendingList.filter((data) => data.id === id);

        if (delList[0].isIncome) {
            totalBalance = totalBalance - parseInt(delList[0].amount);
            totalIncome = totalIncome - parseInt(delList[0].amount);
        }
        else {
            totalBalance = totalBalance + parseInt(delList[0].amount);
            totalSpending = totalSpending - parseInt(delList[0].amount);
        }

        const lstFilter = incomeSpendingList.filter((data) => data.id !== id);
        setDataIS({ rowCount, totalBalance: totalBalance, totalIncome: totalIncome, totalSpending: totalSpending, incomeSpendingList: lstFilter });
    }

    const getDate = () => {
        const d = new Date();
        return `${d.getDate()}.${d.getDay() + 1}.${d.getFullYear()}`;
    }


    const bindIncomeSpendingList = (incomeLst) => {
        return incomeLst.map((data) =>
            <div id={data.id}>
                <Row className="pt-2 pr-2 pb-0 pl-2 date"><Col >{data.date}</Col></Row>
                <Row className="p-2 rowSize">
                    <Col sm='4' className={data.isIncome ? 'incomeColor' : 'spendingColor'}>₹{data.amount} </Col>
                    <Col sm='4'>{data.txt} </Col>
                    <Col sm='4' className="text-right"><FontAwesomeIcon icon={faTrash} onClick={() => deleteRow(data.id)} /></Col>
                </Row>
                <hr />
            </div>
        )
    }

    const { totalBalance, totalIncome, totalSpending, incomeSpendingList } = dataIS;

    return (
        <Container>
            <Header totalBalance={totalBalance} totalIncome={totalIncome} totalSpending={totalSpending} />
            <Row>
                <Col>{incomeSpendingList && bindIncomeSpendingList(incomeSpendingList)}</Col>
            </Row>
            <Footer addIncome={addIncome} addSpending={addSpending} />
        </Container>
    );
}

export default Home;