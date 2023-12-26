import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { tasksCreateRequest } from '../../requests/tasksRequests';
import { ShowAlert } from '../../utils/alerts_utils';
import { OuterCard } from '../../components/OuterCard';
import { getTasksListUrl } from '../../utils/urls/task_urls';
import { MyButton } from '../../components/buttons/MyButton';

const TasksCreatePage = () => {
	const { desk_id } = useParams();
	const navigate = useNavigate();

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const taskTypes = JSON.parse(decodeURIComponent(searchParams.get('types')));

	const [taskData, setTaskData] = useState({
		title: '',
		type_id: taskTypes[0].id,
		description: '',
	});

	const handleCreateTask = () => {
		if (!taskData.title) {
			ShowAlert.warning({ message: 'Ввдите название задачи' });
			return;
		}
		tasksCreateRequest(desk_id, taskData)
			.then(response => {
				if (response.status === 201) return response.json();
				else ShowAlert.error({ message: 'Произошла неизвестная ошибка' });
			})
			.then(data => {
				if (data.detail) {
					ShowAlert.warning({ message: data.detail });
					return;
				};
				navigate(getTasksListUrl(desk_id));
			});
	};

	return (
		<OuterCard selfStyle={{ width: '300px', margin: '20px auto',}}>
			<h2 style={{ textAlign: 'center' }}>Создание задачи</h2>
			<hr></hr>
			<Form>
				<Form.Group controlId='title' style={{ marginTop: '10px' }} required>
					<Form.Label>Название</Form.Label>
					<Form.Control type='text' required onChange={(e) => setTaskData({ ...taskData, title: e.target.value })} />
				</Form.Group>

				<Form.Group controlId='dateTo' style={{ marginTop: '10px' }}>
					<Form.Label>На какую дату</Form.Label>
					<Form.Control type='datetime-local' onChange={(e) => setTaskData({ ...taskData, date_to: e.target.value })} />
				</Form.Group>

				<Form.Group controlId='typeId' style={{ marginTop: '10px' }}>
					<Form.Label>Тип задачи</Form.Label>
					<Form.Select onChange={(e) => setTaskData({ ...taskData, type_id: e.target.value })}>
						{taskTypes.map((taskType) => (
							<option key={taskType.id} value={taskType.id}>
								{taskType.title}
							</option>
						))}
					</Form.Select>
				</Form.Group>

				<Form.Group style={{ marginTop: '10px' }} controlId='description'>
					<Form.Label>Описание</Form.Label>
					<Form.Control as='textarea' rows={3} onChange={(e) => setTaskData({ ...taskData, description: e.target.value })} />
				</Form.Group>

				<MyButton style={{ width: '100%', marginTop: '20px' }} variant='success' type='button' onClick={handleCreateTask} shadowColor='green'>
					Создать
				</MyButton>
			</Form>
		</OuterCard>
	);
};

export default TasksCreatePage;
