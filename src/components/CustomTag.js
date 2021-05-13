import { Box, ButtonBase, Typography } from '@material-ui/core'
import React from 'react'

const CustomTag = props => {
    const { tag } = props
    return (
        <Box display="flex" flexDirection="row">
            <Box className="tag-style" display="flex" flexDirection="row">
                <Typography className="tag-text">{tag}</Typography>
                <Box display="flex" flex={1} justifyContent="flex-end" alignItems="center">
                    <ButtonBase className="tag-delete-button" onClick={props.onDeleteTag}><span className="icon-close" /></ButtonBase>
                </Box>
            </Box>
            <Box width="8px"/>
        </Box>
    )
}

export default CustomTag