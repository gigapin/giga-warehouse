import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import type { Order } from "@/types/order";

export default function Show({ order }: { order: Order }) {
    return (
        <AppLayout>
            <Head title={order.order_number} />
            <Card>
                <CardHeader><CardTitle>{order.order_number}</CardTitle></CardHeader>
                <CardContent>
                    <p><strong>Typology:</strong> {order.typology}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Customer:</strong> {order.customer?.company_name}</p>
                    <p><strong>Supplier:</strong> {order.supplier?.company_name}</p>
                    <p><strong>Request Date:</strong> {order.request_date}</p>
                    <p><strong>Closing Date:</strong> {order.closing_date}</p>
                    <p><strong>Note:</strong> {order.note}</p>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
