import * as React from "react";
import { connect } from "react-redux";

interface ISignatureStatusCircleProps {
  fileId: number;
  signature: any;
}

class SignatureStatusCircle extends React.Component<ISignatureStatusCircleProps, any> {
  static contextTypes = {
    locale: React.PropTypes.string,
    localize: React.PropTypes.func,
  };

  constructor(props: ISignatureStatusCircleProps) {
    super(props);
  }

  componentDidMount() {
    $(".tooltipped").tooltip("remove");
    $(".tooltipped").tooltip({ delay: 50 });
  }

  componentDidUpdate() {
    $(".tooltipped").tooltip("remove");
    $(".tooltipped").tooltip({ delay: 50 });
  }

  componentWillUnmount() {
    $(".tooltipped").tooltip("remove");
  }

  getCircleBody() {
    const { localize, locale } = this.context;
    const { signature } = this.props;

    let statusIcon = "status_default";
    let toolTipText = "";

    if (signature) {
      signature.status_verify ? statusIcon = "status_ok" : statusIcon = "status_error";
    } else {
      return null;
    }

    const classStatus = statusIcon + " tooltipped";

    if (statusIcon === "status_ok") {
      toolTipText = localize("Sign.sign_ok", locale);
    } else {
      toolTipText = localize("Sign.sign_error", locale);
    }

    return (
      <a className={classStatus} data-position="left" data-delay="50"
        data-tooltip={toolTipText}>
      </a>
    );
  }

  render() {
    return (
      <div>
        {this.getCircleBody()}
      </div>
    );
  }
}

export default connect((state, ownProps) => {
  return {
    signature: state.signatures.getIn(["entities", ownProps.fileId]),
  };
})(SignatureStatusCircle);