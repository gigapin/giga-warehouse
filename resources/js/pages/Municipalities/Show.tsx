import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import type { Municipality } from "@/types/municipality";

export default function Show({ municipality }: { municipality: Municipality }) {
    return (
        <AppLayout>
            <Head title={municipality.name} />
            <Card>
                <CardHeader><CardTitle>{municipality.name}</CardTitle></CardHeader>
                <CardContent>
                    <p><strong>Postal Code:</strong> {municipality.postal_code}</p>
                    <p><strong>District:</strong> {municipality.district}</p>
                    <p><strong>Region:</strong> {municipality.region}</p>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
