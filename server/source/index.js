import request from 'request';
import React from "react";
import { StaticRouter as Router, matchPath } from 'react-router';
import { Provider } from 'react-redux';
import { renderToString } from "react-dom/server";
import Helm from 'react-helmet';
import Layout from "../../client/App/layout";
import configureStore from "../../client/App/store";
import Routes from "../../client/App/routers";
import routes from "../../client/routes";

var _date = null;

export default (req, res) => {
	const match = routes.reduce((acc, route) => matchPath(req.url, route, { exact: true }) || acc, null);
	const store = configureStore();
	const context = {};
	const body = (
		<Provider store={store}>
			<Router
				location={req.url}
				context={context}>
				<Layout />
			</Router>
		</Provider>
	);

	let now = new Date();
	_date = _date ? _date : now.getFullYear().toString() + (now.getMonth() + 1).toString() + now.getDate().toString() + '-' + now.getHours().toString() + now.getMinutes().toString();

	const html = ({ body, head, initialState }) => {
		return `<!DOCTYPE html>
			<html lang="pt-br">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<meta http-equiv="X-UA-Compatible" content="ie=edge">
					${head.title.toString()}
					${head.meta.toString()}
					${head.link.toString()}
					${head.script.toString()}
					${process.env.NODE_ENV !== "development" ? `
					<link rel="stylesheet" href="/stylesheets/style.css?t=` + _date + `" />
					` : `
					<link rel="stylesheet" href="http://localhost:8081/style.css?t=` + _date + `" />
					`}
				</head>
				<body>
					<div id="root"><div>${body}</div></div>
					<script type="text/javascript">window.INITIAL_STATE = ${JSON.stringify(initialState)};</script>
					${process.env.NODE_ENV !== "development" ? `
					<script async src="/javascripts/bundle.js?t=` + _date + `"></script>
					` : `
					<script async src="http://localhost:8081/bundle.js?t=` + _date + `"></script>
					`}
				</body>
			</html>`;
	};

	const render = (output, helm, state) => {
		return html({
			body: output,
			head: helm.rewind(),
			initialState: state
		})
	}

	store.renderUniversal(renderToString, body)
		.then(({ output }) => {
			const state = store.getState();
			if (match) {
				res.status(200).send(render(output, Helm, state));
			} else {
				res.status(404).send(render(output, Helm, state));
			}
		})
		.catch(({ output, error }) => {
			console.warn(error);
			const state = store.getState();
			res.status(500).send(render(output, Helm, state));
		})
};