export const SIDE_DRAWER_WIDTH = 233;
export const DATE_FORMAT = 'DD/MM/YY';
export const TIME_FORMAT = 'HH:mm';
export const REACT_APP_GLIFIC_REGISTRATION_API = process.env.REACT_APP_GLIFIC_API ? process.env.REACT_APP_GLIFIC_API + '/v1/registration' : 'https://www.glificuat.coloredcow.com:8443/api/v1/registration';
export const REACT_APP_GLIFIC_AUTHENTICATION_API =
  process.env.REACT_APP_GLIFIC_API ?  process.env.REACT_APP_GLIFIC_API + '/v1/registration/send-otp': 'https://www.glificuat.coloredcow.com:8443/api/v1/registration/send-otp';
export const USER_SESSION = process.env.REACT_APP_GLIFIC_API ? process.env.REACT_APP_GLIFIC_API + '/v1/session' : 'https://www.glificuat.coloredcow.com:8443/api/v1/session';
export const RESET_PASSWORD = process.env.REACT_APP_GLIFIC_API ? process.env.REACT_APP_GLIFIC_API + '/v1/registration/reset-password' : 'https://www.glificuat.coloredcow.com:8443/api/v1/registration/reset-password';
