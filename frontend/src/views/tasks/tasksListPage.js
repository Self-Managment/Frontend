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

const TasksListPage = () => {
	const { desk_id } = useParams();
	const [columns, setColumns] = useState([]);

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
	});

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
			if (columnIndex === targetColumnIndex && !column.items.find(i => i.id === item.id)) {
				// Проверяем, что элемента нет уже в данной колонке
				return { ...column, items: [...column.items, item] };
			} else if (column.items.find(i => i.id === item.id)) {
				// Если элемент принадлежит другой колонке, удаляем его из текущей
				let targetColumn = columns[targetColumnIndex];
				tasksEditRequest(item.id, { type_id: targetColumn.id });
				return { ...column, items: column.items.filter(i => i.id !== item.id) };
			}
			return column;
		});

		setColumns(updatedColumns);
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div
				style={{ 
					display: 'flex', 
					justifyContent: columns.length !== 0 ? 'space-between' : 'flex-end', 
					margin: '0 20px'
				}}
			>
				<div>{columns.length !== 0 && <BucketComponent onDrop={handleDrop}/>}</div>

				<div>{columns.length !== 0 && <DropdownMenu />}</div>

				<div>
					{columns.length !== 0 && (
						<MyButton
							style={{marginRight: '5px'}}
							as={Link}
							to={getTasksCreateUrl(
								desk_id,
								`${encodeURIComponent(JSON.stringify(
									columns.map(({ id, title }) => ({ id, title }))
								))}`
							)}
							variant='success'
							shadowColor='green'
						>
							Создать задачу
						</MyButton>
					)}
					<MyButton 
						style={{ marginLeft: '5px' }} 
						as={Link} to={getTasksTypesCreateUrl(desk_id)} 
						variant='success' 
						shadowColor='green'
					>
						Создать тип задач
					</MyButton>
				</div>
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
