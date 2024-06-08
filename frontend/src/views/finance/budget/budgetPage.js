import React, { useEffect, useState } from "react";
import { OuterCard } from "../../../components/OuterCard";
import { MyButton } from "../../../components/buttons/MyButton";

import { getBudgetRequest } from "../../../requests/financeRequests/budget";
import { ReplenishmentCreateRoutePath, ForgivenessCreateRoutePath, BudgetSettingsMainRoutePath } from '../../../utils/urls/budget_urls';
import { Link } from 'react-router-dom';

import OperationHistory from "../../../components/budget/operation/OperationHistory";

import { getBudgetOperationRequst, getBudgetOperationHistoryRequst } from "../../../requests/financeRequests/budget";

import Statistic from "../../../components/budget/statistic/Statistic";

import { getOperationStatisticRequest } from "../../../requests/financeRequests/budget";

import { Form } from 'react-bootstrap';
import { FORGIVENESS, REPLENISHMENT } from "../../../constants";

import { getOperationCreateRoutePath } from "../../../utils/urls/budget_urls";


const BudgetPage = () => {
    const [filters, setFilters] = useState({});
    const operationType = [
        {
            title: "Пополнение",
            value: REPLENISHMENT,
        },
        {
            title: "Списание",
            value: FORGIVENESS,
        }
    ]
    const [budget, setBudget] = useState({});
    const [operationHistory, setOperationHistory] = useState([])
    const [categories, setCategories] = useState([])
    const [banks, setBanks] = useState([])

    const [ operationStatisticData, setOperationStatisticData] = useState({});

    const [ showOperationStatistic, setShowOperationStatistic ] = useState(false);

    const operationStatisticSelect = "operationStatisticSelect"
    const budgetHistorySelect = "budgetHistorySelect"
    const [ showSelect, setShowSelect ] = useState()

    const handleShowOperationStatistic = () => {
        if (!showOperationStatistic && Object.keys(operationStatisticData).length === 0) {
            getOperationStatisticRequest()
            .then(response => {return response.json()})
            .then(data => {
                setOperationStatisticData(data)
            })
        }

        setShowOperationStatistic(!showOperationStatistic)
    }

    const handleShowOperationHistory = () => {
        if (operationHistory.length == 0) {
            getBudgetOperationHistoryRequst(filters)
            .then(response => {return response.json()})
            .then(data => {
                setOperationHistory(data)
            })
        }

        setShowSelect(budgetHistorySelect)
    };

    const handleSelectFilter = ({ operation_type, category_id, bank_id, order_by="desc" }) => {
        const _filters = filters

        if (operation_type) {_filters["operation_type"] = operation_type}
        else if (_filters.operation_type && operation_type === '') {delete _filters.operation_type}

        if (category_id) {_filters["category_id"] = category_id}
        else if (_filters.category_id && category_id === '') {delete _filters.category_id}

        if (bank_id) {_filters["bank_id"] = bank_id}
        else if (_filters.bank_id && bank_id === '') {delete _filters.bank_id}

        _filters["order_by"] = order_by

        setFilters({...filters, ..._filters})

        if (showSelect === budgetHistorySelect) {
            getBudgetOperationHistoryRequst(filters)
            .then(response => {return response.json()})
            .then(data => {
                setOperationHistory(data)
            })
        }
    }

    useEffect(() => {
        getBudgetRequest()
        .then(response => {return response.json()})
        .then(data => {
            setBudget(data)
            setCategories(data.categories)
            setBanks(data.banks)
        })
    }, [])

	return (
        <div className="container">
            <OuterCard 
                selfStyle={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <div>
                    <div style={{ textAlign: 'center', }}>
                        <h2>Информация о бюджете</h2>
                        <hr/>
                        <h3>{budget.amount} р.</h3>
                        <hr/>
                    </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between',  }}>
                    <div style={{ padding: '5px' }}>
                        <MyButton 
                            as={Link}
                            to={getOperationCreateRoutePath(REPLENISHMENT)}
                            style={{width: '100%'}} className='mt-3' variant='success' type='button'  shadowColor='green'
                        >
                            Пополнить
                        </MyButton>
                    </div>

                    <div style={{ padding: '5px' }}>
                        <MyButton 
                            as={Link}
                            to={getOperationCreateRoutePath(FORGIVENESS)}
                            style={{width: '100%'}} className='mt-3' variant='danger' type='button'  shadowColor='red'
                        >
                            Списать
                        </MyButton>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between',  }}>
                    <div style={{ padding: '5px' }}>
                        <MyButton 
                            as={Link}
                            to={BudgetSettingsMainRoutePath}
                            style={{width: '100%'}} className='mt-3' variant='secondary' type='button'  shadowColor='gray'
                        >
                            Настройки
                        </MyButton>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between',  }}>
                    <div style={{ padding: '5px' }}>
                        <MyButton
                            style={{width: '100%'}} className='mt-3' type='button' 
                            variant={showSelect === budgetHistorySelect ? 'primary' : 'secondary'} 
                            shadowColor={showSelect === budgetHistorySelect ? 'blue' : 'gray'} 
                            onClick={handleShowOperationHistory}
                        >
                            История
                        </MyButton>
                    </div>

                    <div style={{ padding: '5px' }}>
                        <MyButton
                            style={{width: '100%'}} className='mt-3' type='button' 
                            variant={showSelect === operationStatisticSelect ? 'primary' : 'secondary'} 
                            shadowColor={showSelect === operationStatisticSelect ? 'blue' : 'gray'} 
                            onClick={() => setShowSelect(operationStatisticSelect)}
                        >
                            Статистика
                        </MyButton>
                    </div>
                </div>

                {
                    showSelect === budgetHistorySelect ?
                    <div>
                        <div>
                            <div style={{ textAlign: 'center', }}>
                                <br/>
                                <hr/>
                                <h4>Фильтры</h4>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between',  }}>
                            <div style={{ padding: '5px' }}>
                                <Form.Group controlId='categoryId' style={{ marginTop: '10px' }}>
                                    <Form.Select onChange={(e) => handleSelectFilter({operation_type: e.target.value})}>
                                        <option value="">Тип операции</option>  {/* Нулевой элемент */}
                                        {operationType.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.title}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div style={{ padding: '5px' }}>
                                <Form.Group controlId='categoryId' style={{ marginTop: '10px' }}>
                                    <Form.Select onChange={(e) => handleSelectFilter({category_id: e.target.value})}>
                                        <option value="">Категория</option>  {/* Нулевой элемент */}
                                        {categories.filter(category => {
                                            let operation_type = filters["operation_type"]
                                            if (operation_type && category.operation_type == operation_type) {
                                                return category
                                            }
                                        }).map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.title}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div style={{ padding: '5px' }}>
                                <Form.Group controlId='categoryId' style={{ marginTop: '10px' }}>
                                    <Form.Select onChange={(e) => handleSelectFilter({bank_id: e.target.value})}>
                                        <option value="">Банк</option>  {/* Нулевой элемент */}
                                        {banks.map((bank) => (
                                            <option key={bank.id} value={bank.id}>
                                                {bank.title}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div style={{ padding: '5px' }}>
                                <Form.Group controlId='orderById' style={{ marginTop: '10px' }}>
                                    <Form.Select onChange={(e) => handleSelectFilter({order_by: e.target.value})}>
                                        <option value="desc">Сначала новые</option>
                                        <option value="asc">Сначала старые</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    : null
                }
            </OuterCard>
            <br/>

            <div>
                {
                    showSelect === budgetHistorySelect ?
                    <OperationHistory operationHistory={ operationHistory }/>
                    : null
                }
                {
                    showSelect === operationStatisticSelect && operationStatisticData ?
                    <Statistic 
                        showOperationStatistic={showOperationStatistic} handleShowOperationStatistic={handleShowOperationStatistic}
                        operationData={operationStatisticData}
                    />
                    : null
                }
            </div>
        </div>
	);
};

export default BudgetPage;