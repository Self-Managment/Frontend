import { Request, BASE_URL_TO_DO_LIST, GET, POST, DELETE, PATCH } from "..";

export const DESKS_BASE_URL = BASE_URL_TO_DO_LIST + '/desk/'
export const DESKS_LIST = DESKS_BASE_URL + 'list/'
export const DESKS_CREATE = DESKS_BASE_URL + 'create/'
export const DESKS_EDIT = DESKS_BASE_URL + 'edit/'
export const DESKS_DELETE = DESKS_BASE_URL + 'delete/'


/**
 * Запрос на получение списка досок
 */
export const desksListRequest = () => {
	return Request.send({method: GET, url: DESKS_LIST});
};

/**
 * Запрос на создание доски
 * @param {map} data - {title: string}
 */
export const desksCreateRequest = (data) => {
	return Request.send({method: POST, url: DESKS_CREATE, data: data});
};

/**
 * Запрос на изменение доски
 * @param {int} desk_id - ID доски
 * @param {map} data - {id: int, title: string}
 */
export const desksEditRequest = (desk_id, data) => {
	return Request.send({method: PATCH, url: DESKS_EDIT, params: {desk_id: desk_id}, data: data});
};

/**
 * Запрос на удаление доски
 * @param {int} desk_id - ID доски
 */
export const desksDeleteRequest = (desk_id) => {
	return Request.send({method: DELETE, url: DESKS_DELETE, params: {desk_id: desk_id}});
};
