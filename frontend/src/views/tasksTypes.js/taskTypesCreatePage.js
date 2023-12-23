import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SketchPicker } from 'react-color';
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ShowAlert } from "../../utils/alerts_utils";
import { taskTypesCreateRequest } from "../../requests/taskTypesRequests";
import { OuterCard } from "../../components/OuterCard";
import { getTasksListUrl } from "../../utils/urls/task_urls";
import { MyButton } from "../../components/buttons/MyButton";

const TasksTypesCreatePage = () => {
	const { desk_id } = useParams();
	const navigate = useNavigate();

	const [ color, setColor ] = useState("#969696");
	const [ taskTypeData, setTaskData ] = useState({
		desk_id: desk_id,
		title: "",
		color: "",
	});

	const handleCreateTask = () => {
		if (!taskTypeData.title) {
			ShowAlert.warning({message: "Ввдите название задачи"});
			return;
		};
		taskTypeData.color = color;

		taskTypesCreateRequest(taskTypeData)
		.then(response => {
			if (response.status === 201) {
				return response.json();
			};
			ShowAlert.error({message: "Произошла неизвестаня ошибка"});
		})
		.then(data => {
			if (data.detail) {
				ShowAlert.error({message: data.detail});
				return;
			};
		});

		navigate(getTasksListUrl(desk_id));
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
			<h2 style={{ textAlign: 'center' }}>Создание типа задач</h2>
			<hr></hr>
			<Form>
				<Form.Group controlId="title" style={{marginTop: "10px"}} required>
					<Form.Label>Название</Form.Label>
					<Form.Control type="text" required onChange={(e) => setTaskData({...taskTypeData, title: e.target.value})}/>
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
				<MyButton variant="success" type="button" style={{width: '100%', marginTop: "20px"}} onClick={handleCreateTask} shadowColor="green">
					Создать
				</MyButton>
			</Form>
		</OuterCard>
	);
};

export default TasksTypesCreatePage;