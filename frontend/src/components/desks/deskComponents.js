import React, { useState } from 'react';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';
import { CARD_LINK_HEX_COLOR } from '../../constants';
import { getDesksEditUrl } from '../../utils/urls/desk_urls';
import { getTasksListUrl } from '../../utils/urls/task_urls';

export const DeskComponent = ({ id, title, created_at }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Card style={{ 
			width: '300px', 
			margin: '10px', 
			boxShadow: isHovered ? '0 16px 32px rgba(0, 150, 0, 0.2)' : '0 8px 16px rgba(0, 0, 0, 0.1)',
			transition: 'box-shadow 0.3s ease-in-out',
		}}
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}
		>
			<Card.Body>
				<div style={{ display: 'flex', justifyContent: 'space-between', }}>
					<Card.Link style={{ color: CARD_LINK_HEX_COLOR, textDecoration: 'none' }} as={Link} to={getTasksListUrl(id)}>
						<Card.Title>{title}</Card.Title>
					</Card.Link>

					<Card.Link as={Link} to={getDesksEditUrl(id, title)}>
						<FaCog style={{color: 'gray', fontSize: 'large'}}/>
					</Card.Link>
				</div>
				<span className='text-muted small'>
					{moment(created_at).format('DD.MM.YYYY')}
				</span>
			</Card.Body>
		</Card>
	);
};
