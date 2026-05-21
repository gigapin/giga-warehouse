import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import type { InventoryMovement } from "@/types/inventory-movement";

export default function Show({ inventoryMovement }: { inventoryMovement: InventoryMovement }) {
    return (
        <AppLayout>
            <Head title="Inventory Movement" />
            <Card>
                <CardHeader><CardTitle>Inventory Movement</CardTitle></CardHeader>
                <CardContent>
                    <p><strong>Item:</strong> {inventoryMovement.item?.name}</p>
                    <p><strong>Causal:</strong> {inventoryMovement.causal?.code}</p>
                    <p><strong>Type:</strong> {inventoryMovement.inventory_movement_type}</p>
                    <p><strong>Quantity:</strong> {inventoryMovement.quantity}</p>
                    <p><strong>Movement Date:</strong> {inventoryMovement.inventory_movement_date}</p>
                    <p><strong>Reference DDT:</strong> {inventoryMovement.reference_ddt}</p>
                    <p><strong>Purchase Price CAD:</strong> {inventoryMovement.purchase_price_cad}</p>
                    <p><strong>Sale Price CAD:</strong> {inventoryMovement.sale_price_cad}</p>
                    <p><strong>Order:</strong> {inventoryMovement.order?.order_number}</p>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
