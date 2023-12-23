import { Request, BASE_URL_TO_DO_LIST, GET, PATCH, POST, DELETE } from "..";

export const TASKS_BASE_URL = BASE_URL_TO_DO_LIST + '/task/';
export const TASKS_CREATE_URL = TASKS_BASE_URL + 'create/';
export const TASKS_LIST_URL = TASKS_BASE_URL + 'list/';
export const TASKS_EDIT_URL = TASKS_BASE_URL + 'edit/';
export const TASKS_DELETE_URL = TASKS_BASE_URL + 'delete/';


/**
 * Запрос на создание задачи
 * @param {map} data - {desk_id: int, title: string, type_id: int, date_to: string, description: string}
 */
export const tasksCreateRequest = (desk_id, data) => {
	return Request.send({method: POST, url: TASKS_CREATE_URL, params: {desk_id: desk_id}, data: data});
};

/**
 * Запрос на получение списка задач
 */
export const tasksListRequest = (desk_id) => {
	return Request.send({method: GET, url: TASKS_LIST_URL, params: {desk_id: desk_id},});
};

/**
 * Запрос на изменение задачи
 * @param {map} data - {title: string, type_id: int, date_to: string, description: string}
 */
export const tasksEditRequest = (task_id, data) => {
	return Request.send({method: PATCH, url: TASKS_EDIT_URL + `${task_id}/`, data: data});
};

/**
 * Запрос на удаление задачи
 */
export const tasksDeleteRequest = (task_id) => {
	return Request.send({method: DELETE, url: TASKS_DELETE_URL + `${task_id}/`});
};
