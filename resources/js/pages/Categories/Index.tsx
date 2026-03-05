import { Head } from '@inertiajs/react';

import { Link } from '@inertiajs/react';
import { EllipsisVertical } from 'lucide-react';
import {
    create,
    show,
    edit,
    destroy,
} from '@/actions/App/Http/Controllers/CategoryController';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import type { Category } from '@/types/category';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Index({ categories }: { categories: Category[] }) {
    const handleCreateCategory = () => {
        create();
    };

    const dateString = (item: Date) => {
        const d = new Date(item);
        return d.toISOString().split('T')[0];
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex">
                <div className="flex items-center text-2xl">Categories</div>
                <div className="ml-auto flex items-center">
                    <Button className="pointer" onClick={handleCreateCategory}>
                        Add Category
                    </Button>
                </div>
            </div>
            <div className="mx-auto max-w-4xl py-8 sm:py-16 lg:py-20">
                <Card className="w-full overflow-hidden rounded-md border-0 pb-0">
                    {/*<CardHeader>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </CardHeader>*/}
                    <CardContent className="px-0">
                        <div className="overflow-x-auto">
                            <Table className="min-w-2xl">
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent!">
                                        <TableHead className="p-3 ps-6">
                                            #
                                        </TableHead>
                                        <TableHead className="p-2">
                                            Name
                                        </TableHead>
                                        <TableHead className="p-2">
                                            Created At
                                        </TableHead>
                                        <TableHead className="flex justify-end p-3 pe-6">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody className="dark:divide-darkborder divide-y divide-border">
                                    {categories.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="p-3 ps-6 whitespace-nowrap">
                                                <Checkbox className="cursor-pointer data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:data-[state=checked]:border-blue-500 dark:data-[state=checked]:bg-blue-500" />
                                            </TableCell>

                                            <TableCell className="whitespace-nowrap">
                                                <div>
                                                    <h6 className="text-sm font-medium">
                                                        {item.name}
                                                    </h6>
                                                </div>
                                            </TableCell>
                                            <TableCell className="whitespace-nowrap">
                                                <h6 className="text-sm font-medium">
                                                    {dateString(
                                                        item.created_at,
                                                    )}
                                                </h6>
                                            </TableCell>
                                            {/* Dropdown Menu */}
                                            <TableCell className="p-3 pe-6 whitespace-nowrap">
                                                <div className="flex items-center justify-end">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <span className="flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-muted">
                                                                <EllipsisVertical
                                                                    width={16}
                                                                    height={16}
                                                                />
                                                            </span>
                                                        </DropdownMenuTrigger>

                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem className="group flex cursor-pointer gap-3 hover:bg-accent!">
                                                                <span>
                                                                    <Link
                                                                        href={show(
                                                                            item.id,
                                                                        )}
                                                                    >
                                                                        Show
                                                                    </Link>
                                                                </span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="group flex cursor-pointer gap-3 hover:bg-accent!">
                                                                <span>
                                                                    <Link
                                                                        href={edit(
                                                                            item.id,
                                                                        )}
                                                                    >
                                                                        Edit
                                                                    </Link>
                                                                </span>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="group flex cursor-pointer gap-3 hover:bg-accent!">
                                                                <span>
                                                                    <Link
                                                                        href={destroy(
                                                                            item.id,
                                                                        )}
                                                                    >
                                                                        Delete
                                                                    </Link>
                                                                </span>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
