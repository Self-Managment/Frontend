import React, { useEffect, useState } from "react";
import { OuterCard } from "../../../components/OuterCard";
import { MyButton } from "../../../components/buttons/MyButton";

import { getBudgetRequest } from "../../../requests/financeRequests/budget";
import { ReplenishmentCreateRoutePath, ForgivenessCreateRoutePath } from '../../../utils/urls/budget_urls';
import { Link } from 'react-router-dom';

import { OperationCategoryCreateRoutePath, BankCreateRoutePath } from "../../../utils/urls/budget_urls";


const BudgetSettingsMainPage = () => {
    const [budget, setBudget] = useState({});
    const [operations, setOperations] = useState([]);

    useEffect(() => {
        getBudgetRequest()
        .then(response => {return response.json()})
        .then(data => {
            setBudget(data)
            setOperations(data.operations)
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
                        <h2>Настройки бюджета</h2>
                        <hr/>
                    </div>
                </div>
                
                <div>
                    <div style={{ textAlign: 'center', }}>
                        <h4>Категории</h4>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'align-items-center',  }}>
                        <div style={{ padding: '5px' }}>
                            <MyButton 
                                as={Link}
                                to={OperationCategoryCreateRoutePath}
                                style={{width: '100%'}} className='mt-3' variant='success' type='button'  shadowColor='green'
                            >
                                Создать
                            </MyButton>
                        </div>
                    </div>
                    <hr/>
                </div>

                <div>
                    <div style={{ textAlign: 'center', }}>
                        <h4>Банк</h4>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'align-items-center',  }}>
                        <div style={{ padding: '5px' }}>
                            <MyButton 
                                as={Link}
                                to={BankCreateRoutePath}
                                style={{width: '100%'}} className='mt-3' variant='success' type='button'  shadowColor='green'
                            >
                                Создать
                            </MyButton>
                        </div>
                    </div>
                    <hr/>
                </div>
            </OuterCard>
        </div>
	);
};

export default BudgetSettingsMainPage;