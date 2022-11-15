import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles({
  grid: {
    width: '60%',
  },
});

export default function MaterialUIPickers(props) {
  // The first commit of Material-UI
  
  const classes = useStyles();
  if((Math.abs(new Date(new Date()-props.selectedDate).getUTCFullYear() - 1970)) < 13){
    props.checkDate && props.checkDate(false)
  } else {
    props.checkDate && props.checkDate(true)
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container className="">
        <DatePicker
          variant="inline"
          inputVariant="outlined"
          label="Date of birth (dd-mm-yyyy)"
          format="MM/dd/yyyy"
          id="mui-pickers-date"
          className='form-control my-2'
          clearable
          autoOk
          disableFuture
          value={props.selectedDate}
          InputAdornmentProps={{ position: "start" }}
          onChange={date => props.handleDateChange(date)}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
