"use client";

import {useVouchers} from "@/hooks/hotspot";
import LoadingOverlay from "@/components/loading-overlay";
import {CreateVoucherDialog} from "@/components/vouchers/create-dialog";
import VoucherTable from "@/components/vouchers/voucher-table";
import CredentialsDialog from "@/components/vouchers/credentials-dialog";

export default function Page() {
    const {data, isLoading} = useVouchers();

    if (isLoading || !data) {
        return <LoadingOverlay />;
    }

    return (
        <div>
            <div className={"flex flex-col w-full justify-between md:flex-row gap-4 items-center mb-4"}>
                <h1 className={"text-2xl font-bold"}>Gast-WLAN</h1>
                <div className={"flex flex-row gap-4"}>
                    <CredentialsDialog />
                    <CreateVoucherDialog />
                </div>
            </div>
            <VoucherTable vouchers={data} />
        </div>
    );
}