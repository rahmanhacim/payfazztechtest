import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination, Button } from '@mui/material';
import { Link } from 'react-router-dom';


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});



const TableListPage = () => {
  const classes = useStyles()
  //Pagination state
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowPerPage] = useState(10)
  //Data fetch state
  const [allData, setAllData] = useState([])
  //Search table state
  const [value, setValue] = useState('')
  const [tableFilter, setTableFilter] = useState([])

  //Searching data on table function
  const filterData = (e) => {
    if (e.target.value !== ''){
        setValue(e.target.value)
        const filterTable = allData.filter(o=>Object.keys(o)
        .some(k=>String(o[k]).toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())))
        setTableFilter([filterTable])
    }
    else{
        setValue(e.target.value)
        setAllData([...allData])
    }
  }
  //Pagination function
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = event => {
    setRowPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  //Fetch data from bank json
  const getData = async () =>{
    try{
      await axios.get('bank.json')
      .then(res => setAllData(res.data.accounts))
      .catch(err => console.log(err))
    }
    catch(e){
      console.log(e)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (allData.length === 0) {
    return null
  } 

  return (
    <div className="TableListPage">
        <div> 
            <input type="text" onChange={filterData} placeholder="Search" value={value}/>
        </div>
     <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow style={{textAlignVertical: "center",textAlign: "center",justifyContent: "center",alignItems: "center"}}>
              <StyledTableCell>Category</StyledTableCell> 
              <StyledTableCell>Description</StyledTableCell> 
              <StyledTableCell>Transaction Date</StyledTableCell>
              <StyledTableCell>Debit</StyledTableCell>
              <StyledTableCell>Credit</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {value.length > 0 ? 
            tableFilter.map((item) => {
                 return (
                    <StyledTableRow key={item.id} >
                      <StyledTableCell component="th" scope="row">
                        {item.category}
                      </StyledTableCell>
                      <StyledTableCell >
                        {item.description}
                      </StyledTableCell>
                      <StyledTableCell >
                        {item.transactionDate}
                      </StyledTableCell>
                      <StyledTableCell >
                        {item.debit}
                      </StyledTableCell>
                      <StyledTableCell >
                        {item.credit}
                      </StyledTableCell>
                      <Link to={{
                        pathname: `/${item.id}`,
                        state: {category: `${item.category}`, description: `${item.description}`, transactionDate: `${item.transactionDate}`}
                        }} >
                         <Button href={`/${item.id}`}>Detail</Button>
                      </Link>
                   </StyledTableRow>)
            })
            :
            allData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => {
                return (
                  <StyledTableRow key={item.id} >
                    <StyledTableCell component="th" scope="row">
                      {item.category}
                    </StyledTableCell>
                    <StyledTableCell >
                      {item.description}
                    </StyledTableCell>
                    <StyledTableCell >
                      {item.transactionDate}
                    </StyledTableCell>
                    <StyledTableCell >
                      {item.debit}
                    </StyledTableCell>
                    <StyledTableCell >
                      {item.credit}
                    </StyledTableCell>
                    <Link to={{
                        pathname: `/${item.id}`,
                        state: {category: `${item.category}`, description: `${item.description}`, transactionDate: `${item.transactionDate}`}
                        }} >
                            Detail
                    </Link>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={allData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
}

export default TableListPage;