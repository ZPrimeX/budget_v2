import React, { useEffect } from "react";
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
  Typography,
} from "@mui/material";
import { SeverityPill } from "../../severity-pill";
import { useDispatch, useSelector } from "react-redux";
import WalletMenu from "../../Modals/Wallet/WalletMenu";
import { fetchTransactions, selectTransaction } from "../../../redux/features/transactionSlice";
import { selectCurrentWallet } from "../../../redux/features/walletSlice";
import dayjs from "dayjs";

const Transaction = (props) => {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransaction);
  const currentWallet = useSelector(selectCurrentWallet);

  useEffect(() => {
    if (currentWallet?.id) {
      dispatch(fetchTransactions(currentWallet.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWallet?.id]);

  return (
    <>
      <Card {...props}>
        <Box display={"flex"} justifyContent="space-between" width={"95%"} height={"75px"} alignItems={"center"}>
          <Stack direction={"row"} width="100%" alignItems={"center"} justifyContent="space-between">
            <CardHeader title="Transactions" />
            <Box display={"flex"} alignItems="center" gap={2}>
              <Typography>Current Wallet: </Typography>
              <WalletMenu />
            </Box>
          </Stack>
        </Box>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                  {/* <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell> */}
                  <TableCell>Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((c) => (
                  <TableRow hover key={c.id}>
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.category.title}</TableCell>
                    <TableCell>${c.amount.toLocaleString()}</TableCell>
                    <TableCell>{dayjs(c.date).format("HH:mm | DD/MM/YYYY")}</TableCell>
                    <TableCell>
                      <SeverityPill
                        color={
                          (c.category.category_type === "income" && "success") ||
                          (c.category.category_type === "expense" && "error") ||
                          "warning"
                        }
                      >
                        {c.category.category_type}
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
