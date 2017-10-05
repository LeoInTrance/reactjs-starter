const configs = () => {
	let _c = {};
	switch (process.env.NODE_ENV) {
		case 'development':
			_c.urlApi = 'http://localhost/api/';
			break;
		case 'homologation':
			_c.urlApi = '';
			break;
		case 'blue':
			_c.urlApi = '';
			break;
		case 'production':
			_c.urlApi = '';
			break;
	}
	return _c;
}

export const config = configs();