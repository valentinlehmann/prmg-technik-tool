import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react"
import {WifiVoucher} from "@/lib/types/wifi-voucher";
import dayjs from "dayjs";
import {useVoucherDeleteMutation} from "@/hooks/voucher";

export default function VoucherTable(props: {
    vouchers: WifiVoucher[]
}) {
    const { vouchers } = props;
    const deleteMutation = useVoucherDeleteMutation();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Notiz</TableHead>
                    <TableHead>Erstellungsdatum</TableHead>
                    <TableHead>Aktivierungsdatum</TableHead>
                    <TableHead className="text-right">Verwalten</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    vouchers.map((voucher) => (
                        <TableRow key={voucher.id}>
                            <TableCell className="font-medium">{voucher.code}</TableCell>
                            <TableCell>{voucher.name || "-"}</TableCell>
                            <TableCell>{dayjs(voucher.createdAt).format("DD.MM.YYYY HH:mm:ss")}</TableCell>
                            <TableCell>{voucher.activatedAt ? dayjs(voucher.activatedAt).format("DD.MM.YYYY HH:mm:ss") : "Noch nicht aktiviert"}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="size-8">
                                            <MoreHorizontalIcon />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem variant="destructive" onClick={() => deleteMutation.mutate(voucher.id)}>
                                            Löschen
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}
