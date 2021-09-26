import _ from 'lodash';
import moment from 'moment';
import defaultAvatarMale from 'assets/images/defaultAvatarMale.jpg'
import defaultAvatarFemale from 'assets/images/defaultAvatarFemale.jpg'
import defaultAvatarCompany from 'assets/images/defaultCompany.png'
import avatarOthers from 'assets/images/avatarOthers.png';
import LogoZendy from 'assets/images/Zendy-logo.jpg';
import config from 'config/Config';

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
export const userRoles = [
  { id: "1", name: "Administrador General"},
  { id: "2", name: "Mesa de Ayuda"},
  { id: "3", name: "Administrador de Empresa"},
  { id: "4", name: "Usuario de Empresa"}
];

export const sexTypes = [
  { id: "M", name: "Hombre"},
  { id: "F", name: "Mujer"},
  { id: "O", name: "Otros"}, 
];

export const getUserTypeName = (idRole) => {
  const typeO = userRoles.find(t => t.id == idRole);
  return typeO ? typeO.name : "";
}

export const getSessionInfo = () => {
  return localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')) : null;
}

export const isClientUser = (role) => {
  return role ? ![1, 2].includes(role.id) : true;
} 

export const checkPermission = (session, permission) => {
  const userPermissions = session && session.role && session.role.permissions || [];
  return userPermissions.includes(permission);
}

export const getImageProfile = (type) => {
  switch(type){
    case "M":
      return defaultAvatarMale;
    case "F":
      return defaultAvatarFemale;
    case "O":
      return avatarOthers;
    case "Company":
      return defaultAvatarCompany;
    default:
      return LogoZendy;
  }
}

export const defaultHeaders = () => { 
  return {
      headers: {
          ...config.headers, 
          Authorization: `token ${JSON.parse(localStorage.getItem('session')).token || ''}` 
      }
  }
};

export const getCustomUrl = (apiPrefix, url) => {
  return apiPrefix + url;
}

// QUERY - Module
export const modulesQuery = [
  { id: "Recursos Humanos", name: "Recursos Humanos"},
  { id: "Tesorería", name: "Tesorería"},
];

export const statusItems = [
  "Cancelado",
  "Completado"
];