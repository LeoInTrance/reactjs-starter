import Immutable from 'immutee';

export const CHECK_VIEWPORT = 'fipe/main/CHECK_VIEWPORT';

const initialState = {
	isMobile: false
};

export default function reducer(state = initialState, action) {
	const immutable = Immutable(state);
	switch (action.type) {
		case CHECK_VIEWPORT:
			return immutable
				.set('isMobile', action.isMobile)
				.done();
		default:
			return state;
	}
}

export function checkViewport(width) {
	if (width > 780) {
		return {
			type: CHECK_VIEWPORT,
			isMobile: false
		};
	} else {
		return {
			type: CHECK_VIEWPORT,
			isMobile: true
		};
	}
}