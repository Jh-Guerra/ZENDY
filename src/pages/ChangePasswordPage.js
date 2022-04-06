import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import ZendyTitle from 'assets/images/ZendyTitle.png';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { pColor, sColor } from 'assets/styles/zendy-css';

const ChangePasswordPage = () => {

   const [showPasswordActual, setShowPasswordActual] = React.useState(false);
   const [showPasswordNew, setShowPasswordNew] = React.useState(false);
   const [showPasswordRepitNew, setShowPasswordRepitNew] = React.useState(false);


    return (
          <div id='section-formulario'
          style={{
             height: '100vh',
             display: 'flex',
             background:'#F0F0F0',
             justifyContent: 'center',
             alignItems: 'center'
          }}>
          <div className='formulario'
             style={{
                padding: '40px',
                borderRadius: '15px',
                background: '#fff',
                width: '35%',
                border: '0px'
             }}>
          <form >
            <p
                className='formulario-title'
                style={{
                   paddingBottom: '27px',
                   fontWeight: 600,
                   textAlign: 'center',
                }}>
                Cambiar Contraseña
             </p>
            <TextField
              placeholder='Ingrese su Contraseña Actual'
              // name={value.name}
              required
              // onChange={handleFormValues}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '27px',
                boxShadow: 'rgb(0 0 0 / 4%) 5px 1px 3px',
                borderRadius: '10px' //opcional
              }}
            />
             <TextField
              placeholder='Ingrese su Nueva Contraseña'
              // name={value.name}
              required
              // onChange={handleFormValues}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '27px',
                boxShadow: 'rgb(0 0 0 / 4%) 5px 1px 3px',
                borderRadius: '10px' //opcional
              }}
            />
             <TextField
              placeholder='Repita su Nueva Contraseña'
              // name={value.name}
              required
              type={showPasswordRepitNew ? "text" : "password"}
              // onChange={handleFormValues}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '27px',
                boxShadow: 'rgb(0 0 0 / 4%) 1px 1px 3px',
                borderRadius: '10px' //opcional
              }}
              InputProps={{
               endAdornment: (
                 <InputAdornment position="end">
                   <IconButton
                     onClick={() => { setShowPasswordRepitNew(!showPasswordRepitNew) }}
                     edge="end"
                     style={{ color: pColor }}
                   >
                     {showPasswordRepitNew ? <Visibility /> : <VisibilityOff />}
                   </IconButton>
                 </InputAdornment>
               )
             }}
           
            />
             <button
                className='formulario-button'
                style={{
                   width: '100%',
                   padding: '15px',
                   fontWeight: 600,
                   marginBottom: '30px',
                   borderRadius: '24px', //opcional
                   boxShadow: 'rgb(0 0 0 / 4%) 1px 1px 3px',
                   cursor: ' pointer',
                   transition: 'border-radius 200ms ease 0s',
                   height: 'unset',
                   background:'#5A3E7A',
                   fontSize: '16px',
                   border: '0px',
                   color: 'white'
                }}
                type='submit'
             >
                ENVIAR
             </button>
             <div className='formulario-imagen'
                style={{
                   display: 'flex',
                   justifyContent: 'center'
                }}>
                   <img src={ZendyTitle} width={'250px'} height={'100px'}/>
             </div>
            </form> 
            </div>
        </div>
    );
  }

export default ChangePasswordPage;