import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { tasksCreateRequest } from '../../../requests/tasksRequests';
import { ShowAlert } from '../../../utils/alerts_utils';
import { OuterCard } from '../../../components/OuterCard';
import { getTasksListUrl } from '../../../utils/urls/task_urls';
import { MyButton } from '../../../components/buttons/MyButton';

import { BudgetGetRoutePath } from '../../../utils/urls/budget_urls';
import { createBudgetOperationRequst, getBankRequest } from '../../../requests/financeRequests/budget';

import { REPLENISHMENT } from '../../../constants';

import { getOperationCategoryRequest } from '../../../requests/financeRequests/budget';

const OperationCreatePage = () => {
    const { operation_type } = useParams();
	const navigate = useNavigate();

	const [operationData, setOperationData] = useState({
		amount: 0,
        operation_type: operation_type,
        category: null,
		bank: null,
		description: null,
		date: null,
	});
    const [ categories, setCategoriesData ] = useState([]);
	const [ banks, setBanksData ] = useState([]);

	const [ categoryColor, setCategoryColor ] = useState("#969696");
	const [ bankColor, setBankColor ] = useState("#969696");

    useEffect(() => {
        getOperationCategoryRequest()
        .then(response => {return response.json()})
        .then(data => {
            setCategoriesData(data)
        })

		getBankRequest()
		.then(response => {return response.json()})
        .then(data => {
            setBanksData(data)
        })

        return;
    }, [])

	const handleSelectCategory = (category_id) => {
		setOperationData({ ...operationData, category: category_id });
	
		const category = categories.find(category => category.id == category_id);
		if (category) {
			setCategoryColor(category.color)
		} else {
			setCategoryColor("#969696")
		}
	}

	const handleSelectBank = (bank_id) => {
		setOperationData({ ...operationData, bank: bank_id });
	
		const bank = banks.find(bank => bank.id == bank_id);
		if (bank) {
			setBankColor(bank.color)
		} else {
			setBankColor("#969696")
		}
	}

    const hadnleCreateOperation = () => {
        let amount = operationData.amount;
		let description = operationData.description;

        if (!amount) {
            ShowAlert.warning({ message: 'Введите сумму' })
            return
        }

        if (isNaN(+amount) || amount <= 0) {
            ShowAlert.warning({ message: 'Введите сумму больше нуля' })
            return
        }

		if (description && description.length > 25) {
			ShowAlert.warning({ message: 'Максимально допустимое количество символов для описания - 25' })
            return
		}

        createBudgetOperationRequst(operationData)

        navigate(BudgetGetRoutePath);
    }

	return (
		<OuterCard selfStyle={{ 
			width: '300px',
			margin: '20px auto',
			borderTop: `1px solid ${categoryColor}`,
			borderLeft: `1px solid ${categoryColor}`,
			borderBottom: `1px solid ${bankColor}`,
			borderRight: `1px solid ${bankColor}`,
			boxShadow: `3px 3px 6px ${bankColor}, -3px -3px 6px ${categoryColor}`,
		}}>
			<h2 style={{ textAlign: 'center' }}>
                {
                    operation_type === REPLENISHMENT ?
                    "Пополнить бюджет"
                    : "Списать бюджет"
                }
            </h2>
			<hr/>
			<Form>
				<Form.Group controlId='amount' style={{ marginTop: '10px' }} required>
					<Form.Label>Сумма</Form.Label>
					<Form.Control type='number' required onChange={(e) => setOperationData({ ...operationData, amount: e.target.value })} />
				</Form.Group>

				<Form.Group controlId='amount' style={{ marginTop: '10px' }} required>
					<Form.Label>Описание</Form.Label>
					<Form.Control type='text' onChange={(e) => setOperationData({ ...operationData, description: e.target.value })} />
				</Form.Group>

                <Form.Group controlId='categoryId' style={{ marginTop: '10px' }}>
					<Form.Label>Категория</Form.Label>
					<Form.Select onChange={(e) => handleSelectCategory(e.target.value)}>
						<option value="">Выберите категорию</option>  {/* Нулевой элемент */}
						{categories.filter(category => {
							if (category.operation_type == operation_type) {
								return category
							}
						}).map((category) => (
							<option key={category.id} value={category.id}>
								{category.title}
							</option>
						))}
					</Form.Select>
				</Form.Group>

				<Form.Group controlId='bankId' style={{ marginTop: '10px' }}>
					<Form.Label>Банк</Form.Label>
					<Form.Select onChange={(e) => handleSelectBank(e.target.value)}>
						<option value="">Выберите банк</option>  {/* Нулевой элемент */}
						{banks.map((bank) => (
							<option key={bank.id} value={bank.id}>
								{bank.title}
							</option>
						))}
					</Form.Select>
				</Form.Group>

				<Form.Group controlId='date' style={{ marginTop: '10px' }}>
					<Form.Label>Дата</Form.Label>
					<Form.Control type='datetime-local' onChange={(e) => setOperationData({ ...operationData, date: e.target.value })} />
				</Form.Group>

                {
                    operation_type === REPLENISHMENT ?
                    <MyButton style={{ width: '100%', marginTop: '20px' }} variant='success' type='button' onClick={hadnleCreateOperation} shadowColor='green'>
                        Пополнить
                    </MyButton>
                    : 
                    <MyButton style={{ width: '100%', marginTop: '20px' }} variant='danger' type='button' onClick={hadnleCreateOperation} shadowColor='red'>
                        Списать
                    </MyButton>
                }
			</Form>
		</OuterCard>
	);
};

export default OperationCreatePage;
