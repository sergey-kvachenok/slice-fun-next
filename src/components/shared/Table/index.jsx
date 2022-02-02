import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CustomTable = ({ rows = [], columns = [] }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="Table">
        <TableHead>
          <TableRow>
            {columns.map(({ label }, index) => (
              <TableCell key={index} align="left">
                {label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, index) => {
            const keys = Object.keys(row);
            return (
              <TableRow
                data-testid="main-table-row"
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {keys.map(key => (
                  <TableCell key={key} component="th" scope="row">
                    {row[key]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
