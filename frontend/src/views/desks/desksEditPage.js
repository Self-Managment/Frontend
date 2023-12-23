import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ShowAlert } from '../../utils/alerts_utils';
import { desksEditRequest, desksDeleteRequest } from '../../requests/desksRequests';
import { DesksListRoutePath } from '../../utils/urls/desk_urls';
import { OuterCard } from '../../components/OuterCard';
import { MyButton } from '../../components/buttons/MyButton';

const DesksEditPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { desk_id } = useParams();
	const searchParams = new URLSearchParams(location.search);

	const title = searchParams.get('title');
	const [deskData, setBoardData] = useState({ title: title });

	const handleEdit = () => {
		if (!deskData.title) {
			ShowAlert.warning({ message: 'Введите название доски' });
			return;
		}
		desksEditRequest(desk_id, deskData).then((response) => {
			if (response.status === 200) {
				navigate(DesksListRoutePath);
				return;
			};
			let data = response.json();
			if (data.detail) {
				ShowAlert.error({ message: data.detail });
			};
		});
	};

	const handleDelete = () => {
		desksDeleteRequest(desk_id).then((response) => {
			if (response.status === 200) {
				navigate(DesksListRoutePath);
				return;
			}
			let data = response.json();
			if (data.detail) {
				ShowAlert.error({ message: data.detail });
			}
		});
	};

	return (
		<OuterCard selfStyle={{width: '400px'}}>
			<h2 style={{ textAlign: 'center' }}>Редактирование доски</h2>
			<hr />
			<Form>
				<Form.Group controlId='formBoardTitle'>
					<Form.Label>Название доски</Form.Label>
					<Form.Control
						type='text'
						placeholder='Введите новое название доски'
						value={deskData.title}
						onChange={(e) => setBoardData({ ...deskData, title: e.target.value })}
						required
					/>
				</Form.Group>

				<div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
					<MyButton variant='success' type='button' onClick={handleEdit} shadowColor='green'>
						Сохранить
					</MyButton>
					<MyButton variant='danger' type='button' onClick={handleDelete} shadowColor='red'>
						Удалить
					</MyButton>
				</div>
			</Form>
		</OuterCard>
	);
};

export default DesksEditPage;
