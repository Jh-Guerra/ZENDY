import { makeStyles, withStyles} from '@material-ui/core';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { pColor, pLetterColor, sColor } from 'assets/styles/zendy-css';

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 800,
    },
});

const CustomTable = props => {
    const { columns=[], rows=[], loading=false, funperPage, funpage} = props;

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    const handleChangePage = (event, newPage) => {
        // setPage(newPage);
        setPage(newPage);
        if(funpage){
          console.log(newPage)
          funpage(newPage);
        }

    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        // setPage(0);
        if(funperPage){
          funperPage(+event.target.value)
         }
         setPage(0);
    };

    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: pColor,
          color: pLetterColor,
        },
        body: {
          fontSize: 14,
        },
    }))(TableCell);

    return (
        <>
          <TableContainer className={classes.container} style={{overflow:"auto", width: "100%", minWidth: "500px"}}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column, i) => (
                    <StyledTableCell
                      key={i}
                      className="table-header-cell"
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              { loading ? <caption>Cargando...</caption> : (
                <TableBody>
                  {rows.map((row, i) => {
                    //rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={i} onClick={() => { props.onRowClick(row) } } style={{cursor:'pointer'}}>
                        {columns.map((column, i2) => {
                          return (
                            <TableCell key={i2} align={column.align} className="table-header-row">
                              {column.format ? (column.format(row) || "-") : (row[column.field] || "-")}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              ) }
            </Table>
          </TableContainer>
          { !loading && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={5745}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          ) }
        </>
    );
}

export default CustomTable