import { ButtonBase, Tooltip} from '@material-ui/core';
import React from 'react';

const CustomButton = props => {
    const { content=false, styleButton, iconLeft, iconRight, marginRight, marginLeft, svgRight, svgLeft, ...other} = props;
    return(
        <div className={props.styleButton}>
            <Tooltip title={props.nameTooltip || ""} arrow>
                <ButtonBase disabled={props.disabled} style={{marginLeft: props.margin ? props.margin : props.marginLeft, marginRight: props.margin ? props.margin : props.marginRight}}  {...other}>
                    { svgLeft? <div className="blaze-icons" style={{marginRight:'-4px', marginLeftt:'-4px'}}> {props.svgLeft} </div> : null}
                    {props.iconLeft ? <span className={`blaze-icons ${props.iconLeft}`} /> : null}
                    {props.content ? <> {props.children} </>: null}
                    {props.iconRight? <span className={`blaze-icons ${props.iconRight}`} /> : null}
                    { svgRight? <div className="blaze-icons" style={{marginLeft:'-4px', marginRight:'-4px'}}> {props.svgRight} </div> : null}
                </ButtonBase>
            </Tooltip>
        </div>
    )
}

export default CustomButton