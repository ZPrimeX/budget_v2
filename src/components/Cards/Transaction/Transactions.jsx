import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import { SeverityPill } from "../../severity-pill";
import CreateTransaction from "../../Modals/Transaction/CreateTransaction";
import { useSelector } from "react-redux";
import { selectCategory } from "../../../redux/features/categorySlice";

const Transaction = (props) => {
  const categories = useSelector(selectCategory);
  return (
    <>
      <Card {...props}>
        <Box display={"flex"} justifyContent="space-between" width={"95%"} height={"75px"} alignItems={"center"}>
          <CardHeader title="Transactions" />
          <Box>
            <CreateTransaction />
          </Box>
        </Box>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((c) => (
                  <TableRow hover key={c.id}>
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.title}</TableCell>
                    <TableCell>${c.note}0</TableCell>
                    <TableCell>{c.createdAt}</TableCell>
                    {/* <TableCell>
                      <SeverityPill>{c.is_built_in}</SeverityPill>
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>
    </>
  );
};

export default Transaction;