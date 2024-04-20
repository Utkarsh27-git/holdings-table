import React from 'react';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const BonusRowComp  = ({ holding }) => {
    return (
        <TableRow>
        <TableCell>{holding.name}</TableCell>
        <TableCell align="right">{holding.ticker}</TableCell>
        <TableCell align="right">{holding.market_price}</TableCell>
        <TableCell align="right">{holding.latest_chg_pct}</TableCell>
        <TableCell align="right">{holding.market_value_ccy}</TableCell>
      </TableRow>
    );
};

export default BonusRowComp;