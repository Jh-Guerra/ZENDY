import { Checkbox, Divider, Grid, makeStyles, Typography, InputAdornment} from '@material-ui/core';
import React from 'react'
import ModalBody from './common/ModalBody'
import ModalHeader from './common/ModalHeader'
import Modal from './common/Modal'
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ModalFooter from './common/ModalFooter';
import { listCompanyNotify} from 'services/actions/UserAction';
import { showBackdrop, showSnackBar } from 'services/actions/CustomAction';
import config from 'config/Config';
import { pColor } from 'assets/styles/zendy-css';
import { checkPermission, getCustomRoleName, getImageProfile} from "utils/common";
import { updateListCompaniesNotified } from 'services/actions/NotificationAction';
import { useHistory } from 'react-router';
import defaultCompany from 'assets/images/defaultCompany.png';

const useStyles = makeStyles(theme => ({
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      width: '80%'
    },
    iconButton: {
      padding: 10,
    }
}));

const ModalNotificationCompanyTo = (props) => {

  const { open, handleClose, notificationsViewed=[], notification, onListNotificationViews, session } = props; 

  const classes = useStyles();
  const history = useHistory();

  const [companies, setCompanies] = React.useState([]);
  const [selectedCompanies, setSelectedCompanies] = React.useState([]);
  const [searchTimeout, setSearchTimeout] = React.useState(null);
  const [term, setTerm] = React.useState('');

  const companiesNotifiedIds = notificationsViewed && notificationsViewed.map(noti => noti.viewedIdCompany) || [];

  React.useEffect(() => {
    if(open){
      onListCompanies("");
    }else{
      setCompanies([]);
      setSelectedCompanies([]);
    }
    setTerm("");
  }, [open]);

  const onListCompanies = (term) => {
    props.dispatch(showBackdrop(true));
    props.dispatch(listCompanyNotify(term)).then(res => {
      const noSelectedCompanies = res && res.filter(company => !selectedCompanies.find(u => u.id == company.id));
      setCompanies([...selectedCompanies, ...noSelectedCompanies]);
      props.dispatch(showBackdrop(false));
    }).catch(err => props.dispatch(showBackdrop(false)));;
}

  const onSearch = (term) => {
    setTerm(term);
    clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        onListCompanies(term);
      }, 1000)
    )
  }

  const onSelectCompany = (company) => {
    let newSelectedCompanies = [...selectedCompanies];
    if(selectedCompanies.find(u => u.id == company.id)){
      newSelectedCompanies = newSelectedCompanies.filter(u => u.id != company.id);
    }else{
      newSelectedCompanies.push(company);
    }
    setSelectedCompanies(newSelectedCompanies);
  }

  const sendNotificationTo = () => {
    if (selectedCompanies.length == 0) {
      return props.dispatch(showSnackBar('warning', 'Necesita seleccionar una empresa'));
    }

    const companyIds = selectedCompanies.map((company) => company.id) || [];
    props.dispatch(showBackdrop(true));

    const viewedNotification = {
      companiesNotified: [...companyIds],
    }

    props.dispatch(updateListCompaniesNotified(notification.id, viewedNotification)).then(res => {
      setCompanies([]);
      onListNotificationViews &&  onListNotificationViews(notification.id);
      props.handleClose();
      props.dispatch(showSnackBar('success', 'Se notificó correctamente'));  
      props.dispatch(showBackdrop(false));
    }).catch(error => { props.dispatch(showBackdrop(false)); props.dispatch(showSnackBar("error", error.message || "")); });  
  }

  return (
        <Modal open={open} handleClose={handleClose} size="sm">
        <ModalHeader
          icon={<PersonAddIcon />}
          text="Notificar Empresa a:"   
        />
        <ModalBody>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper style={{ margin: '0px 0px 20px 0px' }} component="form" >
                  <Grid container direction="row" >
                    <InputBase
                      className={classes.input}
                      fullWidth={true}
                      style={{ flex: 1, width: '80%' }}
                      placeholder="Buscar contactos"
                      onChange={(event) => onSearch(event.target.value)}
                      inputProps={{ 'aria-label': 'Buscar contactos' }}
                      startAdornment={
                        <InputAdornment position="start" tyle={{ marginLeft: '5px' }} type="button" className={classes.iconButton} aria-label="search">
                          <SearchIcon />
                        </InputAdornment>}
                      value={term}
                    />
                  </Grid>
                </Paper>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <List style={{ padding: "0px", maxHeight: "550px", overflow: "auto" }}>
                  {
                    companies.map((company, i) => {
                      return (
                         <ListItem key={i} button divider onClick={() => { onSelectCompany(company) }} disabled={companiesNotifiedIds.includes(company.id)}>
                          <ListItemAvatar>
                            <Avatar alt="" src={company.avatar ? (config.api + company.avatar) : getImageProfile(defaultCompany)} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={`${company.name}`}
                            secondary={`${company.address}${companiesNotifiedIds.includes(company.id) && ": Ya ha sido notificado" || ""}`}
                          />
                          <ListItemSecondaryAction>
                            {
                               !companiesNotifiedIds.includes(company.id) &&
                               <Checkbox
                                  checked={selectedCompanies.find(u => u.id == company.id) != null}
                                  onChange={() => { onSelectCompany(company) }}
                                  icon={<RadioButtonUncheckedIcon />}
                                  checkedIcon={<RadioButtonCheckedIcon style={{ color: pColor }} />}
                               />
                            }
                          </ListItemSecondaryAction>
                        </ListItem>
                      )
                    })
                  }
                  {
                    companies.length === 0 && (
                      <ListItem divider style={{ padding: '12px 55px 12px 55px' }}>
                        <ListItemText
                          primary={`No hay empresas registradas `}
                        />
                      </ListItem>
                    )
                  }
                </List>
              </Grid>
            </Grid>
        </ModalBody>
        <ModalFooter 
          confirmText={"Notificar"}
          onConfirm={() => { sendNotificationTo() }}
        />
        </Modal>
      )
}

export default ModalNotificationCompanyTo