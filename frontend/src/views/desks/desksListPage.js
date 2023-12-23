import React, { useEffect, useState } from "react";
import { DeskComponent } from "../../components/desks/deskComponents";
import { desksListRequest } from "../../requests/desksRequests";
import { DesksCreateRoutePath } from "../../utils/urls/desk_urls";
import { ShowAlert } from "../../utils/alerts_utils";
import { Link } from "react-router-dom";
import { OuterCard } from "../../components/OuterCard";
import { MyButton } from "../../components/buttons/MyButton";


const DesksListPage = () => {
	const [boards, setBoards] = useState([]);

	useEffect(() => {
		desksListRequest()
		.then(response => {return response.json()})
		.then(data => {
			if (data.detail) {
				ShowAlert.warning({message: data.detail});
				return;
			};

			setBoards(data);
		});
	}, []);

	return (
		<OuterCard 
			selfStyle={{
				display: 'flex',
				alignItems: 'center',
				width: '80%',
			}}
		>
			<div>
				<div style={{ textAlign: 'center', }}>
					<h2>Информация о досках</h2>
					<p>Всего досок: {boards.length}</p>
				</div>
				<hr/>

				<div style={{ display: 'flex', justifyContent: 'center',  }}>
					<MyButton 
						as={Link} 
						to={DesksCreateRoutePath} 
						variant="success"
						shadowColor="green"
					>
					Создать доску
					</MyButton>
				</div>

				<div style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', }}>
					{boards.map(board => (
						<DeskComponent
							key={board.id}
							id={board.id}
							title={board.title}
							created_at={board.created_at}
							updated_at={board.updated_at}
						/>
					))}
				</div>
			</div>
		</OuterCard>
	);
};

export default DesksListPage;