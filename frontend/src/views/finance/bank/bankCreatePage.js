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

import { createBankRequest } from "../../../requests/financeRequests/budget";

import { BudgetGetRoutePath } from '../../../utils/urls/budget_urls';

const BankCreatePage = () => {
	const navigate = useNavigate();

	const [ color, setColor ] = useState("#969696");
	const [ bankData, setBankData ] = useState({
		title: "",
		color: "",
	});

	const handleBank = () => {
		if (!bankData.title) {
			ShowAlert.warning({message: "Ввдите название банка"});
			return;
		};
		bankData.color = color;

        createBankRequest(bankData)

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
			<h2 style={{ textAlign: 'center' }}>Создание банка</h2>
			<hr></hr>
			<Form>
				<Form.Group controlId="title" style={{marginTop: "10px"}} required>
					<Form.Label>Название</Form.Label>
					<Form.Control type="text" required onChange={(e) => setBankData({...bankData, title: e.target.value})}/>
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
				<MyButton variant="success" type="button" style={{width: '100%', marginTop: "20px"}} onClick={handleBank} shadowColor="green">
					Создать
				</MyButton>
			</Form>
		</OuterCard>
	);
};

export default BankCreatePage;