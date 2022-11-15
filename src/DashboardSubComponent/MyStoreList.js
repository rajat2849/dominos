import React from 'react';
import { Row, Col, Form } from 'reactstrap';
import {Field, reduxForm } from 'redux-form';
import './StoreList.scss'

class MyStoreList extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<Row>
				<div className='col-12'>
					<div className='md-form'>
						<Field className='form-control h-75' name="Store" component="select" required>
							{this.props.storeList.map((list, i) => {
							return (
							<option value={list.store_title_en} key={i} >{list.store_title_en}</option>
							);
						})}
						</Field>
						<label>Select store</label>
					</div>
				</div>
			</Row>
		)
	}
}

export default MyStoreList;
