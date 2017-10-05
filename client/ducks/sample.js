import axios from 'axios';
import Immutable from 'immutee';

import { config } from './../../config/config.js';

export const FETCH_SAMPLE = 'fipe/sample/FETCH_SAMPLE';
export const FETCH_SAMPLE_FAILURE = 'fipe/sample/FETCH_SAMPLE_FAILURE';

const initialState = {
	fetched: false,
	result: [],
	error: null
};

export default function reducer(state = initialState, action) {
	const immutable = Immutable(state);
	switch (action.type) {
		case FETCH_SAMPLE:
			return immutable
				.set('result', action.payload)
				.set('fetched', true)
				.done();

		case FETCH_SAMPLE_FAILURE:
			return immutable
				.set('error', action.payload)
				.set('result', [])
				.set('fetched', false)
				.done();

		default:
			return state;
	}
}

export function fetchSample() {
	return (dispatch) => {
		return axios.get(config.urlApi + 'vehicle/list/brands/?vehicleType=car')
			.then((res) => {
				dispatch({
					type: FETCH_SAMPLE,
					payload: res.data.Result
				});
			}).catch((err) => {
				dispatch({
					type: FETCH_SAMPLE_FAILURE,
					payload: err.stack
				})
			});
	}
}
