import React from "react";
// import edit from "../../../../public/newimages/edit.png";
// import { Url } from "config/Config";
// import { Link } from "react-router";
// import dropdown_bawah from "../../../../public/newimages/dropdown_bawah.png";
import calender from "../../../../public/newimages/calender.png";
import { makeStyles } from "@material-ui/core/styles";
// //import Input from "@material-ui/core/Input";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
// import FilledInput from "@material-ui/core/FilledInput";
// import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import { translate, saveLocalStorage } from "components/Helpers";
import PropTypes from "prop-types";
import { getLocalStorage } from "../../../components/Helpers";
import { Form, FormGroup, Label, Input } from "reactstrap";

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

class OrderOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderOption: "now",
      orderDay: "today"
    };
    this.myStyles = this.myStyles.bind(this);
  }

  handleChangeOption(event) {
    this.setState({
      orderOption: event.target.value
    });
    let advanceOrder = event.target.value === "now" ? false : true;
    this.props.changeLaterOrderOption(advanceOrder);
    this.props.fetchUser();
  }

  handleChangeDate(e) {
    this.setState({
      orderDay: e.target.value
    });
    this.props.calculateLateOrderDateTime(e.target.value);
    this.props.saveOrderTime("date", e.target.value);
    this.props.fetchUser();
  }

  handleChangeTime(e) {
    this.props.saveOrderTime("time", e.target.value);
    this.props.fetchUser();
  }

  myStyles() {
    return useStyles();
  }

  componentDidMount() {
    this.props.calculateLateOrderDateTime("today");
  }

  render() {
    const classes = this.myStyles;
    let today =
      this.props.date.length > 0
        ? this.props.date[0].split("-")[0] -
          1 +
          "-" +
          this.props.date[0].split("-")[1] +
          "-" +
          this.props.date[0].split("-")[2]
        : "today";
    let showDate =
      this.props.date.length > 0 &&
      this.props.date.map(date => {
        return (
          <MenuItem key={date} value={date}>
            {date}
          </MenuItem>
        );
      });
    let showTime =
      this.props.time.length > 0 &&
      this.props.time.map(time => {
        const hour = parseInt(time.split(":")[0]);
        const min = parseInt(time.split(":")[1]);
        if (hour >= 10 && hour <= 22) {
          if (hour == 10 && min >= 45) {
            return (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            );
          } else if (hour > 10) {
            return (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            );
          }
        }
      });
    const order = getLocalStorage("order");
    const todayDate = new Date();
    const hours = todayDate.getHours();
    const minutes = todayDate.getMinutes();
    return (
      <div>
        {order.length !== 0 && (
          <form
            autoComplete="off"
            className="row mx-0 mt-2 order-option payment-wrapper"
          >
            <div className="col-12 px-0">
              <h2 className="item-title">{this.context.t("Order Options")}</h2>
            </div>
            <FormGroup
              check
              className="col-6 d-flex form-check position-relative row mx-0 px-1"
            >
              <Label
                check
                className="col-11 row px-0 form-check-label mx-0 container1"
              >
                <Input
                  type="radio"
                  name="orderoption"
                  className="mr-2"
                  value="now"
                  onClick={e => this.handleChangeOption(e)}
                  defaultChecked={true}
                />
                <span className="ml-4"> ORDER NOW</span>
                <span className="checkmark Left"></span>
              </Label>
            </FormGroup>
            <FormGroup
              check
              className="col-6 row d-flex position-relative px-0 form-check "
            >
              <Label check className="form-check-label d-flex pl-0 container1">
                <Input
                  type="radio"
                  name="orderoption"
                  className=""
                  value="later"
                  onClick={e => this.handleChangeOption(e)}
                  defaultChecked={true}
                />
                <span className="checkmark Left"></span>
                <img
                  src={calender}
                  style={{ maxHeight: "20px" }}
                  alt="order"
                  className="ml-4"
                />
                <span className="ml-2">ORDER LATER</span>
              </Label>
            </FormGroup>

            {this.state.orderOption === "later" && (
              <div className="col-12 row mx-0 px-0 order-later-time mt-2">
                <div className="col-6 px-2">
                  <FormControl className={classes.formControl}>
                    <Select
                      value={this.state.orderDay}
                      onChange={e => this.handleChangeDate(e)}
                      disabled={true}
                      inputProps={{
                        name: "age",
                        id: "age-simple"
                      }}
                    >
                      <MenuItem value="today">
                        {this.context.t("TODAY")}
                      </MenuItem>
                      {showDate}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-6 px-2">
                  <FormControl className={classes.formControl}>
                    <Select
                      value={this.props.selectedTime}
                      onChange={e => this.handleChangeTime(e)}
                      inputProps={{
                        name: "age",
                        id: "age-simple"
                      }}
                    >
                      {this.state.orderDay === "today"
                        ? hours < 22 && showTime
                        : showTime}
                    </Select>
                  </FormControl>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    );
  }
}

OrderOptions.contextTypes = {
  t: PropTypes.func.isRequired
};
export default OrderOptions;
