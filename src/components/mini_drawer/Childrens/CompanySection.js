import React, { Component } from "react";
import { Input, InputAdornment, Grid, IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import NewChatCall from './NewChatCall';
import { listWithUsersCount } from "services/actions/CompanyAction";
import { showBackdrop } from "services/actions/CustomAction";
import { useHistory } from "react-router-dom";
import ItemCompanyRow from "../Components/ItemCompanyRow";

const CompanySection = (props) => {
    const history = useHistory();

    const [companies, setCompanies] = React.useState([]);
    const [searchTimeout, setSearchTimeout] = React.useState(null);

    React.useEffect(() => {
        onListWithUsersCount('');
    }, []);

    const onListWithUsersCount = term => {
        props.dispatch(showBackdrop(true));
        props.dispatch(listWithUsersCount(term)).then(res => {
            setCompanies(res || []);
            props.dispatch(showBackdrop(false));
        }).catch(err => props.dispatch(showBackdrop(false)));
    };
    
    const onSearch = term => {
        clearTimeout(searchTimeout);
        setSearchTimeout(
          setTimeout(() => {
            onListWithUsersCount(term);
          }, 1000)
        );
    };
    
    const goTo = (company) => {
        history.push("/empresas/" + company.id);
    }
    
    const onSaveForm = () => {
        onListWithUsersCount('');
    }

    return (
        <div style={{height: "79vh"}}>
            <Grid container style={{height: "100%"}}>
                <Grid item xs={12} container>
                <Grid item xs={12}>
                    <div className="chatlist__heading">
                    <span className="divider-line"></span>
                    <p className="divider-content">Empresas</p>
                    <span className="divider-line"></span>
                    </div>
                    <br />
                </Grid>
                <Grid item xs={12} style={{padding: '10px'}}>
                    <Input
                    fullWidth
                    className="search_wrap"
                    type="text"
                    placeholder="Buscar empresas"
                    onChange={event => onSearch(event.target.value)}
                    disableUnderline
                    startAdornment= {
                        <InputAdornment position="start">
                        <IconButton type="button" aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        </InputAdornment>
                    }
                    />
                </Grid>
                <br />
                <Grid item xs={12} style={{minHeight: "550px"}}>
                    <div className="chat-list-items">
                    {companies.map((company, i) => {
                        return (
                        <ItemCompanyRow
                            key={i}
                            company={company}
                            goTo={goTo}
                        />
                        );
                    })}
                    </div>
                </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default CompanySection
