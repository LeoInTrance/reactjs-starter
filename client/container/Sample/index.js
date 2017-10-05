import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";

import { fetchSample } from './../../ducks/sample';

class Sample extends Component {
	constructor() {
		super();
	}

	// componentWillMount() {
	// 	if (!this.props.samples.fetched) {
	// 		this.props.dispatch(fetchSample())
	// 	}
	// }

	render() {
		return (
			<div>
				<h1>Reactjs Starter</h1>
				{/* {
					this.props.samples.fetched ?
						this.props.samples.result.map((_item) => {
							return <p key={_item.id}>marca = {_item.name}</p>
						})
						: 'caraa'
				} */}
			</div>
		);
	}
}

export default connect((store) => {
	return {
		samples: store.sampleState,
	};
})(Sample);
