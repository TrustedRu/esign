import PropTypes from "prop-types";
import * as React from "react";
import HeaderWorkspaceBlock from "./HeaderWorkspaceBlock";

interface IModalProps {
  isOpen: boolean;
  header: string;
  onClose?: () => void;
}

class Modal extends React.Component<IModalProps, {}> {
  static contextTypes = {
    locale: PropTypes.string,
    localize: PropTypes.func,
  };

  componentWillReceiveProps(newProps: IModalProps) {
    const { isOpen } = newProps;

    if (!this.props.isOpen && !isOpen) {
      return;
    }
  }

  componentDidMount() {
    const { isOpen } = this.props;

    if (isOpen) {
      $("#modal-window").openModal();
    }
  }

  handleCloseModal = () => {
    const { onClose } = this.props;

    if (onClose) {
      onClose();
    }

    $("#modal-window").closeModal();
  }

  render() {
    const { localize, locale } = this.context;
    const { isOpen, header } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <div id="modal-window" className="modal licence-modal">
        <div className="licence-modal-main">
          <HeaderWorkspaceBlock
            text={header}
            new_class="modal-bar"
            icon="close"
            onСlickBtn={() => {
              this.handleCloseModal();
            }}
          />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;