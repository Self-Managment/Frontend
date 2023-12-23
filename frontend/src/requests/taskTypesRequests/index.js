import { Request, BASE_URL_TO_DO_LIST, GET, POST, PATCH, DELETE } from "..";

export const TASK_TYPES_BASE_URL = BASE_URL_TO_DO_LIST + '/task_type/';
export const TASK_TYPES_CREATE_URL = TASK_TYPES_BASE_URL + 'create/';
export const TASK_TYPES_LIST_URL = TASK_TYPES_BASE_URL + 'list/';
export const TASK_TYPES_EDIT_URL = TASK_TYPES_BASE_URL + 'edit/';
export const TASK_TYPES_DELETE_URL = TASK_TYPES_BASE_URL + 'delete/';

/**
 * Запрос на создание типа задачи
 * @param {map} data - {desk_id: int, title: string, color: string}
 */
export const taskTypesCreateRequest = (data) => {
	return Request.send({method: POST, url: TASK_TYPES_CREATE_URL, data: data});
};

/**
 * Запрос на получение списка типов задач
 */
export const taskTypesListRequest = (desk_id) => {
	return Request.send({method: GET, url: TASK_TYPES_LIST_URL, params: {desk_id: desk_id}});
};

/**
 * Запрос на редактирование тип задач
 * @param {map} data - {title: string, color: string, sequence: int}
 */
export const taskTypesEditRequest = (task_type_id, data) => {
	return Request.send({method: PATCH, url: TASK_TYPES_EDIT_URL + `${task_type_id}/`, data: data});
};

/**
 * Запрос на получение списка типов задач
 */
export const taskTypesDeleteRequest = (task_type_id) => {
	return Request.send({method: DELETE, url: TASK_TYPES_DELETE_URL + `${task_type_id}/`});
};
