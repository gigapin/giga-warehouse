<?php

namespace App\Http\Controllers;

use App\Http\Requests\SupplierStoreRequest;
use App\Http\Requests\SupplierUpdateRequest;
use App\Http\Resources\ItemResource;
use App\Http\Resources\MunicipalityResource;
use App\Http\Resources\SupplierResource;
use App\Models\Municipality;
use App\Models\Supplier;
use Inertia\Inertia;

class SupplierController extends Controller
{
    public function index()
    {
        return Inertia::render('Suppliers/Index', [
            'suppliers' => SupplierResource::collection(Supplier::with('municipality')->get()),
        ]);
    }

    public function create()
    {
        return Inertia::render('Suppliers/Create', [
            'municipalities' => MunicipalityResource::collection(Municipality::all()),
        ]);
    }

    public function store(SupplierStoreRequest $request)
    {
        Supplier::create($request->validated());

        return redirect()->route('suppliers.index');
    }

    public function show(Supplier $supplier)
    {
        return Inertia::render('Suppliers/Show', [
            'supplier' => new SupplierResource($supplier->load('municipality', 'items')),
        ]);
    }

    public function edit(Supplier $supplier)
    {
        return Inertia::render('Suppliers/Edit', [
            'supplier'       => new SupplierResource($supplier),
            'municipalities' => MunicipalityResource::collection(Municipality::all()),
        ]);
    }

    public function update(SupplierUpdateRequest $request, Supplier $supplier)
    {
        $supplier->update($request->validated());

        return redirect()->route('suppliers.index');
    }

    public function destroy(Supplier $supplier)
    {
        $this->authorize('delete', $supplier);
        $supplier->delete();

        return redirect()->route('suppliers.index');
    }
}
