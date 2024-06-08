import { Request, BASE_URL_FINANCE, GET, POST } from "..";
import { MONEY } from "../../utils/urls/budget_urls";

export const BUDGET_BASE_URL = BASE_URL_FINANCE + MONEY + '/budget/';
export const OPERATION_BASE_URL = BASE_URL_FINANCE + MONEY + '/operation/'
export const OPERATION_HISTORY_BASE_URL = BASE_URL_FINANCE + MONEY + '/operation/history'
export const OPERATION_CATEGORY_BASE_URL = BASE_URL_FINANCE + MONEY + '/operation/category'
export const OPERATION_STATISTIC_BASE_URL = BASE_URL_FINANCE + MONEY + '/operation/statistic'
export const BANK_BASE_URL = BASE_URL_FINANCE + MONEY + '/bank/'

/**
 * Запрос на получение бюджета
 */
export const getBudgetRequest = () => {
	return Request.send({method: GET, url: BUDGET_BASE_URL});
};

/**
 * Запрос на создание операции бюджета
 * 
 * @param {map} data - {amount: int}
 */
export const createBudgetOperationRequst = (data) => {
	return Request.send({method: POST, url: OPERATION_BASE_URL, data: data});
};

/**
 * Запрос на получение списка операций
 */
export const getBudgetOperationRequst = ( filters ) => {
	return Request.send({method: GET, url: OPERATION_BASE_URL, params: filters});
};

/**
 * Запрос на получение истории операций
 */
export const getBudgetOperationHistoryRequst = ( filters ) => {
	return Request.send({method: GET, url: OPERATION_HISTORY_BASE_URL, params: filters});
};

/**
 * Запрос на получение причин операции бюджета
 * 
 */
export const getOperationCategoryRequest = () => {
	return Request.send({method: GET, url: OPERATION_CATEGORY_BASE_URL});
};

/**
 * Запрос на создание причины операции бюджета
 * 
 * @param {map} data - {title: string, color: string, operation_type: string}
 */
export const createOperationCategoryRequest = (data) => {
	return Request.send({method: POST, url: OPERATION_CATEGORY_BASE_URL, data: data});
};

/**
 * Запрос на получение статистики операций
 * 
 */
export const getOperationStatisticRequest = () => {
	return Request.send({method: GET, url: OPERATION_STATISTIC_BASE_URL});
};

/**
 * Запрос на создание банка
 * 
 * @param {map} data - {title: string, color: string}
 */
export const createBankRequest = (data) => {
	return Request.send({method: POST, url: BANK_BASE_URL, data: data});
};

/**
 * Запрос на получение причин операции бюджета
 * 
 */
export const getBankRequest = () => {
	return Request.send({method: GET, url: BANK_BASE_URL});
};
