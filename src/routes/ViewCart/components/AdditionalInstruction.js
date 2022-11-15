import React from "react";
import optional from "../../../../public/newimages/optional.png";
import { Field, reduxForm } from "redux-form";
import PropTypes from "prop-types";
import { getLocalStorage, saveLocalStorage } from "../../../components/Helpers";
import RenderField from "DashboardSubComponent/RenderField";

class AdditionalInstruction extends React.Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save(value) {
    this.props.detailForm(value);
  }
  componentDidMount() {
    this.handleInitialize();
  }
  handleInitialize() {
    let additionalInstruction = getLocalStorage("additionalInstruction")
    if(additionalInstruction === undefined || additionalInstruction === null || additionalInstruction.length === 0){
      additionalInstruction = ""
    }
    const data = {
      Instructions : additionalInstruction
    }
    this.props.initialize(data);
  }

  render() {
    let additionalInstruction = getLocalStorage("additionalInstruction")
    if(additionalInstruction === undefined || additionalInstruction === null){
      additionalInstruction = ""
    }

    let instruction = !this.props.additionalInstruction ? additionalInstruction : this.props.additionalInstruction
    saveLocalStorage("additionalInstruction",instruction)
    return (
      <div className="row mx-0 my-3 additional-instruction">
        <h2 className="item-title">
          {this.context.t("Additional Instructions")}
        </h2>
        <div className="col-12 px-0 row mx-0 mb-0">
          <div className="col-1 px-0">
            <img className="img-fluid mr-2" src={optional} alt="icon" />
          </div>
          <form onSubmit={this.props.handleSubmit(this.save)} className="col-11 pr-1">
              <Field
                placeholder={this.context.t("Optional")}
                name="Instructions"
                type="text"
                component={RenderField}
                onChange={e =>
                  this.props.handleInstruction(e, "additionalInstruction")
                }
              />
          </form>
        </div>
        <div className="text-black-50 col-12 text-center px-0" style={{marginTop:'-7%'}}>
          {this.context.t('e.g.use west gate,chili sauce (optional)')}
        </div>
      </div>
    );
  }
}
AdditionalInstruction.contextTypes = {
  t: PropTypes.func.isRequired
};
AdditionalInstruction = reduxForm({
  form: "Additional"
})(AdditionalInstruction);

export default AdditionalInstruction;
