import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { unselectAllFiles } from "../../AC";
import { unselectAllDocuments } from "../../AC/documentsActions";
import { applyDocumentsFilters, resetDocumentsFilters } from "../../AC/documentsFiltersActions";
import {
  ALL, ARCHIVED, ENCRYPTED, SIGNED,
} from "../../constants";
import DatePicker from "../DatePicker";

interface IFilterDocumentsProps {
  applyDocumentsFilters: (filters: IDocumentsFilters) => void;
  dateFrom: Date;
  dateTo: Date;
  filename: string;
  onCancel?: () => void;
  sizeFrom: number | undefined;
  sizeTo: number | undefined;
  sizeTypeFrom: number;
  sizeTypeTo: number;
  types: any;
  resetDocumentsFilters: () => void;
  unselectAllFiles: () => void;
  unselectAllDocuments: () => void;
}

interface IDocumentsFilters {
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  sizeTypeFrom: number;
  sizeTypeTo: number;
  filename: string;
  sizeFrom: number | undefined;
  sizeTo: number | undefined;
  types: {
    ENCRYPTED: boolean;
    SIGNED: boolean;
    ARCHIVED: boolean;
    [key: string]: boolean;
  };
}

const initialState = {
  dateFrom: undefined,
  dateTo: undefined,
  filename: "",
  sizeFrom: "",
  sizeTo: "",
  sizeTypeFrom: 1024,
  sizeTypeTo: 1024,
  types: {
    ARCHIVED: false,
    ENCRYPTED: false,
    SIGNED: false,
  },
};

class FilterDocuments extends React.Component<IFilterDocumentsProps, IDocumentsFilters> {
  static contextTypes = {
    locale: PropTypes.string,
    localize: PropTypes.func,
  };

  constructor(props: IFilterDocumentsProps) {
    super(props);

    this.state = {
        ...initialState,
        dateFrom: props.dateFrom,
        dateTo: props.dateTo,
        sizeTypeFrom: 1024,
        sizeTypeTo: 1024,
    };
  }

  componentDidMount() {
    const { dateFrom, dateTo, filename, sizeFrom, sizeTo, sizeTypeFrom, sizeTypeTo, types } = this.props;

    this.setState({
        ...initialState,
        dateFrom,
        dateTo,
        filename,
        sizeFrom: sizeFrom ? sizeFrom / sizeTypeFrom : sizeFrom,
        sizeTo: sizeTo ? sizeTo / sizeTypeTo : sizeTo,
        sizeTypeFrom,
        sizeTypeTo,
        types,
    });

    $(document).ready(function () {
      $(".tooltipped").tooltip();

      Materialize.updateTextFields();
    });

    $(document).ready(() => {
      $("select").material_select();
    });

    $(ReactDOM.findDOMNode(this.refs.sizeTypeSelectFrom)).on("change", this.handleChangeSizeTypeFrom);
    $(ReactDOM.findDOMNode(this.refs.sizeTypeSelectTo)).on("change", this.handleChangeSizeTypeTo);

    $(".res_btn").click(function(){
      $("select").val(1024);
      $("select").material_select()
    });
  }

  componentDidUpdate() {
    Materialize.updateTextFields();
  }

  componentWillUnmount() {
    this.handelCancel();
  }

  render() {
    const { sizeTypeFrom, sizeTypeTo, dateFrom, dateTo, filename, sizeFrom, sizeTo, types } = this.state;

    const { localize, locale } = this.context;
    return (
      <div>
        <div className="row halftop">
          <div className="col s12">
            <div className="content-wrapper tbody border_group">
              <div className="col s6">
                <div className="row" />
                <div className="row">
                  <div className="input-field input-field-csr col s12">
                    <input
                      id="filename"
                      type="text"
                      className={"validate"}
                      name="filename"
                      value={filename}
                      placeholder={localize("Documents.filename", locale)}
                      onChange={this.handleFilenameChange}
                    />
                    <label htmlFor="filename">
                      {localize("Documents.filename", locale)}
                    </label>
                  </div>
                </div>
                <div className="row nobottom">
                  <div className="col s12">
                    <p className="label-csr">
                      {localize("Documents.mtime", locale)}
                    </p>
                  </div>
                  <div className="col s6">
                    <DatePicker
                      id="input_from"
                      key="input_from"
                      label="From"
                      onClear={() => {
                        this.setState({ dateFrom: undefined});
                      }}
                      onSelect={this.handleFromChange}
                      selected={dateFrom}
                    />
                  </div>
                  <div className="col s6">
                    <DatePicker
                      id="input_to"
                      key="input_to"
                      label="To"
                      min={dateFrom}
                      onClear={() => {
                        this.setState({dateTo: undefined});
                      }}
                      onSelect={this.handleToChange}
                      selected={dateTo}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field input-field-csr col s10">
                    <input
                      id="sizeFrom"
                      type="number"
                      className={"validate"}
                      min="0"
                      name="sizeFrom"
                      value={sizeFrom}
                      placeholder={localize("Documents.filesize", locale)}
                      onChange={this.handleSizeFromChange}
                    />
                    <label htmlFor="sizeFrom">
                      {localize("Documents.filesize_from", locale)}
                    </label>
                  </div>
                  <div className="input-field input-field-csr col s2">
                    <select className="select" ref="sizeTypeSelectFrom" defaultValue={sizeTypeFrom.toString()} value={sizeTypeFrom.toString()} onChange={this.handleChangeSizeTypeFrom} >
                      <option value={1024}>KB</option>
                      <option value={1048576}>MB</option>
                      <option value={1073741824}>GB</option>
                      <option value={1099511627776}>TB</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field input-field-csr col s10">
                    <input
                      id="sizeTo"
                      type="number"
                      className={"validate"}
                      min="0"
                      name="sizeTo"
                      value={sizeTo}
                      placeholder={localize("Documents.filesize", locale)}
                      onChange={this.handleSizeToChange}
                    />
                    <label htmlFor="sizeTo">
                      {localize("Documents.filesize_to", locale)}
                    </label>
                  </div>
                  <div className="input-field input-field-csr col s2">
                    <select className="select" ref="sizeTypeSelectTo" defaultValue={sizeTypeTo.toString()} value={sizeTypeTo.toString()} onChange={this.handleChangeSizeTypeTo} >
                      <option value={1024}>KB</option>
                      <option value={1048576}>MB</option>
                      <option value={1073741824}>GB</option>
                      <option value={1099511627776}>TB</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col s6">
                <div className="row">
                  <p className="label-csr">
                    {localize("Documents.type", locale)}
                  </p>
                  <div className="operations_group">
                    <div className="row">
                      <div className="col s12">
                        <div className="row halfbottom" />
                        <div className="input-checkbox">
                          <input
                            name={ALL}
                            type="checkbox"
                            id={ALL}
                            className="filled-in"
                            checked={this.isAllTypesChecked()}
                            onChange={this.handleAllFilesTypesClick}
                          />
                          <label htmlFor={ALL} className="truncate">
                            {localize("EventsFilters.all", locale)}
                          </label>
                        </div>
                        <div className="input-checkbox">
                          <input
                            name={ENCRYPTED}
                            type="checkbox"
                            id={ENCRYPTED}
                            className="filled-in"
                            checked={types.ENCRYPTED}
                            onChange={this.handleFileTypesChange}
                          />
                          <label htmlFor={ENCRYPTED} className="truncate">
                            {localize("Documents.encrypted_files", locale)}
                          </label>
                        </div>
                        <div className="input-checkbox">
                          <input
                            name={SIGNED}
                            type="checkbox"
                            id={SIGNED}
                            className="filled-in"
                            checked={types.SIGNED}
                            onChange={this.handleFileTypesChange}
                          />
                          <label htmlFor={SIGNED} className="truncate">
                            {localize("Documents.signed_files", locale)}
                          </label>
                        </div>
                        <div className="input-checkbox">
                          <input
                            name={ARCHIVED}
                            type="checkbox"
                            id={ARCHIVED}
                            className="filled-in"
                            checked={types.ARCHIVED}
                            onChange={this.handleFileTypesChange}
                          />
                          <label htmlFor={ARCHIVED} className="truncate">
                            {localize("Documents.archived_files", locale)}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row halfbottom" />

        <div className="row halfbottom">
          <div style={{ float: "left" }}>
            <div style={{ display: "inline-block", margin: "10px" }}>
              <a className={"res_btn btn btn-text waves-effect waves-light"} onClick={this.handleResetFilters}>{localize("Common.reset", locale)}</a>
            </div>
          </div>

          <div style={{ float: "right" }}>
            <div style={{ display: "inline-block", margin: "10px" }}>
              <a className={"btn btn-text waves-effect waves-light modal-close"} onClick={this.handelCancel}>{localize("Common.cancel", locale)}</a>
            </div>
            <div style={{ display: "inline-block", margin: "10px" }}>
              <a className={"btn btn-outlined waves-effect waves-light modal-close"} onClick={this.handleApplyFilters}>{localize("Common.apply", locale)}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  isAllTypesChecked = () => {
    const { types } = this.state;

    return !types.ENCRYPTED && !types.SIGNED && !types.ARCHIVED;
  }

  handleFileTypesChange = (ev: any) => {
    const target = ev.target;
    const name = target.name;

    this.setState({
        ...this.state,
        types: {
          ...this.state.types,
          [name]: !this.state.types[name],
        },
    });
  }

  handleAllFilesTypesClick = () => {
    const value = !this.isAllTypesChecked();

    this.setState({
        ...this.state,
        types: {
          ARCHIVED: !value,
          ENCRYPTED: !value,
          SIGNED: !value,
      },
    });
  }

  handelCancel = () => {
    const { onCancel } = this.props;

    if (onCancel) {
      onCancel();
    }
  }

  handleFilenameChange = (ev: any) => {
    this.setState({ ...this.state, filename: ev.target.value });
  }

  handleSizeFromChange = (ev: any) => {
    this.setState({ ...this.state, sizeFrom: ev.target.value });
  }

  handleSizeToChange = (ev: any) => {
    this.setState({ ...this.state, sizeTo: ev.target.value });
  }

  handleChangeSizeTypeFrom = (ev: any) => {
    this.setState({...this.state, sizeTypeFrom: ev.target.value });
  }

  handleChangeSizeTypeTo = (ev: any) => {
    this.setState({...this.state, sizeTypeTo: ev.target.value });
  }

  handleFromChange = (ev: any) => {
    if (ev && ev.select) {
      this.setState({ ...this.state, dateFrom: new Date(ev.select) });
    }
  }

  handleToChange = (ev: any) => {
    if (ev && ev.select) {
      this.setState({ ...this.state, dateTo: new Date(ev.select) });
    }
  }

  handleApplyFilters = () => {
    this.props.applyDocumentsFilters({
      ...this.state,
      sizeFrom: this.state.sizeFrom ? this.state.sizeFrom * this.state.sizeTypeFrom : undefined,
      sizeTo: this.state.sizeTo ? this.state.sizeTo * this.state.sizeTypeTo : undefined,
    });
    this.props.unselectAllFiles();
    this.props.unselectAllDocuments();
    this.handelCancel();
  }

  handleResetFilters = () => {
    this.setState({ ...initialState });
    this.props.unselectAllFiles();
    this.props.unselectAllDocuments();
    this.props.resetDocumentsFilters();
    $(document).ready(() => {
      $("select").material_select();
      Materialize.updateTextFields();
    });
  }
}

export default connect((state) => ({
  dateFrom: state.filters.documents.dateFrom,
  dateTo: state.filters.documents.dateTo,
  filename: state.filters.documents.filename,
  sizeFrom: state.filters.documents.sizeFrom,
  sizeTo: state.filters.documents.sizeTo,
  sizeTypeFrom: state.filters.documents.sizeTypeFrom,
  sizeTypeTo: state.filters.documents.sizeTypeTo,
  types: state.filters.documents.types,
}), {
  applyDocumentsFilters, resetDocumentsFilters, unselectAllDocuments, unselectAllFiles,
})(FilterDocuments);
