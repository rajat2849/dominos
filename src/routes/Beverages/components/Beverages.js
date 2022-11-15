import React from 'react'
import {browserHistory} from 'react-router'
import {Url} from 'config/Config';
import Loader from '../../../components/Loader';

export default class Sides extends React.Component {
    componentDidMount(){
        setTimeout(function() {
            browserHistory.push({
                pathname: Url.MENU_PAGE,
                state: { name: 'Beverages' }
            })
        },1500)
    }

    render(){
        return(
            <Loader loading={true}/>
        )
    }
}