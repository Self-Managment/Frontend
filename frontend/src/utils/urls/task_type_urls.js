import { DESKS } from "./desk_urls";

const _desk_id = ':desk_id';
const _task_type_id = ':task_type_id';

export const TasksTypesCreateRoutePath = DESKS +  `/${_desk_id}/task-type/create`
export const TasksTypesEditRoutePath = DESKS +  `/${_desk_id}/task-type/edit/${_task_type_id}`


export const getTasksTypesCreateUrl = (desk_id) => {
	return TasksTypesCreateRoutePath.replace(_desk_id, desk_id);
};

export const getTasksTypesEditUrl = (desk_id, task_type_id, title, color) => {
	return TasksTypesEditRoutePath.replace(_desk_id, desk_id).replace(_task_type_id, task_type_id)
	+ `?title=${title}&color=${color.slice(1, )}`;
};
