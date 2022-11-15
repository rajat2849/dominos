// import React from 'react';
// import PropTypes from 'prop-types';

// const RenderTextArea = ({ input, label, type, meta: { touched, error, invalid } }) => {
//   return (
//     <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
//       <label className="control-label">{}</label>
//       <div>
//         <textarea
//           className='form-control'
//           name={input.name}
//           placeholder={label}
//           onChange={input.onChange}
//         >
//           {input.value}
//         </textarea>
//         {touched && error &&
//           <span className="error-danger">
//             <i className="fa fa-exclamation-circle">{error}</i>
//           </span>
//         }
//       </div>
//     </div>
//   );
// };

// RenderTextArea.propTypes = {
//   input: PropTypes.object.isRequired,
//   label: PropTypes.string,
//   type: PropTypes.string,
//   meta: PropTypes.object
// };

// export default RenderTextArea;
