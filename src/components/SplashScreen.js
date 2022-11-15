// import React from 'react';

// import './SplashScreen.scss';

// const Progressbar = (props) => {
//   return (
//     <progress min='0' max="100" value={props.percent}></progress>
//   );
// };
// class SplashScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { percent: "0" };
//     this.timer = null;
//     this.handleRefreshTimeout = this.handleRefreshTimeout.bind(this);
//   }

//   componentDidMount() {
//     this.timer = setTimeout(() => {
//       this.handleRefreshTimeout(68);
//     }, 100);
//   }

//   componentWillUnmount() {
//     if(this.timer){
//       clearTimeout(this.timer);
//     }
//   }

//   handleRefreshTimeout(timeout = 100) {
//     let percent = this.state.percent;
//     percent = parseInt(percent) + 5;
//     this.setState({ percent: percent });
//     if (percent < 100) {
//       this.timer = setTimeout(() => {
//         this.handleRefreshTimeout(timeout);
//       }, timeout)
//     }
//   }

//   render() {
//     if (this.props.show === false) {
//       return null;
//     }
//     return (
//       <div className='splash-screen-container'>
//         <div className='splash-screen-img'>
//           <div className='loading-bar'>
//             <Progressbar min="0" max="100" percent={this.state.percent} />
//             <span className=''>{this.state.percent}%</span>
//           </div>
//          </div>
//       </div>
//     );
//   }
// }

// export default SplashScreen;
