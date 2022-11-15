import React from "react";
import PropTypes from "prop-types";
import { Col, Form } from "reactstrap";
import { reduxForm, Field } from "redux-form";
import RenderField from "components/RenderField";
import searchIcon from "../../../../public/newimages/search-icon.png";
import "./pizzaTracker.scss";

const required = value =>
  value ? undefined : "Please enter your Order Id/Mobile No.";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="col-12 px-0">
        <Form
          className="row mx-0 pr-2 py-2 search-bar-box"
          onSubmit={handleSubmit(this.props.handleSearch)}
        >
          <Col className="text-center col-12 position-relative pr-0">
            <Field
              name="search"
              className="form-control"
              type="number"
              component={RenderField}
              validate={[required]}
              placeholder="Order Id/Mobile No."
            />
            <button type="submit " className="position-absolute searchBtn">
              <img
                src={searchIcon}
                onClick={this.props.handleModal}
                alt=""
                className="img-new"
              />
            </button>
          </Col>
        </Form>
      </div>
    );
  }
}

SearchBar.propTypes = {};

SearchBar.contextTypes = {
  t: PropTypes.func.isRequired
};

// export default SearchBar;
export default reduxForm({
  form: "SearchBar"
})(SearchBar);
