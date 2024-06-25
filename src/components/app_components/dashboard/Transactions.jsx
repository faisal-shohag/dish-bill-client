import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import PropTypes from "prop-types";

const Transactions = ({transactions}) => {
  // console.log(transactions)
    return (
        <div>
          <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Transactions</CardTitle>
                <CardDescription>
                  All the transactions from this user.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className=" md:block lg:block hidden">Contest</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                 {
                  transactions.map((t, index) => {
                    return  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{t.userDetails.name}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {t.userDetails.email}
                      </div>
                    </TableCell>
                    <TableCell className="md:block lg:block hidden">{t.contestDetails.name}</TableCell>
                    <TableCell className="text-right">${t.contestDetails.price}</TableCell>
                  </TableRow>
                  })
                 }
                </TableBody>
              </Table>
            </CardContent>
          </Card>
            
        </div>
    );
};

Transactions.propTypes = {
    transactions: PropTypes.array.isRequired,
};

export default Transactions;