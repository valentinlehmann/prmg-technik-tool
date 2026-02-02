import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {QrCode} from "lucide-react";
import {useWifiCredentials} from "@/hooks/hotspot";
import LoadingOverlay from "@/components/loading-overlay";
import {Field, FieldGroup} from "@/components/ui/field";
import QRCode from "react-qr-code";

export default function CredentialsDialog() {
    const {data, isLoading} = useWifiCredentials();

    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <QrCode />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="ssid">SSID</Label>
                            <Input id="ssid" name="ssid" value={data?.ssid} readOnly />
                        </Field>
                        <Field>
                            <Label htmlFor="password">Passwort</Label>
                            <Input id="password" name="password" value={data?.password} readOnly />
                        </Field>

                        <Field>
                            <Label htmlFor="qr-code">QR Code</Label>
                            <QRCode
                                id="qr-code"
                                className={"p-4"}
                                value={`WIFI:T:WPA;S:${data?.ssid};P:${data?.password};;`}
                                size={200}
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Schließen</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}