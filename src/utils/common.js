import _ from 'lodash';
import moment from 'moment';
import defaultAvatarMale from 'assets/images/defaultAvatarMale.jpg'
import defaultAvatarFemale from 'assets/images/defaultAvatarFemale.jpg'
import defaultAvatarCompany from 'assets/images/defaultCompany.png'
import avatarOthers from 'assets/images/avatarOthers.png';
import LogoZendy from 'assets/images/Zendy-logo.jpg';
import config from 'config/Config';

import unknowFileZendy from 'assets/images/unknowFileZendy.png';
import excelZendy from 'assets/images/excelZendy.png';
import wordZendy from 'assets/images/wordZendy.png';
import powerpointZendy from 'assets/images/powerpointZendy.png';
import pdfZendy from 'assets/images/pdfZendy.png';
import blocZendy from 'assets/images/blocZendy.jpg';

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

export const sexTypes = [
  { id: "M", name: "Hombre"},
  { id: "F", name: "Mujer"},
  { id: "O", name: "Otros"}, 
];

export const getSessionInfo = () => {
  return localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')) : null;
}

export const isClientUser = (role) => {
  return role ? ![1].includes(role.id) : true;
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
  const session = localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')) : {};
  const token = session.token || "";
  const user = session.user || {};
  const idCompany = user.idCompany || null;
  const idHelpDesk = user.idHelpDesk || null;

  return {
      headers: {
          ...config.headers, 
          Authorization: `token ${token}`
      },
      params: {
        idCompany: idCompany,
        // idHelpDesk: idHelpDesk
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

export const getFileImage = (extension) => {
  switch(extension){
    case "text/csv":
    case "application/vnd.oasis.opendocument.spreadsheet":
    case "application/vnd.ms-excel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return excelZendy;
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return wordZendy;
    case "application/vnd.oasis.opendocument.text":
      return blocZendy;
    case "application/pdf":
      return pdfZendy;
    case "application/vnd.ms-powerpoint":
      return powerpointZendy;
    default:
      return unknowFileZendy;
  }
}

export const isImageFile = (extension) => {
  if(extension == "image/png" || extension == "image/jpeg" || extension == ""){
    return true;
  }
  return false;
}

export const customRolesName = [
  { name: "SuperAdmin", value: "Administrador General" },
  { name: "AdminHD", value: "Administrador de Mesa de Ayuda" },
  { name: "AdminEmpresa", value: "Administrador - Empresa"},
  { name: "UserHD", value: "Mesa de Ayuda" },
  { name: "User", value: "Usuario"},
]

export const getCustomRoleName = (oldRolName) => {
  const customRol = customRolesName.find(rol => rol.name == oldRolName);

  return  customRol ? customRol.value : oldRolName;
}

export const getRoleSections = () => {
  const session = getSessionInfo();
  const role = session && session.role || {};
  const sections = role.sections || [];

  return sections;
}

export const defaultHeadersForEntryQuery = () => {
  const session = localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')) : {};
  const token = session.token || "";
  const idCompany = session.user && session.user.idCompany || null;
  const idHelpDesk = session.user && session.user.idHelpDesk || null;

  return {
      headers: {
          ...config.headers, 
          Authorization: `token ${token}`
      },
      params: {
        idCompany: idCompany,
        idHelpDesk: idHelpDesk
      }
  }
};
