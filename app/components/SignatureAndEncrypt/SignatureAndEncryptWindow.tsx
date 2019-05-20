import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { activeFile, deleteFile, filePackageDelete, filePackageSelect, selectFile } from "../../AC";
import {
  DECRYPT, ENCRYPT, LOCATION_CERTIFICATE_SELECTION_FOR_SIGNATURE,
  SIGN, UNSIGN, VERIFY,
} from "../../constants";
import { activeFilesSelector } from "../../selectors";
import { bytesToSize, mapToArr } from "../../utils";
import FilterDocuments from "../Documents/FilterDocuments";
import FileSelector from "../Files/FileSelector";
import Modal from "../Modal";

const dialog = window.electron.remote.dialog;

interface ISignatureAndEncryptWindowProps {
  isDefaultFilters: boolean;
}

interface ISignatureAndEncryptWindowState {
  currentOperation: string;
  searchValue: string;
  showModalDeleteDocuments: boolean;
  showModalFilterDocments: boolean;
}

class SignatureAndEncryptWindow extends React.Component<ISignatureAndEncryptWindowProps, ISignatureAndEncryptWindowState> {
  static contextTypes = {
    locale: PropTypes.string,
    localize: PropTypes.func,
  };

  constructor(props: ISignatureAndEncryptWindowProps) {
    super(props);

    this.state = {
      currentOperation: "",
      searchValue: "",
      showModalDeleteDocuments: false,
      showModalFilterDocments: false,
    };
  }

  componentDidMount() {
    $(".btn-floated, .nav-small-btn").dropdown({
      alignment: "left",
      belowOrigin: false,
      gutter: 0,
      inDuration: 300,
      outDuration: 225,
    });
  }

  render() {
    const { localize, locale } = this.context;
    const { isDefaultFilters, signer } = this.props;
    const classDefaultFilters = isDefaultFilters ? "filter_off" : "filter_on";

    return (
      <div className="content-noflex">
        <div className="row">
          <div className="col s8 leftcol">
            <div className="row halfbottom">
              <div className="row halfbottom" />
              <div className="col" style={{ width: "40px", paddingLeft: "40px" }}>
                <a onClick={this.addFiles.bind(this)}>
                  <i className="file-setting-item waves-effect material-icons secondary-content pulse">add</i>
                </a>
              </div>
              <div className="col" style={{ width: "calc(100% - 140px)" }}>
                <div className="input-field input-field-csr col s12 border_element find_box">
                  <i className="material-icons prefix">search</i>
                  <input
                    id="search"
                    type="search"
                    placeholder={localize("EventsTable.search_in_doclist", locale)}
                    value={this.state.searchValue}
                    onChange={this.handleSearchValueChange} />
                  <i className="material-icons close" onClick={() => this.setState({ searchValue: "" })} style={this.state.searchValue ? { color: "#444" } : {}}>close</i>
                </div>
              </div>
              <div className="col" style={{ width: "40px" }}>
                <a onClick={this.handleShowModalFilterDocuments}>
                  <i className="file-setting-item waves-effect material-icons secondary-content">filter_list</i>
                </a>
              </div>
              <div className="col" style={{ width: "40px" }}>
                <div>
                  <a className="btn-floated" data-activates="dropdown-btn-set-add-files">
                    <i className="file-setting-item waves-effect material-icons secondary-content">more_vert</i>
                  </a>
                  <ul id="dropdown-btn-set-add-files" className="dropdown-content">
                    <li><a onClick={this.selectedAll}>{localize("Settings.selected_all", locale)}</a></li>
                    <li><a onClick={this.removeSelectedAll}>{localize("Settings.remove_selected", locale)}</a></li>
                    <li><a onClick={this.removeAllFiles}>{localize("Settings.remove_all_files", locale)}</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <FileSelector operation="SIGN" />
          </div>
          <div className="col s4 rightcol">
            <div className="row" />
            <div className="col s12">
              <div className="desktoplic_text_item">Сертификат подписи:</div>
              <hr />
            </div>
            {
              (signer) ? this.getSelectedSigner() :
                <div className="col s12">
                  <Link to={LOCATION_CERTIFICATE_SELECTION_FOR_SIGNATURE}>
                    <a className="btn btn-outlined waves-effect waves-light" style={{ width: "100%" }}>
                      ВЫБРАТЬ
                    </a>
                  </Link>
                </div>
            }
            <div className="row" />
            <div className="col s12">
              <div className="desktoplic_text_item">Сертификаты шифрования:</div>
              <hr />
            </div>
            <div className="col s12">
              <a className="btn btn-outlined waves-effect waves-light" style={{ width: "100%" }}>
                ВЫБРАТЬ
              </a>
            </div>

            <div className="row fixed-bottom-rightcolumn" >
              <div className="col s12">
                <hr />
              </div>
              <div className="col s4">
                <a className={`waves-effect waves-light ${this.checkEnableOperationButton(SIGN) ? "" : "disabled_docs"}`}
                  data-position="bottom"
                  onClick={this.handleClickSign}>
                  <div className="row docmenu">
                    <i className="material-icons docmenu sign" />
                  </div>
                  <div className="row docmenu">{localize("Documents.docmenu_sign", locale)}</div>
                </a>
              </div>
              <div className="col s4">
                <a className={`waves-effect waves-light ${this.checkEnableOperationButton(VERIFY) ? "" : "disabled_docs"}`}
                  data-position="bottom"
                  data-tooltip={localize("Sign.sign_and_verify", locale)}>
                  <div className="row docmenu">
                    <i className="material-icons docmenu verifysign" />
                  </div>
                  <div className="row docmenu">{"Проверить"}</div>
                </a>
              </div>
              <div className="col s4">
                <a className={`waves-effect waves-light ${this.checkEnableOperationButton(UNSIGN) ? "" : "disabled_docs"}`} data-position="bottom">
                  <div className="row docmenu">
                    <i className="material-icons docmenu removesign" />
                  </div>
                  <div className="row docmenu">{localize("Documents.docmenu_removesign", locale)}</div>
                </a>
              </div>
              <div className="col s12">
                <div className="row" />
              </div>
              <div className="col s4">
                <a className={`waves-effect waves-light ${this.checkEnableOperationButton(ENCRYPT) ? "" : "disabled_docs"}`}
                  data-position="bottom"
                  onClick={this.handleClickSign}>
                  <div className="row docmenu">
                    <i className="material-icons docmenu encrypt" />
                  </div>
                  <div className="row docmenu">{localize("Documents.docmenu_enctypt", locale)}</div>
                </a>
              </div>
              <div className="col s4">
                <a className={`waves-effect waves-light ${this.checkEnableOperationButton(DECRYPT) ? "" : "disabled_docs"}`}
                  data-position="bottom"
                  data-tooltip={localize("Sign.sign_and_verify", locale)}>
                  <div className="row docmenu">
                    <i className="material-icons docmenu decrypt" />
                  </div>
                  <div className="row docmenu">{localize("Documents.docmenu_dectypt", locale)}</div>
                </a>
              </div>
            </div>
          </div>
          {this.showModalFilterDocuments()}
        </div>
      </div>
    );
  }

  getSelectedSigner = () => {
    const { signer } = this.props;
    const { localize, locale } = this.context;

    if (signer) {
      const status = signer.status;
      let curStatusStyle;

      if (status) {
        curStatusStyle = "cert_status_ok";
      } else {
        curStatusStyle = "cert_status_error";
      }

      return (
        <React.Fragment>
          <div className="col s11">
            <div className="col s1">
              <div className={curStatusStyle} />
            </div>
            <div className="col s11">
              <div className="desktoplic_text_item topitem truncate">{signer.subjectFriendlyName}</div>
              <div className="desktoplic_text_item topitem truncate">{signer.issuerFriendlyName}</div>
            </div>
          </div>
          <div className="col s1">
            <div className="right import-col">
              <a className={"nav-small-btn waves-effect waves-light "} data-activates="dropdown-btn-for-cert">
                <i className="material-icons">more_vert</i>
              </a>
              <ul id="dropdown-btn-for-cert" className="dropdown-content">
                <li><a>Очистить</a></li>
              </ul>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }

  selectedAll = () => {
    // tslint:disable-next-line:no-shadowed-variable
    const { files, activeFile } = this.props;

    for (const file of files) {
      activeFile(file.id);
    }
  }

  removeSelectedAll = () => {
    // tslint:disable-next-line:no-shadowed-variable
    const { files, activeFile } = this.props;

    for (const file of files) {
      activeFile(file.id, false);
    }
  }

  removeAllFiles = () => {
    // tslint:disable-next-line:no-shadowed-variable
    const { filePackageDelete, files } = this.props;

    const filePackage: number[] = [];

    for (const file of files) {
      filePackage.push(file.id);
    }

    filePackageDelete(filePackage);
  }

  checkEnableOperationButton = (operation: string) => {
    const { activeFilesArr } = this.props;

    if (!activeFilesArr.length) {
      return false;
    }

    switch (operation) {
      case SIGN:
        for (const document of activeFilesArr) {
          if (document.extname === ".enc") {
            return false;
          }
        }

        return true;

      case VERIFY:
      case UNSIGN:
        for (const document of activeFilesArr) {
          if (document.extname !== ".sig") {
            return false;
          }
        }

        return true;

      case ENCRYPT:
        for (const document of activeFilesArr) {
          if (document.extname === ".enc") {
            return false;
          }
        }

        return true;

      case DECRYPT:
        for (const document of activeFilesArr) {
          if (document.extname !== ".enc") {
            return false;
          }
        }

        return true;

      default:
        return false;
    }
  }

  addFiles() {
    // tslint:disable-next-line:no-shadowed-variable
    const { filePackageSelect } = this.props;

    dialog.showOpenDialog(null, { properties: ["openFile", "multiSelections"] }, (selectedFiles: string[]) => {
      if (selectedFiles) {
        const pack: IFilePath[] = [];

        selectedFiles.forEach((file) => {
          pack.push({ fullpath: file });
        });

        filePackageSelect(pack);
      }
    });
  }

  handleClickSign = () => {
    this.setState({ currentOperation: SIGN });
  }

  handleClickEncrypt = () => {
    this.setState({ currentOperation: ENCRYPT });
  }

  getSelectedFilesSize = () => {
    const { activeFiles } = this.props;

    let sizeInBytes = 0;

    for (const document of activeFiles) {
      sizeInBytes += document.filesize;
    }

    return bytesToSize(sizeInBytes);
  }

  showModalFilterDocuments = () => {
    const { localize, locale } = this.context;
    const { showModalFilterDocments } = this.state;

    if (!showModalFilterDocments) {
      return;
    }

    return (
      <Modal
        isOpen={showModalFilterDocments}
        header={localize("Filters.filters_settings", locale)}
        onClose={this.handleCloseModalFilterDocuments}>

        <FilterDocuments onCancel={this.handleCloseModalFilterDocuments} />
      </Modal>
    );
  }

  handleSearchValueChange = (ev: any) => {
    this.setState({ searchValue: ev.target.value });
  }

  handleShowModalFilterDocuments = () => {
    this.setState({ showModalFilterDocments: true });
  }

  handleCloseModalFilterDocuments = () => {
    this.setState({ showModalFilterDocments: false });
  }
}

export default connect((state) => {
  return {
    activeFiles: activeFilesSelector(state, { active: true }),
    activeFilesArr: mapToArr(activeFilesSelector(state, { active: true })),
    files: mapToArr(state.files.entities),
    isDefaultFilters: state.filters.documents.isDefaultFilters,
    signer: state.certificates.getIn(["entities", state.signers.signer]),
  };
}, { activeFile, deleteFile, filePackageSelect, filePackageDelete, selectFile })(SignatureAndEncryptWindow);
