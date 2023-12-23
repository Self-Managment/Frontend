import React from 'react';
import { useDrag } from 'react-dnd';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CARD_LINK_HEX_COLOR } from '../../constants';
import { getTasksEditUrl } from '../../utils/urls/task_urls';

export const TaskComponent = ({ id, desk_id, title, description, date_to, created_at }) => {
	const [{ isDragging }, drag] = useDrag({
		type: 'item',
		item: { id, title },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});

	return (
		<Card ref={drag}
			style={{ 
				maxWidth: '100%',
				marginBottom: '10px',
				cursor: 'grab',
				boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
				opacity: isDragging ? 0 : 1
			}}
		>
			<Card.Body>
				<Card.Title>
					<Card.Link 
						className='small'
						style={{ color: CARD_LINK_HEX_COLOR, textDecoration: 'none' }}
						as={Link} 
						to={getTasksEditUrl(desk_id, id, title, description, date_to, created_at)} 
					>
						{`${title}`}
					</Card.Link>
				</Card.Title>
				<span className='text-muted small'>
					{moment(created_at).format('DD.MM.YYYY')}
				</span>
			</Card.Body>
		</Card>
	);
};