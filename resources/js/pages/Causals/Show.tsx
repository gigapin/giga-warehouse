import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import type { Causal } from "@/types/causal";

export default function Show({ causal }: { causal: Causal }) {
    return (
        <AppLayout>
            <Head title={causal.code} />
            <Card>
                <CardHeader><CardTitle>{causal.code}</CardTitle></CardHeader>
                <CardContent>
                    <p><strong>Description:</strong> {causal.description}</p>
                    <p><strong>Typology:</strong> {causal.typology}</p>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
