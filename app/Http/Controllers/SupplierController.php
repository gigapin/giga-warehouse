<?php

namespace App\Http\Controllers;

use App\Http\Requests\SupplierStoreRequest;
use App\Http\Requests\SupplierUpdateRequest;
use App\Models\Municipality;
use App\Models\Supplier;
use Inertia\Inertia;

class SupplierController extends Controller
{
    public function index()
    {
        return Inertia::render('Suppliers/Index', ['suppliers' => Supplier::with('municipality')->get()]);
    }

    public function create()
    {
        return Inertia::render('Suppliers/Create', ['municipalities' => Municipality::all()]);
    }

    public function store(SupplierStoreRequest $request)
    {
        $data = $request->validated();

        Supplier::create($data);

        return redirect()->route('suppliers.index');
    }

    public function show(Supplier $supplier)
    {
        return Inertia::render('Suppliers/Show', ['supplier' => $supplier->load('municipality', 'items')]);
    }

    public function edit(Supplier $supplier)
    {
        return Inertia::render('Suppliers/Edit', [
            'supplier' => $supplier,
            'municipalities' => Municipality::all(),
        ]);
    }

    public function update(SupplierUpdateRequest $request, Supplier $supplier)
    {
        $data = $request->validated();

        $supplier->update($data);

        return redirect()->route('suppliers.index');
    }

    public function destroy(Supplier $supplier)
    {
        $supplier->delete();

        return redirect()->route('suppliers.index');
    }
}
