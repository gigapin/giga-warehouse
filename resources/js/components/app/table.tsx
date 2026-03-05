'use client';

import { Link } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';
import { EllipsisVertical } from 'lucide-react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from '@/components/ui/card';
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
import { cn } from '@/lib/utils';

export interface TableCompProps {
    checkBox: boolean;
    title?: string;
    description?: string;
    namesHead: string[];
    columns: {
        name: string;
        icon?: LucideIcon;
        iconColor?: string;
        id?: number;
        href?: string;
    }[],
    linksAction?: {
        href: string;
        label: string;
    }[];
}

const TableComp = ({
    checkBox,
    title,
    description,
    namesHead,
    columns,
    linksAction,
}: TableCompProps) => {
    return (
        <div className="mx-auto max-w-4xl py-8 sm:py-16 lg:py-20">
            <Card className="w-full overflow-hidden rounded-md border-0 pb-0">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                    <div className="overflow-x-auto">
                        <Table className="min-w-2xl">
                            <TableHeader>
                                <TableRow className="hover:bg-transparent!">
                                    {checkBox && (
                                        <TableHead className="p-3 ps-6">
                                            #
                                        </TableHead>
                                    )}
                                    {namesHead.map((name) => (
                                        <TableHead className="p-2">
                                            {name}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>

                            <TableBody className="dark:divide-darkborder divide-y divide-border">
                                {columns.map((item, index) => (
                                    <TableRow key={index}>
                                        {checkBox && (
                                            <TableCell className="p-3 ps-6 whitespace-nowrap">
                                                <Checkbox className="cursor-pointer data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 dark:data-[state=checked]:border-blue-500 dark:data-[state=checked]:bg-blue-500" />
                                            </TableCell>
                                        )}

                                        <TableCell className="whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                {item.icon && (
                                                    <div
                                                        className={cn(
                                                            'flex h-9 w-9 items-center justify-center rounded-full',
                                                            item.icon,
                                                        )}
                                                    >
                                                        <item.icon
                                                            width={18}
                                                            height={18}
                                                            className={cn(
                                                                item.iconColor,
                                                            )}
                                                        />
                                                    </div>
                                                )}

                                                <div className="">
                                                    {item.href ? (
                                                        <Link href={item.href}>
                                                            <h6 className="text-sm font-medium">
                                                                {item.name}
                                                            </h6>
                                                        </Link>
                                                    ) : (
                                                        <h6 className="text-sm font-medium">
                                                            {item.name}
                                                        </h6>
                                                    )}
                                                </div>
                                            </div>
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
                                                        {linksAction?.map(
                                                            (action, idx) => (
                                                                <DropdownMenuItem
                                                                    key={idx}
                                                                    className="group flex cursor-pointer gap-3 hover:bg-accent!"
                                                                >
                                                                    <span>
                                                                        <Link
                                                                            href={
                                                                                action.href
                                                                            }
                                                                        >
                                                                            {
                                                                                action.label
                                                                            }
                                                                        </Link>
                                                                    </span>
                                                                </DropdownMenuItem>
                                                            ),
                                                        )}
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
    );
};

export default TableComp;
