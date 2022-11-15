import React from 'react';
import PropTypes from 'prop-types';
// import ReactSmoothScroll from 'react-smooth-scroll';
import logo from '../../public/logo-icon.png';
import removeIcon from '../../public/remove-icon.png';
// import cookie from 'react-cookie';
import './Banner.scss';
// import { translate } from 'components/Helpers';

class Banner extends React.Component {
	constructor(props) {
		super(props);
		const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)showApp\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		if (cookieValue) {
			this.state = {
				showApp: false
			}
		} else {
			document.cookie  = 'showApp=true';
			this.state= {
				showApp: true
			}
		}
	// 	branch.logEvent(
    //  	"Smart-Banner",
    //  function(err) { console.log(err); }
    // )
	this.userPhone = this.userPhone.bind(this);
	this.hideApp = this.hideApp.bind(this);
	}

	userPhone() {
		if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i) ||
		    navigator.userAgent.match(/android/i)) {
		  var store_loc = "https://itunes.apple.com/us/app/dominos-pizza-indonesia/id894487160";
		  var href = "https://itunes.apple.com/us/app/dominos-pizza-indonesia/id894487160";
		  var is_android = false;
		  if (navigator.userAgent.match(/android/i)) {
		    store_loc = "https://play.google.com/store/apps/details?id=com.phonegap.dominos";
		    href = "market://details?id=com.phonegap.dominos";
		    is_android = true;
		  }
		  if (location.hash) {
		    var app_loc = "dominos://" + location.hash.substring(2);
		    if (is_android) {
		      var w = null;
		      try {
		        w = window.open(app_loc, '_blank');
		      } catch (e) {
		        // no exception
		      }
		      if (w) { window.close(); }
		      else { window.location = store_loc; }
		    } else {
		      var loadDateTime = new Date();
		      window.setTimeout(function() {
		        var timeOutDateTime = new Date();
		        if (timeOutDateTime - loadDateTime < 5000) {
		          window.location = store_loc;
		        } else { window.close(); }
		      },
		      25);
		      window.location = app_loc;
		    }
		  } else {
		    location.href = href;
		  }
		}
	}


	hideApp (){
	  this.setState({showApp: false});
	}

	render() {
		const { showApp } = this.state;
		return(
			showApp ?
			  //  <ReactSmoothScroll>
			<div className="row">
				<div className='col-12'>
					<div className='row'>
						<div className="col-12 white user-notificaton px-0">
							<div className="col-12 row align-items-center border px-0 mx-auto py-2">
								<div className="col-1 remove-icon px-0"><a href="#" title="" onClick = {this.hideApp} ><img src={removeIcon} alt="" className="img-fluid" /></a></div>
								<div className="col logo-icon px-1"><img src={logo} alt='' className="img-fluid"/></div>
								<div className="col-6 text-left px-1">
									<h4>Domino's Pizza Indonesia</h4>
									<p>{this.context.t('Easiest way to order via Domino\'s Apps')}</p>
								</div>
								<div className="col px-0 ml-auto download-link"><a href="#" onClick = {this.userPhone} title="">Download</a></div>
							</div>
						</div>
					</div>
				</div>
		  </div>
			: null
		);
	}
}

 Banner.contextTypes = {
    t: PropTypes.func.isRequired
 }

export default Banner;

