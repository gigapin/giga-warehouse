import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import type { Category } from "@/types/category";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { create, edit, show, destroy } from "@/actions/App/Http/Controllers/CategoryController";


export default function Index({ categories }: { categories: Category[] }) {

    return (
        <AppLayout>
          <Head title="Categories" />
          <div>
            <Link href={create()} className='pointer bg-blue-600 px-2 py-1'>Add Category</Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category: Category) => (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell key={category.id}>{category.name}</TableCell>
                  <TableCell>
                      <Link href={edit(category.id)} className='bg-blue-600 px-2 py-1 rounded-md text-white pointer mr-4'>Edit</Link>
                      <Link href={show(category.id)} className='bg-gray-400 px-2 py-1 rounded-md text-white pointer mr-4'>Show</Link>
                      <Link href={destroy(category.id)} className='bg-red-600 px-2 py-1 rounded-md text-white pointer'>Delete</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </AppLayout>
    );
}