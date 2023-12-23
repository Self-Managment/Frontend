import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SketchPicker } from 'react-color';
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ShowAlert } from "../../utils/alerts_utils";
import { taskTypesEditRequest } from "../../requests/taskTypesRequests";
import { taskTypesDeleteRequest } from "../../requests/taskTypesRequests";
import { OuterCard } from "../../components/OuterCard";
import { MyButton } from "../../components/buttons/MyButton";
import { getTasksListUrl } from "../../utils/urls/task_urls";

const TasksTypesEditPage = () => {
	const { desk_id, task_type_id } = useParams();
	const navigate = useNavigate();

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);

	const [ color, setColor ] = useState(`#${searchParams.get("color")}`);
	const [ taskTypeData, setTaskData ] = useState({
		desk_id: desk_id,
		title: searchParams.get("title"),
		color: searchParams.get("color"),
	});

	const handleEditTask = () => {
		if (!taskTypeData.title) {
			ShowAlert.warning({message: "Ввдите название типа задачи"});
			return;
		};

		taskTypeData.color = color;

		taskTypesEditRequest(task_type_id, taskTypeData)
		.then(response => {
			if (response.status === 200) {
				return response.json();
			};
			ShowAlert.error({message: "Произошла неизвестаня ошибка"});
		})
		.then(data => {
			if (data.detail) {
				ShowAlert.error({message: data.detail});
				return;
			};
		})

		navigate(getTasksListUrl(desk_id));
	};

	const handleDeleteTask = () => {
		taskTypesDeleteRequest(task_type_id)
		.then(response => {
			if (response.status === 200) {
				ShowAlert.success({message: "Тип задачи удален"})
				navigate(getTasksListUrl(desk_id))
				return
			};
			ShowAlert.error({message: "Произошла неизвестаня ошибка"});
		})
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
			<h2 style={{ textAlign: 'center' }}>Редактирование типа задач</h2>
			<hr></hr>
			<Form>
				<Form.Group controlId="title" style={{marginTop: "10px"}} required>
					<Form.Label>Название</Form.Label>
					<Form.Control type="text" required value={taskTypeData.title} onChange={(e) => setTaskData({...taskTypeData, title: e.target.value})}/>
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
				<div style={{display: "flex", justifyContent: "space-between", marginTop: "20px"}}>
					<MyButton variant="success" type="button" style={{marginTop: "10px"}} onClick={handleEditTask} shadowColor="green">
						Сохранить
					</MyButton>
					<MyButton variant="danger" type="button" style={{marginTop: "10px", marginLeft: "10px"}} onClick={handleDeleteTask} shadowColor="red">
						Удалить
					</MyButton>
				</div>
			</Form>
		</OuterCard>
	);
};

export default TasksTypesEditPage;