import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import BonusRowComp from './Bonusrow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const HoldingDataset = () => {
    const [holdings, setHoldings] = useState([]);
    const [openAssetclass, setOpenAssetclass] = useState('');

useEffect(() => {
    const DataHoldings = async () => {
        try{
            const response = await axios.get('https://canopy-frontend-task.now.sh/api/holdings');
            setHoldings(response.data.payload);
            } catch (error) {
                console.log("Error fetching data: ", error);
            }
        };

DataHoldings();
       
}, []);

const asset_Unique = Array.from(new Set(holdings.map(holding => holding.asset_class)));
return (

   <div>
    {asset_Unique.map(uniqueClass => (
      <div key={uniqueClass}>
        <Paper elevation={3} onClick={() => {
          if (openAssetclass === uniqueClass){
              setOpenAssetclass('')
          } else {
              setOpenAssetclass(uniqueClass);
            }}}
            style={{ fontWeight: 'bold', padding: '15px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', backgroundColor: openAssetclass === uniqueClass ? '#D3D3D3' : 'white' }}>
               {uniqueClass}
               {openAssetclass === uniqueClass ? <ExpandLessIcon style={{ padding: '3px' , align: 'center' }} /> : <ExpandMoreIcon />}
          </Paper>
          {openAssetclass === uniqueClass && (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right" >Ticker</StyledTableCell>
            <StyledTableCell align="right">Average Price</StyledTableCell>
            <StyledTableCell align="right">Latest change percentage</StyledTableCell>
            <StyledTableCell align="right">Market Value in base CCY</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
             {holdings.filter( holdings => holdings.asset_class === uniqueClass).map((holdingmpp, pointer) => (
                <BonusRowComp key={pointer} holding={holdingmpp} />
             ))}

        </TableBody>
        </Table>
        </TableContainer>
          )}
          </div>
            ))}
        </div>
);
};

export default HoldingDataset;