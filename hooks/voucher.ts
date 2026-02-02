"use client";

import {useMutation, useQuery} from "@tanstack/react-query";
import {createVoucher, deleteVoucher, getAllVouchers} from "@/lib/unifi/hotspot";
import {queryClient} from "@/components/client-query-client-provider";

export function useVouchers() {
    return useQuery({
        queryKey: ['vouchers'],
        queryFn: async () => {
            return await getAllVouchers();
        }
    })
}

export function useVoucherCreateMutation() {
    return useMutation({
        mutationKey: ['create-voucher'],
        mutationFn: async (note: string) => {
            return await createVoucher(note).then(() => queryClient.invalidateQueries({queryKey: ['vouchers']}));
        }
    })
}

export function useVoucherDeleteMutation() {
    return useMutation({
        mutationKey: ['delete-voucher'],
        mutationFn: async (voucherId: string) => {
            return await deleteVoucher(voucherId).then(() => queryClient.invalidateQueries({queryKey: ['vouchers']}));
        }
    })
}
