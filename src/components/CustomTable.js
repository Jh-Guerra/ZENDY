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
import { sColor } from 'assets/styles/zendy-css';

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 800,
    },
});

const CustomTable = props => {
    const { columns=[], rows=[], loading=false } = props;

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: sColor,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
    }))(TableCell);

    return (
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
            { loading ? <caption>Cargando...</caption> : (
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={i} onClick={() => { props.onRowClick(row) } } style={{cursor:'pointer'}}>
                      {columns.map((column, i2) => {
                        return (
                          <TableCell key={i2} align={column.align} style={{fontSize:"12px"}}>
                            {column.format ? column.format(row) : row[column.field] || ""}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            ) }
              <TableHead>
                <TableRow>
                  {columns.map((column, i) => (
                    <StyledTableCell
                      key={i}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
          { !loading && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          ) }
        </Paper>
    );
}

export default CustomTable