import { Category } from "@/types/category";
import { Head } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";


export default function ShowCategory({ category }: { category: Category }) {
    return (
        <AppLayout>
            <Head title={category.name} />
            <Card>
                <CardHeader>
                    <CardTitle>{category.name}</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{category.description}</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}