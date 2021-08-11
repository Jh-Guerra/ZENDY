import _ from 'lodash';
import moment from 'moment';

export const saveUser = (value) => {
  if (window && window.localStorage) {
    return window.localStorage.saveObject("user", value);
  }

  return null;
}

export const LightenDarkenColor = (col, amt) => {
  
  var usePound = false;

  if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
  }

  var num = parseInt(col,16);

  var r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if  (r < 0) r = 0;

  var b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) b = 255;
  else if  (b < 0) b = 0;

  var g = (num & 0x0000FF) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}

export const trimObject = obj => {
  _.each(obj, (v, k) => {
    if (v !== undefined) {
      if (_.isObject(v)) {
        obj[k] = trimObject(v);
      } else {
        obj[k] = typeof v === 'string' ? v.replace(/\s\s+/g, ' ') : v;
      }
    }
  });
  return obj;
};

export const onlyNumbers = (text) => {
  const onlyNums = text && text.replace(/[^0-9]/g, '');
  /*if (onlyNums.length < 10) {
    return onlyNums+"";
  }else{
      const number = onlyNums.replace(
          /(\d{3})(\d{3})(\d{4})/,
          '($1) $2-$3'
      );
      return number+"";
  }*/
  return onlyNums;
}

// USERS
export const userTypes = [
  { id: "UserEmpresa", name: "Usuario Empresa"},
  { id: "AdminEmpresa", name: "Administrador de Empresa"},
  { id: "Admin", name: "Administrador General"}, 
];

export const getUserTypeName = (type) => {
  const typeO = userTypes.find(t => t.id == type);
  return typeO ? typeO.name : "";
}