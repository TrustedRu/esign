import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { activeFilesSelector, loadingRemoteFilesSelector } from "../../selectors";
import { ENCRYPT, SIGN, VERIFY } from "../../server/constants";
import { mapToArr } from "../../utils";

interface IRemoteFile {
  extra: any;
  id: number;
  loaded: boolean;
  loading: boolean;
  name: string;
  socketId: string;
  totalSize: number;
  url: string;
}

interface ISignatureButtonsProps {
  onSign: () => void;
  onVerifySignature: () => void;
  onUnsign: () => void;
  onResign: () => void;
  activeFiles: Array<{
    id: string,
    filename: string,
    lastModifiedDate: Date,
    fullpath: string,
    extension: string,
    verified: boolean,
    active: boolean,
    remoteId?: string;
    socket?: string;
  }>;
  loadingFiles: IRemoteFile[];
  allFiles: Array<{
    id: string,
    filename: string,
    lastModifiedDate: Date,
    fullpath: string,
    extension: string,
    verified: boolean,
    active: boolean,
    remoteId?: string;
    socket?: string;
  }>;
  method?: string;
  signer: string;
}

class SignatureButtons extends React.Component<ISignatureButtonsProps, {}> {
  static contextTypes = {
    locale: PropTypes.string,
    localize: PropTypes.func,
  };

  render() {
    const { allFiles, activeFiles, method, signer } = this.props;
    const { localize, locale } = this.context;

    const active = allFiles.length > 0 ? "active" : "";
    const haveFilesFromSocket: boolean = this.isFilesLoading() || this.isFilesFromSocket();

    let disabledSign = "";
    let disabledVerify = "";
    let disabledUnsign = "disabled";

    let j = 0;

    if (activeFiles.length > 0) {
      if (signer) {
        if (haveFilesFromSocket) {
          disabledSign = (method === SIGN) ? "" : "disabled";
        } else {
          disabledSign = "";
        }
      } else {
        disabledSign = "disabled";
      }

      for (const file of activeFiles) {
        if (file.fullpath.split(".").pop() === "sig") {
          j++;
        }
      }

      if (j === activeFiles.length) {
        if (haveFilesFromSocket) {
          if (method === SIGN) {
            disabledVerify = "";
            disabledUnsign = "disabled";
          }

          if (method === VERIFY) {
            disabledSign = "disabled";
            disabledVerify = "";
            disabledUnsign = "disabled";
          }
        } else {
          disabledVerify = "";
          disabledUnsign = "";
        }
      } else {
        disabledSign = j > 0 ? "disabled" : "";

        if (haveFilesFromSocket) {
          if (method === VERIFY) {
            disabledSign = "disabled";
          }
        }

        disabledVerify = "disabled";
      }
    } else {
      disabledSign = "disabled";
      disabledVerify = "disabled";
    }

    if (!disabledUnsign || (haveFilesFromSocket && method === SIGN && j === activeFiles.length)) {
      return (
        <div className={"btns-for-operation " + active}>
          <a className={"waves-effect waves-light btn-large operation-btn " + disabledSign} onClick={this.props.onResign}>
            {localize("Sign.resign", locale)}
          </a>
          <a className={"waves-effect waves-light btn-large operation-btn " + disabledVerify} onClick={this.props.onVerifySignature}>
            {localize("Sign.verify", locale)}
          </a>
          <a className={"waves-effect waves-light btn-large operation-btn " + disabledUnsign} onClick={this.props.onUnsign}>
            {localize("Sign.unsign", locale)}
          </a>
        </div>
      );
    } else {
      return (
        <div className={"btns-for-operation " + active}>
          <a className={"waves-effect waves-light btn-large operation-btn " + disabledSign} onClick={this.props.onSign}>
            {localize("Sign.sign", locale)}
          </a>
          <a className={"waves-effect waves-light btn-large operation-btn " + disabledVerify} onClick={this.props.onVerifySignature}>
            {localize("Sign.verify", locale)}
          </a>
        </div>
      );
    }
  }

  isFilesLoading = () => {
    const { loadingFiles } = this.props;

    if (loadingFiles.length) {
      return true;
    }

    return false;
  }

  isFilesFromSocket = () => {
    const { activeFiles } = this.props;

    if (activeFiles.length) {
      for (const file of activeFiles) {
        if (file.socket) {
          return true;
        }
      }
    }

    return false;
  }
}

export default connect((state) => {
  return {
    activeFiles: activeFilesSelector(state, { active: true }),
    allFiles: mapToArr(state.files.entities),
    loadingFiles: loadingRemoteFilesSelector(state, { loading: true }),
    method: state.remoteFiles.method,
    signer: state.certificates.getIn(["entities", state.signers.signer]),
  };
})(SignatureButtons);
