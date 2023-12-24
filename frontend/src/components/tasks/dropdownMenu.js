import React, { useState } from 'react';
import { OuterCard } from '../OuterCard';
import { MyButton } from '../buttons/MyButton';

const CheckboxDropdown = ({columns, setColumns}) => {
	const [ filters, setFilters] = useState([
		{title: 'На сегодня', selected: false}, 
		{title: 'Скрытые', selected: false}
	]);
	const [ isShowWinow, setIsShowWindow ] = useState(false);
	
	const handleShow = () => {
		setIsShowWindow(!isShowWinow)
		console.log(!isShowWinow)
	};

	const handleSelect = (itemIndex) => {
		const updatedFilters = [...filters];
		//const filter = updatedFilters[itemIndex];
		updatedFilters[itemIndex].selected = !updatedFilters[itemIndex].selected;
		setFilters(updatedFilters);
	}

	return (
		<div style={{display: 'flex', justifyContent: 'center'}}>
			{isShowWinow ?
				<OuterCard 
					selfStyle={{
						width: '300px',
						zIndex: 1000,
						position: 'absolute',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					{
						filters.length !== 0 &&
						filters.map((item, index) => {
							return <div style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0, 0, 0, 0.2)'}}>
								<span>{item.title}</span>
								<input type='checkbox' onClick={() => handleSelect(index)} checked={item.selected}></input>
							</div>
						})
					}
					<div style={{ marginTop: '20px' }}>
						<MyButton style={{width: '100%',}} variant='danger' type='button' onClick={handleShow} shadowColor='red'>
							Скрыть
						</MyButton>
					</div>
				</OuterCard> :
				<MyButton shadowColor='blue' onClick={handleShow}>
					Фильтры
				</MyButton>
			}
		</div>
	);
};

export default CheckboxDropdown;
