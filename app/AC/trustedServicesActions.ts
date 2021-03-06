import store from "../store";
import { ADD_TRUSTED_SERVICE, DELETE_TRUSTED_SERVICE, HIDE_DIAGNOSTIC_MODAL_NO_CERT, HIDE_MODAL_ADD_TRUSTED_SERVICE, HIDE_MODAL_HTTP_ERROR, SHOW_DIAGNOSTIC_MODAL_NO_CERT, SHOW_MODAL_ADD_TRUSTED_SERVICE, SHOW_MODAL_HTTP_ERROR, VERIFY_CERTIFICATE, VERIFY_CERTIFICATE_FOR_TRUSTED_SERVICE } from "../constants";
import { uuid } from "../utils";
import { certificateToPkiItemInfo } from "./urlCmdCertInfo";
import { finishCurrentUrlCmd } from "./urlActions";

export function addTrustedService(service: string, cert: string) {
  const pkiCertificate = new trusted.pki.Certificate();

  try {
    pkiCertificate.import(Buffer.from(cert), trusted.DataFormat.PEM);
  } catch (e) {
    // tslint:disable-next-line: no-console
    console.log("Error addTrustedService", e);
    return;
  }

  const pkiItemCert = certificateToPkiItemInfo(pkiCertificate);
  pkiItemCert.x509 = cert;

  return {
    payload: {
      certificate: pkiItemCert,
      id: uuid(),
      service,
    },
    type: ADD_TRUSTED_SERVICE,
  };
}

export function showModalAddTrustedService(
  serviceUrl: string,
  cert?: trusted.pki.Certificate,
) {
  return {
    payload: {
      cert,
      urlToCheck: serviceUrl,
    },
    type: SHOW_MODAL_ADD_TRUSTED_SERVICE,
  };
}

export function hideModalAddTrustedService() {
  return {
    type: HIDE_MODAL_ADD_TRUSTED_SERVICE,
  };
}

export function deleteTrustedService(url: string) {
  return {
    payload: {
      url,
    },
    type: DELETE_TRUSTED_SERVICE,
  };
}

export function showModalHTTPErr() {
  store.dispatch({
    type: SHOW_MODAL_HTTP_ERROR,
  })
}

export function hideModalHTTPErr() {
  const remote = window.electron.remote;
  remote.getCurrentWindow().minimize();
  store.dispatch(finishCurrentUrlCmd(false))
  store.dispatch({
    type: HIDE_MODAL_HTTP_ERROR,
  })
}

export function showDiagnosticModalNoCert() {
  store.dispatch({
    type: SHOW_DIAGNOSTIC_MODAL_NO_CERT,
  })
}

export function closeDiagnosticModalNoCert() {
  store.dispatch(finishCurrentUrlCmd(false))
  store.dispatch({
    type: HIDE_DIAGNOSTIC_MODAL_NO_CERT,
  })
}

export function verifyCertificateForTrustedService(url: string) {
  return (dispatch: (action: {}) => void, getState: () => any) => {
    const { trustedServices } = getState();

    const service = trustedServices.getIn(["entities", url]);

    let tcert: trusted.pki.Certificate | undefined;

    try {
      tcert = new trusted.pki.Certificate();
      tcert.import(Buffer.from(service.cert.x509), trusted.DataFormat.PEM);
    } catch (e) {
      //
    }

    const certificate = tcert;
    let certificateStatus = false;

    try {
      certificateStatus = trusted.utils.Csp.verifyCertificateChain(certificate);
    } catch (e) {
      certificateStatus = false;
    }

    dispatch({
      payload: { url, certificateStatus },
      type: VERIFY_CERTIFICATE_FOR_TRUSTED_SERVICE,
    });
  };
}
