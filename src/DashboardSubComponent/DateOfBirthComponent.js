import React from 'react';
import MaterialUIPickers from 'DashboardSubComponent/MaterialUIPickers';
import {Field, reduxForm} from 'redux-form';
import RenderField from "DashboardSubComponent/RenderField";
import AgeAlert from 'DashboardSubComponent/AgeAlert';

const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined
const minValue13 = minValue(13)
const required = value => 
  value ? undefined : 'Required'

export const DOB = (props) => {
   const { handleSubmit, checkDate } = props
  
  function handleDateChange(date){
    setSelectedDate(date);
  }

  const initialDate = new Date();
  const year = initialDate.getFullYear()-13
  initialDate.setFullYear(year)
  
  const [selectedDate, setSelectedDate] = React.useState(initialDate)
  //'2014-08-18T21:11:54'

  return(
    <div className="col-12">
    {
      ((Math.abs(new Date(new Date()-selectedDate).getUTCFullYear() - 1970)) < 13) && <AgeAlert checkDate={checkDate}/>  
    }
    <form onSubmit={handleSubmit}>
      <Field
        name='Dob'
        className='form-control'
        type='date'
        component={MaterialUIPickers}
        validate={[ required, minValue13 ]}
        props={{handleDateChange,selectedDate,checkDate}}
      />
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'DOB'
})(DOB)

