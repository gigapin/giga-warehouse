import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import type { Customer } from "@/types/customer";

export default function Show({ customer }: { customer: Customer }) {
    return (
        <AppLayout>
            <Head title={customer.company_name} />
            <Card>
                <CardHeader><CardTitle>{customer.company_name}</CardTitle></CardHeader>
                <CardContent>
                    <p><strong>VAT Number:</strong> {customer.vat_number}</p>
                    <p><strong>Fiscal Code:</strong> {customer.fiscal_code}</p>
                    <p><strong>Municipality:</strong> {customer.municipality?.name}</p>
                    <p><strong>Address:</strong> {customer.address}</p>
                    <p><strong>SDI Code:</strong> {customer.sdi_code}</p>
                    <p><strong>PEC:</strong> {customer.pec}</p>
                    <p><strong>Email:</strong> {customer.email}</p>
                    <p><strong>Phone:</strong> {customer.phone}</p>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
