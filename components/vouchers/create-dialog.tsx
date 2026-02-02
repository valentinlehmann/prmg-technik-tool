import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {PlusIcon} from "lucide-react";
import {useState} from "react";
import LoadingOverlay from "@/components/loading-overlay";
import {useVoucherCreateMutation} from "@/hooks/voucher";

export function CreateVoucherDialog() {
    const [usage, setUsage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const voucherCreateMutation = useVoucherCreateMutation();

    const handleCreateVoucher = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Creating voucher with usage:", usage);
        setIsLoading(true);

        voucherCreateMutation.mutate(usage, {
            onSettled: () => {
                setIsLoading(false)
            }
        });
    }

    if (isLoading) {
        return <LoadingOverlay />
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon />
                    Gutschein erstellen
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleCreateVoucher} className="flex flex-col gap-4">
                    <DialogHeader>
                        <DialogTitle>Gutschein erstellen</DialogTitle>
                        <DialogDescription>
                            Erstelle einen neuen Gast-WLAN Gutschein.
                            Ein Gutschein ist für 8h ab der ersten Nutzung gültig.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="usage">Verwendungszweck</Label>
                            <Input id="usage"
                                   name="usage"
                                   value={usage}
                                   onChange={(e) => setUsage(e.target.value)}
                                   placeholder={"Präsentations-Laptop"}
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Abbrechen</Button>
                        </DialogClose>
                        <Button type="submit">Erstellen</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
