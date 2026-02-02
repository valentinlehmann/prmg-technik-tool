"use server"

import {createClient} from "@/lib/supabase/server";
import axios from "axios";
import {WifiVoucher} from "@/lib/types/wifi-voucher";

export async function getAllVouchers() {
    const client = await createClient();

    // Verify user is authenticated
    const {data, error: authError} = await client.auth.getClaims();

    if (authError || !data?.claims?.email) {
        throw new Error("User is not authenticated");
    }

    const consoleId = process.env.UNIFI_HOST_ID!;
    const siteId = process.env.UNIFI_SITE_ID!;

    return (await axios.get(`https://api.ui.com/v1/connector/consoles/${consoleId}/proxy/network/integration/v1/sites/${siteId}/hotspot/vouchers`, {
        headers: {
            'X-API-Key': process.env.UNIFI_API_KEY!
        }
    })).data.data as WifiVoucher[];
}

export async function createVoucher(note: string) {
    const client = await createClient();

    // Verify user is authenticated
    const {data, error: authError} = await client.auth.getClaims();

    if (authError || !data?.claims?.email) {
        throw new Error("User is not authenticated");
    }

    const consoleId = process.env.UNIFI_HOST_ID!;
    const siteId = process.env.UNIFI_SITE_ID!;
    const name = note + " - Erstellt von: " + data.claims.email;

    return ((await axios.post(`https://api.ui.com/v1/connector/consoles/${consoleId}/proxy/network/integration/v1/sites/${siteId}/hotspot/vouchers`, {
        name,
        timeLimitMinutes: 60 * 8, // 8 hours
    }, {
        headers: {
            'X-API-Key': process.env.UNIFI_API_KEY!
        }
    })).data.vouchers as WifiVoucher[])[0];
}

export async function deleteVoucher(voucherId: string) {
    const client = await createClient();

    // Verify user is authenticated
    const {data, error: authError} = await client.auth.getClaims();

    if (authError || !data?.claims?.email) {
        throw new Error("User is not authenticated");
    }

    const consoleId = process.env.UNIFI_HOST_ID!;
    const siteId = process.env.UNIFI_SITE_ID!;

    console.log('Deleting voucher', voucherId);

    await axios.delete(`https://api.ui.com/v1/connector/consoles/${consoleId}/proxy/network/integration/v1/sites/${siteId}/hotspot/vouchers/${voucherId}`, {
        headers: {
            'X-API-Key': process.env.UNIFI_API_KEY!
        }
    });
}

export async function getWifiCredentials() {
    const client = await createClient();

    // Verify user is authenticated
    const {data, error: authError} = await client.auth.getClaims();

    if (authError || !data?.claims?.email) {
        throw new Error("User is not authenticated");
    }

    return {
        ssid: process.env.WIFI_NETWORK_SSID!,
        password: process.env.WIFI_NETWORK_PASSWORD!,
    }
}
