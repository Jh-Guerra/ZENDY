import React, { Component } from "react";
import { Input, InputAdornment, Grid, IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import NewChatCall from './NewChatCall';
import { listWithUsersCount } from "services/actions/CompanyAction";
import { showBackdrop } from "services/actions/CustomAction";
import { useHistory } from "react-router-dom";
import ItemCompanyRow from "../Components/ItemCompanyRow";
import { listMyRecommendations } from "services/actions/RecommendationAction";
import ItemRecommendationRow from "../Components/ItemRecommendationRow";

const AdminMyRecommendationsSection = (props) => {
    const { recommendationRx=[] } = props;
    const history = useHistory();

    React.useEffect(() => {
        onListMyRecommendations();
    }, []);

    const onListMyRecommendations = () => {
        props.dispatch(showBackdrop(true));
        props.dispatch(listMyRecommendations()).then(res => {
            props.dispatch(showBackdrop(false));
        }).catch(err => props.dispatch(showBackdrop(false)));
    };

    const goTo = (recommendation) => {
        history.push("/consultas/" + recommendation.idEntryQuery + "/recomendacion");
    }
    
    const onSaveForm = () => {
        
    }

    const recommendations = recommendationRx && recommendationRx.recommendations || [];

    return (
        <div style={{height: "79vh"}}>
            <Grid container>
                <Grid item xs={12}>
                    <div className="chatlist__heading">
                    <span className="divider-line"></span>
                    <p className="divider-content">Recomendaciones</p>
                    <span className="divider-line"></span>
                    </div>
                    <br />
                </Grid>
                <br />
                <Grid item xs={12}>
                    <div style={{height:"62vh", overflowY:"scroll"}}>
                        {recommendations.map((recommendation, i) => {
                            return (
                                <ItemRecommendationRow
                                    key={i}
                                    recommendation={recommendation}
                                    goTo={goTo}
                                />
                            );
                        })}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default AdminMyRecommendationsSection
