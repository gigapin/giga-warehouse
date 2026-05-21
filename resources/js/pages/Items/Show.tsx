import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import type { Item } from "@/types/item";

export default function Show({ item }: { item: Item }) {
    return (
        <AppLayout>
            <Head title={item.name} />
            <Card>
                <CardHeader><CardTitle>{item.name}</CardTitle></CardHeader>
                <CardContent>
                    <p><strong>Description:</strong> {item.description}</p>
                    <p><strong>Category:</strong> {item.category?.name}</p>
                    <p><strong>Available Stock:</strong> {item.available_stock}</p>
                    <p><strong>Safety Stock:</strong> {item.safety_stock}</p>
                    <p><strong>Stock Beginning Year:</strong> {item.stock_beginning_year}</p>
                    <p><strong>Progressive Annual Inbound:</strong> {item.progressive_annual_inbound}</p>
                    <p><strong>Progressive Annual Outbound:</strong> {item.progressive_annual_outbound}</p>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
