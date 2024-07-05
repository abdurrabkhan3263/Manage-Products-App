import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "@tanstack/react-query";
import { dashBoardData } from "../../appwrite";
import { admin } from "../../../public/Assets";

const columns = [
  {
    id: "customerImage",
    label: "Image",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "customerName",
    label: "Customer Name",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "customerAddress",
    label: "Address",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  { id: "totalPrice", label: "Total Amount", align: "center", minWidth: 170 },
  { id: "phoneNumber", label: "Phone", align: "center", minWidth: 100 },
];

export default function TopBuyer() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { data: rows = [] } = useQuery({
    queryKey: ["row"],
    queryFn: async () => {
      return await dashBoardData.getTopBuyingCustomer();
    },
  });

  return (
    <Paper
      sx={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "rgb(30 58 138)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <TableContainer
        sx={{ maxHeight: "88%", backgroundColor: "rgb(30 58 138)" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "rgb(30 64 175)",
                    color: "white",
                    fontWeight: 900,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const columnRenders = {
                          totalPrice: (value) => `₹ ${value}`,
                          customerAddress: (value) =>
                            value.trim().length === 0
                              ? "Address is not available"
                              : value,
                          customerImage: (value) => (
                            <div className="h-11 w-11 overflow-hidden rounded-full shadow-xl">
                              <img
                                src={value || admin}
                                alt={"customer image"}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ),
                        };

                        let value = row[column.id];

                        if (columnRenders[column.id]) {
                          value = columnRenders[column.id](value);
                        }

                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{ color: "yellow", fontWeight: 500 }}
                          >
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ color: "white" }}
      />
    </Paper>
  );
}
