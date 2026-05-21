import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import type { Supplier } from "@/types/supplier";

export default function Show({ supplier }: { supplier: Supplier }) {
    return (
        <AppLayout>
            <Head title={supplier.company_name} />
            <Card>
                <CardHeader><CardTitle>{supplier.company_name}</CardTitle></CardHeader>
                <CardContent>
                    <p><strong>VAT Number:</strong> {supplier.vat_number}</p>
                    <p><strong>Fiscal Code:</strong> {supplier.fiscal_code}</p>
                    <p><strong>Municipality:</strong> {supplier.municipality?.name}</p>
                    <p><strong>Address:</strong> {supplier.address}</p>
                    <p><strong>SDI Code:</strong> {supplier.sdi_code}</p>
                    <p><strong>PEC:</strong> {supplier.pec}</p>
                    <p><strong>Email:</strong> {supplier.email}</p>
                    <p><strong>Phone:</strong> {supplier.phone}</p>
                    <p><strong>Service:</strong> {supplier.service}</p>
                    <p><strong>Punctuality:</strong> {supplier.punctuality}</p>
                    <p><strong>Quality:</strong> {supplier.quality}</p>
                    <p><strong>Prices:</strong> {supplier.prices}</p>
                    <p><strong>Assistance:</strong> {supplier.assistance}</p>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
