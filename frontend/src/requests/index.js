import cookie from 'react-cookies'
import { ShowAlert } from '../utils/alerts_utils';

import { TOKEN_TYPE, TOKEN_NAME } from "../constants"

export const BASE_URL_TO_DO_LIST = 'http://localhost:8000/api';
export const BASE_URL_FINANCE = 'http://localhost:8080/api';

export const POST = 'POST';
export const GET = 'GET';
export const DELETE = 'DELETE';
export const PATCH = 'PATCH';

export class _Request {
	send({method, url, params={}, data={}}) {
		try {
			url = this.getFullUrl(url, params);
			let token = cookie.load(TOKEN_NAME);
			
			let response = fetch(url, {
				method: method,
				...(method === GET ? {} : { body: JSON.stringify(data) }),
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token !== undefined ? `${TOKEN_TYPE} ` + token : '',
				}
			});
			return response; 
		} catch (error) {
			ShowAlert.error({message: `Произошла неизвестная ошибка: \n ${error}`})
		}
	};

	paramsToString(params) {
		return new URLSearchParams(params).toString()
	};

	getFullUrl(url, params) {
		params = this.paramsToString(params)
		return url + `?${params}`
	};
};

export const Request = new _Request();
