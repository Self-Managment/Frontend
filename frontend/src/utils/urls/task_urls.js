import { DESKS } from "./desk_urls"

const _desk_id = ':desk_id';
const _task_id = ':task_id';

export const TasksListRoutePath = DESKS + `/${_desk_id}/tasks`
export const TasksCreateRoutePath = DESKS + `/${_desk_id}/tasks/create`
export const TasksEditRoutePath = DESKS + `/${_desk_id}/tasks/${_task_id}`

export const getTasksListUrl = (desk_id) => {
	return TasksListRoutePath.replace(_desk_id, desk_id);
};

export const getTasksCreateUrl = (desk_id, types) => {
	return TasksCreateRoutePath.replace(_desk_id, desk_id) + `?types=${types}`;
};

export const getTasksEditUrl = (desk_id, task_id, title, description, date_to, created_at) => {
	return TasksEditRoutePath.replace(_desk_id, desk_id).replace(_task_id, task_id) 
	+ `?title=${title}&description=${description}&date_to=${date_to}&created_at=${created_at}`;
};
