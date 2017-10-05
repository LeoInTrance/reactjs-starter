import React, { Component } from 'react';
import { connect } from 'react-redux';
import root from 'window-or-global';
import { Helmet } from "react-helmet";

import { checkViewport } from './../../ducks/main';
import main from './../../scss/main.scss';

class Main extends Component {
	constructor() {
		super();
		this.state = { isMobile: false };
	}
	componentWillMount() {
		this.props.dispatch(checkViewport(Math.max(root.innerWidth)))
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ isMobile: nextProps.mainState.isMobile });
	}
	render() {
		return (
			<div className={'app'}>
				<Helmet>
					<title>ReactJS Starter</title>
				</Helmet>
				{this.props.children}
			</div>
		);
	}
}

export default connect((store) => {
	return { mainState: store.mainState };
})(Main);
