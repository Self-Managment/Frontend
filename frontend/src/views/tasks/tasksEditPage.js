import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ShowAlert } from '../../utils/alerts_utils';
import { tasksEditRequest } from '../../requests/tasksRequests';
import { tasksDeleteRequest } from '../../requests/tasksRequests';
import { OuterCard } from '../../components/OuterCard';
import { getTasksListUrl } from '../../utils/urls/task_urls';
import { MyButton } from '../../components/buttons/MyButton';

const TasksEditPage = () => {
	const { desk_id, task_id } = useParams();
	const navigate = useNavigate();

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);

	const [taskData, setTaskData] = useState({
		title: searchParams.get('title'),
		description: searchParams.get('description'),
		date_to: searchParams.get('date_to'),
	});

	const handleEditTask = () => {
		if (!taskData.title) {
			ShowAlert.warning({ message: 'Ввдите название задачи' });
			return;
		};
		tasksEditRequest(task_id, taskData)
		.then(response => {
			if (response.status === 200) {
				return response.json()
			}
			else ShowAlert.error({ message: 'Произошла неизвестная ошибка' });
		})
		.then(data => {
			if (data.detail) {
				ShowAlert.error({ message: data.detail });
				return;
			};
			navigate(getTasksListUrl(desk_id));
		});
	};

	const handleDeleteTask = () => {
		tasksDeleteRequest(task_id)
		.then(response => {
			if (response.status === 200) return response.json();
			else ShowAlert.error({ message: 'Произошла неизвестная ошибка' });
		})
		.then(data => {
			if (data.detail) {
				ShowAlert.error({ message: data.detail });
				return;
			};
		});
		navigate(getTasksListUrl(desk_id));
	};

	return (
		<OuterCard selfStyle={{
			width: '300px',
			margin: '20px auto',
		}}>
			<h2 style={{ textAlign: 'center' }}>Просмотр задачи</h2>
			<hr></hr>
			<Form>
				<Form.Group controlId='title' style={{ marginTop: '10px' }} required>
					<Form.Label>Название</Form.Label>
					<Form.Control type='text' required value={taskData.title} onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} />
				</Form.Group>

				<Form.Group controlId='dateTo' style={{ marginTop: '10px' }}>
					<Form.Label>На какую дату</Form.Label>
					<Form.Control type='datetime-local' value={taskData.date_to} onChange={(e) => setTaskData({ ...taskData, date_to: e.target.value })} />
				</Form.Group>

				<Form.Group controlId='description' style={{ marginTop: '10px' }}>
					<Form.Label>Описание</Form.Label>
					<Form.Control as='textarea' rows={3} value={taskData.description} onChange={(e) => setTaskData({ ...taskData, description: e.target.value })} />
				</Form.Group>

				<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
					<MyButton variant='success' type='button' onClick={handleEditTask} shadowColor='green'>
						Сохранить
					</MyButton>
					<MyButton variant='danger' type='button' onClick={handleDeleteTask} shadowColor='red'>
						Удалить
					</MyButton>
				</div>
			</Form>
		</OuterCard>
	);
};

export default TasksEditPage;
