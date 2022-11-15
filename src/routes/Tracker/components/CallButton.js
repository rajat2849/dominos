import React from "react";
import PropTypes from "prop-types";

class CallButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <button className="px-4">
          <a href={this.props.phone}>{this.context.t("Call")}</a>
        </button>
      </div>
    );
  }
}

CallButton.propTypes = {
  phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
CallButton.propTypes = {
  t: PropTypes.func.isRequired
};
export default CallButton;
