import _ from 'lodash';
import moment from 'moment';

export const saveUser = (value) => {
  if (window && window.localStorage) {
    return window.localStorage.saveObject("user", value);
  }

  return null;
}