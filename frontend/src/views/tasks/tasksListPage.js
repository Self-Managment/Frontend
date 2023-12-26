import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TaskTypeComponent } from '../../components/tasksTypes/taskTypeComponent';
import { taskTypesListRequest } from '../../requests/taskTypesRequests';
import { tasksListRequest, tasksEditRequest, tasksDeleteRequest } from '../../requests/tasksRequests';
import { taskTypesEditRequest } from '../../requests/taskTypesRequests';
import { ShowAlert } from '../../utils/alerts_utils';
import { Link } from 'react-router-dom';
import { BucketComponent } from '../../components/tasksTypes/taskTypeComponent';
import { getTasksCreateUrl } from '../../utils/urls/task_urls';
import { getTasksTypesCreateUrl } from '../../utils/urls/task_type_urls';
import { MyButton } from '../../components/buttons/MyButton';
import DropdownMenu from '../../components/tasks/dropdownMenu';
import './style.css';

import { Col, Row } from 'react-bootstrap';

const TasksListPage = () => {
	const { desk_id } = useParams();
	const [ columns, setColumns ] = useState([]);

	useEffect(() => {
		Promise.all([tasksListRequest(desk_id), taskTypesListRequest(desk_id)])
		.then(([tasksResponse, taskTypesResponse]) => {
			if (tasksResponse.status === 200 && taskTypesResponse.status === 200) {
				return Promise.all([tasksResponse.json(), taskTypesResponse.json()]);
			}
		})
		.then(([tasksData, taskTypesData]) => {
			const updatedColumns = taskTypesData.map(item => {
				item.items = tasksData.filter(task => item.id === task.type_id);
				return item;
			});

			setColumns(updatedColumns);
		})
		.catch(error => {
			ShowAlert.error({ message: 'Произошла неизвестная ошибка. Провертье консоль.' });
			console.error('Error fetching data:', error);
		});
	}, [desk_id]);

	const handleDrop = (item, targetColumnIndex) => {
		if (targetColumnIndex === 'bucket') {
			tasksDeleteRequest(item.id)
			.then(response => {
				if (response.status === 200) {
					const _updatedColumns = columns.map((column) => {
						return { ...column, items: column.items.filter(i => i.id !== item.id) };
					});
					setColumns(_updatedColumns);
				}
			});
			return;
		}
		// Меняем колонки местами
		if (item.columnIndex !== undefined && targetColumnIndex !== item.columnIndex) {      
			let updatedColumns = [...columns];
			let task_type_1 = updatedColumns[item.columnIndex];
			let task_type_2 = updatedColumns[targetColumnIndex];
			[task_type_1.sequence, task_type_2.sequence] = [task_type_2.sequence, task_type_1.sequence];
			
			taskTypesEditRequest(task_type_1.id, task_type_1);
			taskTypesEditRequest(task_type_2.id, task_type_2);

			[updatedColumns[item.columnIndex], updatedColumns[targetColumnIndex]] = [updatedColumns[targetColumnIndex], updatedColumns[item.columnIndex]];
			setColumns(updatedColumns);
			return;
		}
		if (item.columnIndex !== undefined) {return};

		const updatedColumns = columns.map((column, columnIndex) => {
			if (columnIndex === targetColumnIndex) {
				if (!column.items.find(i => i.id === item.id)) {
					// Проверяем, что элемента нет уже в данной колонке
					return { ...column, items: [...column.items, item] };
				};
			} else if (column.items.find(i => i.id === item.id)) {
				// Если элемент принадлежит другой колонке, удаляем его из текущей
				let targetColumn = columns[targetColumnIndex];
				//if (item in targetColumn)
				tasksEditRequest(item.id, { type_id: targetColumn.id });
				return { ...column, items: column.items.filter(i => i.id !== item.id) };
			}
			return column;
		});

		setColumns(updatedColumns);
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="m-3">
				<Row>
					<Col xs={12} md={4}>
						{columns.length !== 0 && <BucketComponent onDrop={handleDrop} />}
					</Col>
					<Col xs={12} md={4} style={{marginTop: '7px'}} />
					<Col xs={12} md={4}>
						<div className="d-flex justify-content-end">
							{columns.length !== 0 && (
							<MyButton
								style={{ marginRight: '10px' }}
								as={Link}
								to={getTasksCreateUrl(
								desk_id,
								`${encodeURIComponent(JSON.stringify(columns.map(({ id, title }) => ({ id, title }))))}`
								)}
								variant="success"
								className="mr-2"
								shadowColor="green"
							>
								Создать задачу
							</MyButton>
							)}
							<MyButton
								as={Link}
								to={getTasksTypesCreateUrl(desk_id)}
								variant="success"
								className="mr-2"
								shadowColor="green"
							>
								Создать тип задач
							</MyButton>
						</div>
					</Col>
				</Row>
			</div>

			<div className='scroll-container'>
				{columns.length !== 0 ?
					<div 
						className='columns-container'
						style={{
							display: 'flex',
							overflowX: 'auto',
							padding: '20px',
							minHeight: '83vh',
						}}
					>
						{columns.map((column, index) => (
							<div
								key={index}
								style={{ flex: '0 0 200px', marginRight: '20px', }}
							>
								<TaskTypeComponent
									id={column.id}
									title={column.title}
									items={column.items}
									columnIndex={index}
									color={column.color}
									onDrop={handleDrop}
								/>
							</div>
						))}
					</div> :
					<div style={{ textAlign: 'center', margin: '15%' }}>
						<h2>Создайте тип задачи</h2>
					</div>
				}
			</div>
		</DndProvider>
	);
};

export default TasksListPage;
