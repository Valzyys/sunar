/** biome-ignore-all lint/style/noNonNullAssertion: Declared env variables */
"use client";

import { useMemo } from "react";
import { useDocsSearch } from "fumadocs-core/search/client";
import {
    SearchDialog,
    SearchDialogClose,
    SearchDialogContent,
    SearchDialogFooter,
    SearchDialogHeader,
    SearchDialogIcon,
    SearchDialogInput,
    SearchDialogList,
    SearchDialogOverlay,
    type SharedProps,
} from "fumadocs-ui/components/dialog/search";

import { OramaClient } from "@oramacloud/client";

// Lazy initialization - hanya dibuat saat component pertama kali render
function createOramaClient() {
    const endpoint = process.env.NEXT_PUBLIC_ORAMA_API_ENDPOINT;
    const apiKey = process.env.NEXT_PUBLIC_ORAMA_API_KEY;

    if (!endpoint || !apiKey) {
        console.warn("Orama: Missing NEXT_PUBLIC_ORAMA_API_ENDPOINT or NEXT_PUBLIC_ORAMA_API_KEY");
        return null;
    }

    return new OramaClient({
        endpoint,
        api_key: apiKey,
    });
}

export default function CustomSearchDialog(props: SharedProps) {
    // useMemo biar client dibuat sekali, tapi tidak saat module load
    const client = useMemo(() => createOramaClient(), []);

    const { search, setSearch, query } = useDocsSearch({
        type: "orama-cloud",
        client, // bisa null kalau env missing
    });

    // Kalau client null, tampilkan UI tanpa search functionality
    if (!client) {
        return (
            <SearchDialog search={search} onSearchChange={setSearch} isLoading={false} {...props}>
                <SearchDialogOverlay />
                <SearchDialogContent>
                    <SearchDialogHeader>
                        <SearchDialogIcon />
                        <SearchDialogInput disabled placeholder="Search disabled" />
                        <SearchDialogClose />
                    </SearchDialogHeader>
                    <SearchDialogList items={null} />
                </SearchDialogContent>
            </SearchDialog>
        );
    }

    return (
        <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
            <SearchDialogOverlay />
            <SearchDialogContent>
                <SearchDialogHeader>
                    <SearchDialogIcon />
                    <SearchDialogInput />
                    <SearchDialogClose />
                </SearchDialogHeader>
                <SearchDialogList items={query.data !== "empty" ? query.data : null} />
                <SearchDialogFooter>
                    <a href="https://orama.com" rel="noreferrer noopener" className="ms-auto text-fd-muted-foreground text-xs">
                        Powered by Orama
                    </a>
                </SearchDialogFooter>
            </SearchDialogContent>
        </SearchDialog>
    );
}
