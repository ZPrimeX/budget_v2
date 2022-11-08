import React from "react";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
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
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../../severity-pill";
import NextLink from "next/link";

const orders = [
  {
    id: uuid(),
    ref: "CDD1049",
    amount: 230.5,
    customer: {
      name: "Salary",
    },
    createdAt: 1555016400000,
    status: "Income",
  },
  {
    id: uuid(),
    ref: "CDD1048",
    amount: 25.1,
    customer: {
      name: "Food",
    },
    createdAt: 1555016400000,
    status: "Expense",
  },
  {
    id: uuid(),
    ref: "CDD1047",
    amount: 10.99,
    customer: {
      name: "John",
    },
    createdAt: 1554930000000,
    status: "Income",
  },
  {
    id: uuid(),
    ref: "CDD1046",
    amount: 35.99,
    customer: {
      name: "Gas",
    },
    createdAt: 1554757200000,
    status: "Expense",
  },
  {
    id: uuid(),
    ref: "CDD1045",
    amount: 32.54,
    customer: {
      name: "Water bills",
    },
    createdAt: 1554670800000,
    status: "Expense",
  },
  {
    id: uuid(),
    ref: "CDD1044",
    amount: 16.76,
    customer: {
      name: "Adam",
    },
    createdAt: 1554670800000,
    status: "Income",
  },
];

const Transactions = (props) => {
  return (
    <>
      <Card {...props}>
        <CardHeader title="Latest Transactions" />
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
                {orders.map((order) => (
                  <TableRow hover key={order.id}>
                    <TableCell>{order.ref}</TableCell>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell>${order.amount}</TableCell>
                    <TableCell>{format(order.createdAt, "dd/MM/yyyy")}</TableCell>
                    <TableCell>
                      <SeverityPill
                        color={(order.status === "Income" && "success") || (order.status === "Expense" && "error")}
                      >
                        {order.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <NextLink href={"/transactions"}>
            <Button color="primary" endIcon={<ArrowRightIcon fontSize="small" />} size="small" variant="text">
              View all
            </Button>
          </NextLink>
        </Box>
      </Card>
    </>
  );
};

export default Transactions;