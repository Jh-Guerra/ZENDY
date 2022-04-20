import React, { createRef, useRef } from "react";
import "assets/styles/zendy-app.css";
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import ImageIcon from '@material-ui/icons/Image';
import DescriptionIcon from '@material-ui/icons/Description';
import EmojiPicker from "emoji-picker-react";
import ModalUploadImage from "components/Modals/ModalUploadImage";
import { createMessage } from "services/actions/MessageAction";
import { withRouter } from "react-router-dom";
import InputBase from '@material-ui/core/InputBase';
import ModalUploadFile from "components/Modals/ModalUploadFile";
import { Box } from "@material-ui/core";
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOff';
import { listActiveChats } from "services/actions/ChatAction";
import { Grid } from '@material-ui/core';
import { ButtonColor } from "assets/styles/zendy-css";
import { showBackdrop } from "services/actions/CustomAction";
import './MainFooter.css'

const MainFooter = props => {
  const inputRef = createRef();

  const { user = {}, chat = {} } = props;

  const [msg, setMsg] = React.useState("");
  const [resend, setResend] = React.useState(false);
  const [showEmoji, setShowEmoji] = React.useState();
  const [cursorPosition, setCursorPosition] = React.useState();
  const [showPreviewImage, setShowPreviewImage] = React.useState(false);
  const [uploadImage, setUploadImage] = React.useState(null);
  const [showPreviewFile, setShowPreviewFile] = React.useState(false);
  const [uploadFile, setUploadFile] = React.useState(null);
  const [fileExtension, setFileExtension] = React.useState(null);
  const [sendingMessage, setSendingMessage] = React.useState(false);
  const [imgPasteInput, setImgPasteInput] = React.useState(false);
  const [filePasteInput, setFilePasteInput] = React.useState(false);

  React.useEffect(() => {
    inputRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const sendMessage = (type, comentary) => {

    if (type == "text" && !msg) {
      return;
    }

    if (type == "image" && !uploadImage) {
      console.log(uploadImage);
      return;
    }

    if (type == "file" && !uploadFile) {
      return;
    }

    setSendingMessage(true)
    const imageInput = document.querySelector('#upload-image');
    const fileInput = document.querySelector('#upload-file');
    const formData = new FormData();
    formData.append("idChat", chat.id);
    formData.append("message", comentary || msg);
    formData.append("resend", resend);
    formData.append('image', imgPasteInput ? imgPasteInput : imageInput.files[0] || null);
    formData.append('file', filePasteInput ? filePasteInput : fileInput.files[0] || null);

    if (!sendingMessage) {
      props.dispatch(createMessage(formData)).then((res) => {
        setMsg("");
        setSendingMessage(false)
        setShowEmoji(null);
        setShowPreviewImage(false);
        setShowPreviewFile(false);
        setUploadImage(null);
        setUploadFile(null);
        props.dispatch(listActiveChats("", "Vigente", chat.isQuery ? true : false));
        document.getElementById('upload-image').value = "";
        document.getElementById('upload-file').value = "";
        setImgPasteInput(null);
      }).catch(error => {
        setSendingMessage(false)
        setUploadImage(null);
        setUploadFile(null);
        document.getElementById('upload-image').value = "";
        document.getElementById('upload-file').value = "";
        setImgPasteInput(null);
      })
    }
  }

  const pickEmoji = (e, { emoji }) => {
    const ref = inputRef.current;
    ref.focus();

    const start = msg.substring(0, ref.selectionStart);

    const message = msg + emoji;
    setMsg(message);
    setCursorPosition(start.length + emoji.length);
  };

  const handleShowEmojis = () => {
    inputRef.current.focus();
    setShowEmoji(!showEmoji);
  };

  const onStateChange = (e) => {
    setMsg(e.target.value);
  };

  const closeModalUpload = () => {
    setShowPreviewImage(false);
    setShowPreviewFile(false);
    setMsg("");
    setUploadImage(null);
    setUploadFile(null);
    setFileExtension(null);
    document.getElementById('upload-image').value = "";
    document.getElementById('upload-file').value = "";
  }

  function processImage(event) {
    if (event && event.target.files && event.target.files.length > 0) {
      const imageFile = event.target.files[0];
      console.log(imageFile)
      const imageUrl = URL.createObjectURL(imageFile);
      setUploadImage(imageUrl)
      setShowPreviewImage(true);
    } else {
      setUploadImage(null)
    }
  }



  var paste = document.getElementById('filePaste')

  function validateFile(file) {
    const Type = file.type
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    if (validExtensions.includes(Type)) {
      setImgPasteInput(file)
      const fileReader = new FileReader()
      fileReader.addEventListener('load', (e) => {
        const imageUrl = fileReader.result
        setUploadImage(imageUrl)
        setShowPreviewImage(true)
      })
      fileReader.readAsDataURL(file);

    } else {
      setFilePasteInput(file)
      const fileReader = new FileReader()
      fileReader.addEventListener('load', (e) => {
        const imageUrl = fileReader.result
        setUploadFile(imageUrl)
        setShowPreviewFile(true)
      })
      fileReader.readAsDataURL(file)
      setFileExtension(file.type)
    }
  }

  function showFiles(files) {
    if (files.length === undefined) {
      validateFile(files)
    } else {
      for (const file of files) {
        validateFile(file)
      }
    }
  }

  if (paste) {
    paste.addEventListener("drop", (e) => {
      e.preventDefault()
      let files = e.dataTransfer.files[0]
      showFiles(files)
    }, false);

    paste.addEventListener('paste', (event) => {
      var items = (event.clipboardData || event.originalEvent.clipboardData).items;
      var blob = items[0].getAsFile();
      if (blob !== null) {
        if (blob.type.substring(0, 5) == 'image') {
          setImgPasteInput(blob)
          const imageUrl = URL.createObjectURL(blob)
          setUploadImage(imageUrl)
          setShowPreviewImage(true)
        }
        if (blob.type.substring(0, 5) == 'appli') {
          setFilePasteInput(blob);
          const fileUrl = URL.createObjectURL(blob)
          setUploadFile(fileUrl)
          setShowPreviewFile(true)
          setFileExtension(blob.type)
        }
      }
    });
  }

  function processFile(event) {
    if (event && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setUploadFile(fileUrl)
      setShowPreviewFile(true);
      setFileExtension(file.type);
    } else {
      setUploadFile(null)
    }
  }

  const area = document.querySelector(".mainPage")

  if (area) {
    area.addEventListener("dragover", (e) => {
      e.preventDefault()
      let mensaje = document.querySelector(".contenido")
      let chat = document.querySelector(".contenido2")
      if (mensaje && chat) {
        mensaje.style.display = "block"
        chat.style.display = "none";
        setTimeout(() => {
          mensaje.style.display = "none"
          chat.style.display = "block";
        }, 4000);
      }
    })

    // area.addEventListener("dragleave", (e) => {
    //   let mensaje = document.querySelector(".contenido")
    //   let chat = document.querySelector(".contenido2")
    //   if (mensaje && chat) {
    //     mensaje.style.display = "none"
    //     chat.style.display = "block";
    //   }
    // })

    area.addEventListener("drop", (e) => {
      e.preventDefault()
      let mensaje = document.querySelector(".contenido")
      let chat = document.querySelector(".contenido2")
      if (mensaje && chat) {
        mensaje.style.display = "none"
        chat.style.display = "block";
        let files = e.dataTransfer.files[0]
        showFiles(files)
      }
    })
  }



  return (
    <>
      <Grid className="chat-footer" container alignItems="center" justify="center">
        <Grid container item xs={2} alignItems="center" justify="center">
          <Box>
            {showEmoji &&
              <IconButton onClick={handleShowEmojis}>
                <HighlightOffTwoToneIcon className="chat-footer-icon" />
              </IconButton>
            }
            <IconButton onClick={handleShowEmojis}>
              <EmojiEmotionsIcon className="chat-footer-icon" />
            </IconButton>

            {showEmoji && (
              <div className="emojiPicker-wrapper">
                <EmojiPicker onEmojiClick={pickEmoji} />
              </div>
            )}
          </Box>

          <input accept="image/*" style={{ display: 'none' }} id="upload-image" type="file" onChange={processImage} />
          <label htmlFor="upload-image" >
            <IconButton component="span">
              <ImageIcon className="chat-footer-icon" />
            </IconButton>
          </label>

          <input style={{ display: 'none' }} id="upload-file" type="file" onChange={processFile} />
          <label htmlFor="upload-file" >
            <IconButton component="span">
              <DescriptionIcon className="chat-footer-icon" />
            </IconButton>
          </label>
        </Grid>

        <Grid item xs={9}>
          <InputBase
            style={{ width: '100%' }}
            id="filePaste"
            type="text"
            placeholder="Escribe un mensaje aquí."
            onChange={onStateChange}
            value={msg}
            ref={inputRef}
            onKeyPress={event => { event.key === 'Enter' && sendMessage("text") }}
          />
        </Grid>

        <Grid item xs={1}>
          <IconButton style={{ marginLeft: "4vh" }} onClick={() => { sendMessage("text") }}>
            <SendIcon className="chat-footer-icon" />
          </IconButton>
        </Grid>
      </Grid>

      {
        showPreviewImage && (
          <ModalUploadImage
            open={showPreviewImage}
            handleClose={closeModalUpload}
            uploadImage={uploadImage}
            msg={msg}
            onChangeMessage={onStateChange}
            sendMessage={sendMessage}
          />
        )
      }
      {
        showPreviewFile && (
          <ModalUploadFile
            open={showPreviewFile}
            handleClose={closeModalUpload}
            uploadImage={uploadFile}
            fileExtension={fileExtension}
            msg={msg}
            onChangeMessage={onStateChange}
            sendMessage={sendMessage}
          />
        )
      }
    </>
  );
}

export default withRouter(MainFooter);
