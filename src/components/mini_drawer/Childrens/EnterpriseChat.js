import React, { Component } from "react";
import ItemAvatarRow from "../Components/ItemAvatarRow";
import { Input, InputAdornment } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import NewChatCall from './NewChatCall';
import { listWithUsersCount } from "services/actions/CompanyAction";
import { showBackdrop } from "services/actions/CustomAction";

const EnterpriseChat = (props) => {

    const [companies, setCompanies] = React.useState([]);

    React.useEffect(() => {
        props.dispatch(showBackdrop(true));
        props.dispatch(listWithUsersCount()).then(res => {
            props.dispatch(showBackdrop(false));
            setCompanies(res || []);
        }).catch(err => props.dispatch(showBackdrop(false)));;
    }, []);

    return (
        <div>
            <div style={{height: "79vh"}}>
                <NewChatCall
                    isChatCompany={true} 
                />
                <div className="mini-drawer-chatlist">
                    <br />
                    <div className="chatlist__heading">
                    <span className="divider-line"></span>
                    <p className="divider-content">
                        Empresas
                    </p>
                    <span className="divider-line"></span>
                    </div>
                    <br />
                    <div style={{ position: 'relative', marginBottom: '30px' }} >
                    <br></br>
                    <Input className="search_wrap"
                        style={{ paddingLeft: '10px', width: '90%', position: 'absolute', top: '0', left: '0', right: '0', margin: 'auto' }}
                        type="text"
                        placeholder="Buscar..."
                        startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                        }
                        disableUnderline={true}
                    />
                    </div>
                    <div className="chat-list-items">
                    {companies && companies.map((item, i) => {
                        return (
                        <div key={i} onClick={() => { props.goToView(`empresas/${item.id}`) }} style={{cursor:'pointer'}}>
                            <ItemAvatarRow
                                key={i}
                                chat={item}
                                isChatCompany
                            />
                        </div>
                        );
                    })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EnterpriseChat
