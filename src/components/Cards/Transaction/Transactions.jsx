import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  CardHeader,
  Stack,
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
import WalletMenu from "../../Modals/Wallet/WalletMenu";
import { fetchTransactions, selectTransaction } from "../../../redux/features/transactionSlice";
import { useEffect } from "react";
import { selectCurrentWallet } from "../../../redux/features/walletSlice";

const Transaction = (props) => {
  const categories = useSelector(selectCategory);
  const transactions = useSelector(selectTransaction);
  const currentWallet = useSelector(selectCurrentWallet);

  useEffect(() => {
    dispatch(fetchTransactions(currentWallet.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWallet.id]);

  return (
    <>
      <Card {...props}>
        <Box display={"flex"} justifyContent="space-between" width={"95%"} height={"75px"} alignItems={"center"}>
          <Stack direction={"row"} width="350px" alignItems={"center"}>
            <CardHeader title="Transactions" />
            <WalletMenu />
          </Stack>
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
                {transactions.map((c) => (
                  <TableRow hover key={c.id}>
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.id}</TableCell>
                    <TableCell>${c.amount.toLocaleString()}</TableCell>
                    <TableCell>{c.createdAt}</TableCell>
                    <TableCell>
                      <SeverityPill
                        color={
                          (c.category_type === "income" && "success") ||
                          (c.category_type === "expense" && "error") ||
                          "warning"
                        }
                      >
                        {c.note}
                      </SeverityPill>
                    </TableCell>
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
