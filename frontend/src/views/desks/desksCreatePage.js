import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { desksCreateRequest } from '../../requests/desksRequests';
import { ShowAlert } from '../../utils/alerts_utils';
import { DesksListRoutePath } from '../../utils/urls/desk_urls';
import { OuterCard } from '../../components/OuterCard';
import { MyButton } from '../../components/buttons/MyButton';

const DesksCreatePage = () => {
	const [title, setTitle] = useState('');
	const navigate = useNavigate();

	const handleCreateDesk = () => {
		if (!title) {
			ShowAlert.warning({ message: 'Введите название доски' });
			return;
		}
		desksCreateRequest({ title: title })
			.then((response) => {
				if (response.status === 201) {
					navigate(DesksListRoutePath);
					return response.json();
				};
			})
			.then((data) => {
				if (data.detail) {
					ShowAlert.warning({ message: data.detail });
					return;
				}
		});
	};

	return (
		<OuterCard selfStyle={{width: '300px',}}>
			<h2 style={{ textAlign: 'center' }}>Создание доски</h2>
			<hr></hr>
			<Form>
				<Form.Group controlId="formBoardTitle">
					<Form.Label>Название</Form.Label>
					<Form.Control
						type="text"
						placeholder="Введите название доски"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</Form.Group>

				<MyButton
					style={{ width: '100%', marginTop: '20px' }}
					variant="success"
					type="button"
					onClick={handleCreateDesk}
					shadowColor="green"
				>
					Создать доску
				</MyButton>
			</Form>
		</OuterCard>
	);
};

export default DesksCreatePage;
