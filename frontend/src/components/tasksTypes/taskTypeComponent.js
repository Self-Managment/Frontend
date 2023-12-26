import React from 'react';
import { useParams } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { TaskComponent } from '../tasks/taskComponents';
import { CARD_LINK_HEX_COLOR } from '../../constants';
import { getTasksTypesEditUrl } from '../../utils/urls/task_type_urls';

const DraggableTypes = {
	ITEM: 'item',
	COLUMN: 'column',
	BUCKET: 'bucket',
};

export const TaskTypeComponent = ({ id, title, items, columnIndex, onDrop, color }) => {
	const { desk_id } = useParams();

	const [{ isOver, canDrop }, drop] = useDrop({
		accept: [DraggableTypes.ITEM, DraggableTypes.COLUMN],
		drop: (item) => onDrop(item, columnIndex),
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

	const [{ isDragging }, drag] = useDrag({
		type: DraggableTypes.COLUMN,
		item: { columnIndex },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	return (
		<Card
			style={{
				cursor: 'move',
				height: '100%',
				padding: '10px',
				border: `1px solid ${color}`,
				borderRadius: '10px',
				backgroundColor: (isOver && canDrop) ? `${color}` : 'white',
				boxShadow: `0 0 10px ${color}`,
				opacity: (isOver && canDrop) ? 0.5 : 1,
			}}	
			ref={(node) => drag(drop(node))}
			hidden={isDragging ? true : false}
		>
			<div style={{ textAlign: 'center' }}>
				<Link 
					style={{ color: CARD_LINK_HEX_COLOR, textDecoration: 'none' }}
					to={getTasksTypesEditUrl(desk_id, id, title, color)} 
				>
					<span><b>{title}</b></span>
				</Link>
			</div>
			<hr />
			{items.map((item) => (
				<TaskComponent key={item.id} {...{ ...item, desk_id: desk_id }} />
			))}
		</Card>
	);
};


export const BucketComponent = ({ onDrop }) => {
	const [{ isOver, canDrop }, drop] = useDrop({
		accept: [DraggableTypes.ITEM],
		drop: (item) => onDrop(item, DraggableTypes.BUCKET),
		collect: (monitor) => ({
			isOver: !!monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

	const [{}, drag] = useDrag({
		type: DraggableTypes.COLUMN,
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
		canDrag: false,
	});

	return (
		<div ref={(node) => drag(drop(node))}>
			<Button
				variant="danger" 
				className={`${!isOver ? 'disabled' : ''} mr-2`}
				style={{
					boxShadow: isOver ? '0 0 8px red' : (canDrop ? '0 0 4px red' : ''), 
					opacity: isOver ? 1 : (canDrop ? 0.5 : 0.3), 
					transition: '0.2s ease-in-out',
					width: '200px'
				}}
			>
				Удалить
			</Button>
		</div>
	);
};
