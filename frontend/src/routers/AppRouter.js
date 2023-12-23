import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PageTemplate from '../views/index';

import AuthenticationPage from '../views/authentication/authenticationPage';

import DesksListPage from '../views/desks/desksListPage';
import DesksCreatePage from '../views/desks/desksCreatePage'
import DesksEditPage from '../views/desks/desksEditPage';

import TasksListPage from '../views/tasks/tasksListPage';
import TasksCreatePage from '../views/tasks/tasksCreatePage';
import TasksEditPage from '../views/tasks/tasksEditPage';

import TasksTypesCreatePage from '../views/tasksTypes.js/taskTypesCreatePage';
import TasksTypesEditPage from '../views/tasksTypes.js/taskTypesEditPage';

import { DesksListRoutePath, DesksCreateRoutePath, DesksEditRoutePath } from '../utils/urls/desk_urls';
import { TasksListRoutePath, TasksCreateRoutePath, TasksEditRoutePath } from '../utils/urls/task_urls';
import { TasksTypesCreateRoutePath, TasksTypesEditRoutePath } from '../utils/urls/task_type_urls';

export const AuthenticationRoutePath = '/authentication';

export const DefaultPage = DesksListPage;

const AppRouter = () => {
	return (
		<Router>
			<Routes>
				<Route path="*" element={
					<PageTemplate >
					<DefaultPage />
					</PageTemplate>
				} />

				<Route path={AuthenticationRoutePath} element={
					<PageTemplate show_navbar={false} check_token={false} >
					<AuthenticationPage />
					</PageTemplate>
				} />

				<Route path={DesksListRoutePath} element={
					<PageTemplate>
					<DesksListPage />
					</PageTemplate>
				} />

				<Route path={DesksCreateRoutePath} element={
					<PageTemplate>
					<DesksCreatePage />
					</PageTemplate>
				} />

				<Route path={DesksEditRoutePath} element={
					<PageTemplate>
					<DesksEditPage />
					</PageTemplate>
				} />

				<Route path={TasksListRoutePath} element={
					<PageTemplate>
					<TasksListPage />
					</PageTemplate>
				} />

				<Route path={TasksCreateRoutePath} element={
					<PageTemplate>
					<TasksCreatePage />
					</PageTemplate>
				} />

				<Route path={TasksEditRoutePath} element={
					<PageTemplate>
					<TasksEditPage />
					</PageTemplate>
				} />

				<Route path={TasksTypesCreateRoutePath} element={
					<PageTemplate>
					<TasksTypesCreatePage />
					</PageTemplate>
				} />

				<Route path={TasksTypesEditRoutePath} element={
					<PageTemplate>
					<TasksTypesEditPage />
					</PageTemplate>
				} />
			</Routes>
		</Router>
	);
};

export default AppRouter;
