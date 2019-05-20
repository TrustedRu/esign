export const ADD_EVENT = "ADD_EVENT";
export const LOAD_ALL_EVENTS = "LOAD_ALL_EVENTS";
export const REMOVE_ALL_EVENTS = "REMOVE_ALL_EVENTS";

export const LOAD_ALL_DOCUMENTS = "LOAD_ALL_DOCUMENTS";
export const PACKAGE_DELETE_DOCUMENTS = "PACKAGE_DELETE_DOCUMENTS";
export const REMOVE_ALL_DOCUMENTS = "REMOVE_ALL_DOCUMENTS";
export const SELECT_DOCUMENT = "SELECT_DOCUMENT";
export const UNSELECT_ALL_DOCUMENTS = "UNSELECT_ALL_DOCUMENTS";
export const SELECT_ALL_DOCUMENTS = "SELECT_ALL_DOCUMENTS";

export const CHANGE_SEARCH_VALUE = "CHANGE_SEARCH_VALUE";
export const EVENTS_CHANGE_FILTER_USER_NAME = "EVENTS_CHANGE_FILTER_USER_NAME";
export const EVENTS_CHANGE_FILTER_IN_OPERATION_OBJECT = "EVENTS_CHANGE_FILTER_IN_OPERATION_OBJECT";
export const EVENTS_CHANGE_FILTER_OUT_OPERATION_OBJECT = "EVENTS_CHANGE_FILTER_OUT_OPERATION_OBJECT";
export const EVENTS_CHANGE_FILTER_OPERATION_TYPE = "CHANGE_FILTER_OPERATION_TYPE";
export const EVENTS_CHANGE_FILTER_LEVEL = "CHANGE_FILTER_LEVEL";
export const EVENTS_CHANGE_FILTER_DATE_FROM = "CHANGE_FILTER_DATE_FROM";
export const EVENTS_CHANGE_FILTER_DATE_TO = "CHANGE_FILTER_DATE_TO";
export const APPLY_EVENTS_FILTERS = "APPLY_EVENTS_FILTERS";
export const RESET_EVENTS_FILTERS = "RESET_EVENTS_FILTERS";

export const APPLY_DOCUMENTS_FILTERS = "APPLY_DOCUMENTS_FILTERS";
export const RESET_DOCUMENTS_FILTERS = "RESET_DOCUMENTS_FILTERS";
export const SIGNED = "SIGNED";
export const ENCRYPTED = "ENCRYPTED";

export const ALL = "ALL";
export const SIGN = "SIGN";
export const VERIFY = "VERIFY";
export const UNSIGN = "UNSIGN";
export const ENCRYPT = "ENCRYPT";
export const DECRYPT = "DECRYPT";
export const CERTIFICATE_GENERATION = "CERTIFICATE_GENERATION";
export const CSR_GENERATION = "CSR_GENERATION";
export const CERTIFICATE_IMPORT = "CERTIFICATE_IMPORT";
export const CRL_IMPORT = "CRL_IMPORT";
export const PKCS12_IMPORT = "PKCS12_IMPORT";
export const DELETE_CONTAINER = "DELETE_CONTAINER";
export const DELETE_CERTIFICATE = "DELETE_CERTIFICATE";

export const LOAD_ALL_CERTIFICATES = "LOAD_ALL_CERTIFICATES";
export const REMOVE_ALL_CERTIFICATES = "REMOVE_ALL_CERTIFICATES";
export const VERIFY_CERTIFICATE = "VERIFY_CERTIFICATE";
export const SELECT_SIGNER_CERTIFICATE = "SELECT_SIGNER_CERTIFICATE";

export const LOAD_ALL_CONTAINERS = "LOAD_ALL_CONTAINERS";
export const REMOVE_ALL_CONTAINERS = "REMOVE_ALL_CONTAINERS";
export const GET_CERTIFICATE_FROM_CONTAINER = "GET_CERTIFICATE_FROM_CONTAINER";
export const ACTIVE_CONTAINER = "ACTIVE_CONTAINER";

export const VERIFY_SIGNATURE = "VERIFY_SIGNATURE";
export const CHANGE_SIGNATURE_ENCODING = "CHANGE_SIGNATURE_ENCODING";
export const CHANGE_SIGNATURE_DETACHED = "CHANGE_SIGNATURE_DETACHED";
export const CHANGE_SIGNATURE_TIMESTAMP = "CHANGE_SIGNATURE_TIMESTAMP";
export const CHANGE_SIGNATURE_OUTFOLDER = "CHANGE_SIGNATURE_OUTFOLDER";
export const PACKAGE_SIGN = "PACKAGE_SIGN";
export const PACKAGE_VERIFY = "PACKAGE_VERIFY";
export const PACKAGE_ENCRYPT = "PACKAGE_ENCRYPT";
export const PACKAGE_DECRYPT = "PACKAGE_DECRYPT";

export const ADD_RECIPIENT_CERTIFICATE = "ADD_RECIPIENT_CERTIFICATE";
export const DELETE_RECIPIENT_CERTIFICATE = "DELETE_RECIPIENT_CERTIFICATE";
export const CHANGE_ECRYPT_ENCODING = "CHANGE_ECRYPT_ENCODING";
export const CHANGE_DELETE_FILES_AFTER_ENCRYPT = "CHANGE_DELETE_FILES_AFTER_ENCRYPT";
export const CHANGE_ARCHIVE_FILES_BEFORE_ENCRYPT = "CHANGE_ARCHIVE_FILES_BEFORE_ENCRYPT";
export const CHANGE_ENCRYPT_OUTFOLDER = "CHANGE_ENCRYPT_OUTFOLDER";

export const TOGGLE_SAVE_TO_DOCUMENTS = "TOGGLE_SAVE_TO_DOCUMENTS";

export const PACKAGE_SELECT_FILE = "PACKAGE_SELECT_FILE";
export const PACKAGE_DELETE_FILE = "PACKAGE_DELETE_FILE";
export const SELECT_FILE = "SELECT_FILE";
export const ACTIVE_FILE = "ACTIVE_FILE";
export const DELETE_FILE = "DELETE_FILE";
export const REMOVE_ALL_FILES = "REMOVE_ALL_FILES";
export const REMOVE_DOCUMENTS = "REMOVE_DOCUMENTS";
export const ARHIVE_DOCUMENTS = "ARHIVE_DOCUMENTS";
export const DOCUMENTS_REVIEWED = "DOCUMENTS_REVIEWED";
export const SELECT_TEMP_CONTENT_OF_SIGNED_FILES = "SELECT_TEMP_CONTENT_OF_SIGNED_FILES";

export const ADD_REMOTE_FILE = "ADD_REMOTE_FILE";
export const REMOVE_ALL_REMOTE_FILES = "REMOVE_ALL_REMOTE_FILES";
export const DOWNLOAD_REMOTE_FILE = "DOWNLOAD_REMOTE_FILE";
export const UPLOAD_FILE = "UPLOAD_FILE";
export const SET_REMOTE_FILES_PARAMS = "SET_REMOTE_FILES_PARAMS";

export const DELETE_ALL_TEMPORY_LICENSES = "DELETE_ALL_TEMPORY_LICENSES";
export const LOAD_LICENSE = "LOAD_LICENSE";
export const VERIFY_LICENSE = "VERIFY_LICENSE";

export const SUCCESS = "_SUCCESS";
export const FAIL = "_FAIL";
export const START = "_START";

export const DER = "DER";
export const BASE64 = "BASE-64";

export const CHANGE_LOCALE = "CHANGE_LOCALE";
export const RU = "RU";
export const EN = "EN";

export const MY = "MY";
export const ADDRESS_BOOK = "AddressBook";
export const ROOT = "ROOT";
export const TRUST = "TRUST";
export const CA = "CA";
export const REQUEST = "Request";

export const PROVIDER_SYSTEM = "PROVIDER_SYSTEM";
export const PROVIDER_MICROSOFT = "PROVIDER_MICROSOFT";
export const PROVIDER_CRYPTOPRO = "PROVIDER_CRYPTOPRO";

export const DEFAULT_PATH: string = window.DEFAULT_PATH;
export const DEFAULT_CERTSTORE_PATH: string = window.DEFAULT_CERTSTORE_PATH;
export const DEFAULT_DOCUMENTS_PATH = window.DEFAULT_DOCUMENTS_PATH;
export const DEFAULT_CSR_PATH = window.DEFAULT_CSR_PATH;
export const HOME_DIR: string = window.HOME_DIR;
export const RESOURCES_PATH: string = window.RESOURCES_PATH;
export const PLATFORM: string = window.PLATFORM;
export const TMP_DIR: string = window.TMP_DIR;
export const LICENSE_PATH = window.LICENSE_PATH;
export const SETTINGS_JSON = window.SETTINGS_JSON;
export const SERVICES_JSON = window.SERVICES_JSON;
export const TRUSTED_CRYPTO_LOG = window.TRUSTED_CRYPTO_LOG;
export const APP_LOG_FILE = window.APP_LOG_FILE;
export const APP_ERRORS_LOG_FILE = window.APP_ERRORS_LOG_FILE;
export const USER_NAME = window.USER_NAME;

export const SIGNWITHDIGEST_GOST3410_12_256 = "GOST R 34.10-2012 with 34.11-2012 256-bit";
export const SIGNWITHDIGEST_GOST3410_12_512 = "GOST R 34.10-2012 with 34.11-2012 512-bit";
export const GOSTR3411_94_WITH_GOSTR3410_2001 = "GOST R 34.11-94 with GOST R 34.10-2001";
export const GOSR3411_94_WITH_GOSTR3410_94 = "GOST R 34.11-94 with GOST R 34.10-94";
export const GOST3410_12_256 = "GOST R 34.10-2012 with 256-bit key";
export const GOST3410_12_512 = "GOST R 34.10-2012 with 512-bit key";
export const MD_GOST94 = "GOST R 34.11-94";
export const MD_GOST12_256 = "GOST R 34.11-2012 256-bit length";
export const MD_GOST12_512 = "GOST R 34.11-2012 512-bit length";
export const GOST2001 = "GOST R 34.10-2001";
export const GOST94 = "GOST R 34.10-94";
export const GOST89 = "GOST 28147-89";

export const ALG_RSA = "RSA";
export const ALG_GOST2001 = "gost2001";
export const ALG_GOST12_256 = "gost2012-256";
export const ALG_GOST12_512 = "gost2012-512";

export const ADD_CONNECTION = "ADD_CONNECTION";
export const ADD_LICENSE = "ADD_LICENSE";
export const REMOVE_CONNECTION = "REMOVE_CONNECTION";
export const SET_CONNECTED = "SET_CONNECTED";
export const SET_DISCONNECTED = "SET_DISCONNECTED";

export const LOCATION_MAIN = "/";
export const LOCATION_SIGN = "/sign";
export const LOCATION_ENCRYPT = "/encrypt";
export const LOCATION_CERTIFICATES = "/certificate";
export const LOCATION_CERTIFICATE_SELECTION_FOR_SIGNATURE = "/certificateForSignature";
export const LOCATION_CERTIFICATE_SELECTION_FOR_ENCRYPT = "/certificateForEncrypt";
export const LOCATION_CONTAINERS = "/containers";
export const LOCATION_DOCUMENTS = "/documents";
export const LOCATION_ABOUT = "/about";
export const LOCATION_LICENSE = "/license";
export const LOCATION_EVENTS = "/events";
export const LOCATION_SERVICES = "/services";

export const KEY_USAGE_SIGN = "sign";
export const KEY_USAGE_ENCIPHERMENT  = "encipherment";
export const KEY_USAGE_SIGN_AND_ENCIPHERMENT  = "signAndEncipherment";

export const REQUEST_TEMPLATE_DEFAULT = "default";
export const REQUEST_TEMPLATE_KEP_IP = "kepIp";
export const REQUEST_TEMPLATE_KEP_FIZ = "kepFiz";
export const REQUEST_TEMPLATE_ADDITIONAL = "additional";

export const CHANGE_DSS_AUTH_URL = "CHANGE_DSS_AUTH_URL";
export const CHANGE_DSS_REST_URL = "CHANGE_DSS_REST_URL";
export const GET_CERTIFICATES_FROM_DSS = "GET_CERTIFICATES_FROM_DSS";
export const RESET_CLOUD_CSP = "RESET_CLOUD_CSP";

export const ADD_SERVICE = "ADD_SERVICE";
export const ADD_SERVICE_CERTIFICATE = "ADD_SERVICE_CERTIFICATE";
export const DELETE_SERVICE = "DELETE_SERVICE";
export const CHANGE_SERVICE_SETTINGS = "CHANGE_SERVICE_SETTINGS";
export const CHANGE_SERVICE_NAME = "CHANGE_SERVICE_NAME";

export const CRYPTOPRO_DSS = "CRYPTOPRO_DSS";
export const CRYPTOPRO_DSS_NAME = "КриптоПро DSS";
export const CRYPTOPRO_SVS = "CRYPTOPRO_SVS";
export const CRYPTOPRO_SVS_NAME = "КриптоПро SVS 2.0";
