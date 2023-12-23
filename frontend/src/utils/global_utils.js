import cookie from 'react-cookies'
import { THEME_NAME } from "../constants";

export const getTheme = () => {
	let theme = cookie.load(THEME_NAME);
	return theme !== undefined ? theme : false;
};
