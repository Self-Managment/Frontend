import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SketchPicker } from 'react-color';
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ShowAlert } from "../../../utils/alerts_utils";
import { taskTypesCreateRequest } from "../../../requests/taskTypesRequests";
import { OuterCard } from "../../../components/OuterCard";
import { getTasksListUrl } from "../../../utils/urls/task_urls";
import { MyButton } from "../../../components/buttons/MyButton";

import { createOperationCategoryRequest } from "../../../requests/financeRequests/budget";

import { BudgetGetRoutePath } from '../../../utils/urls/budget_urls';
import { FORGIVENESS, REPLENISHMENT } from "../../../constants";

const OperationCategoryCreatePage = () => {
	const navigate = useNavigate();

	const [ color, setColor ] = useState("#969696");
	const [ operationCategoryData, setOperationCategoryData ] = useState({
		title: "",
		color: "",
		operation_type: REPLENISHMENT,
	});

	const handleOperationCategory = () => {
		if (!operationCategoryData.title) {
			ShowAlert.warning({message: "Ввдите название причины"});
			return;
		};
		operationCategoryData.color = color;

        createOperationCategoryRequest(operationCategoryData)

		navigate(BudgetGetRoutePath);
	};

	const handleChangeComplete = (_color) => {
		setColor(_color.hex);
	};

	return (
		<OuterCard selfStyle={{
			width: '300px',
			margin: '20px auto',
			border: `1px solid ${color}`,
			boxShadow: `0 0 8px ${color}`
		}}>
			<h2 style={{ textAlign: 'center' }}>Создание категории</h2>
			<hr></hr>
			<Form>
				<Form.Group controlId="title" style={{marginTop: "10px"}} required>
					<Form.Label>Название</Form.Label>
					<Form.Control type="text" required onChange={(e) => setOperationCategoryData({...operationCategoryData, title: e.target.value})}/>
				</Form.Group>

				<Form.Group controlId='categoryId' style={{ marginTop: '10px' }}>
					<Form.Label>Тип операции</Form.Label>
					<Form.Select onChange={(e) => setOperationCategoryData({...operationCategoryData, operation_type: e.target.value})}>
						<option value={REPLENISHMENT}>Пополнение</option>
						<option value={FORGIVENESS}>Списание</option>
					</Form.Select>
				</Form.Group>
				
				<div style={{marginTop: "20px"}}>
					<div style={{
							display: "flex",
							justifyContent: 'center'
						}}>
							<SketchPicker
								color={ color }
								onChangeComplete={ handleChangeComplete }
							/>
					</div>
				</div>
				<MyButton variant="success" type="button" style={{width: '100%', marginTop: "20px"}} onClick={handleOperationCategory} shadowColor="green">
					Создать
				</MyButton>
			</Form>
		</OuterCard>
	);
};

export default OperationCategoryCreatePage;