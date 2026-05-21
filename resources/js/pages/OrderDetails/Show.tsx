import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import type { OrderDetail } from "@/types/order-detail";

export default function Show({ orderDetail }: { orderDetail: OrderDetail }) {
    return (
        <AppLayout>
            <Head title="Order Detail" />
            <Card>
                <CardHeader><CardTitle>Order Detail</CardTitle></CardHeader>
                <CardContent>
                    <p><strong>Order:</strong> {orderDetail.order?.order_number}</p>
                    <p><strong>Item:</strong> {orderDetail.item?.name}</p>
                    <p><strong>Delivery Date:</strong> {orderDetail.delivery_date}</p>
                    <p><strong>Qty Ordered:</strong> {orderDetail.qta_ordered}</p>
                    <p><strong>Qty Delivered:</strong> {orderDetail.qta_delivered}</p>
                    <p><strong>Delivered:</strong> {orderDetail.delivered}</p>
                    <p><strong>Note:</strong> {orderDetail.note}</p>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
