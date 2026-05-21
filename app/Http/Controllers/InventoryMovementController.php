<?php

namespace App\Http\Controllers;

use App\Http\Requests\InventoryMovementRequest;
use App\Models\Causal;
use App\Models\InventoryMovement;
use App\Models\Item;
use App\Models\Order;
use Inertia\Inertia;

class InventoryMovementController extends Controller
{
    public function index()
    {
        return Inertia::render('InventoryMovements/Index', [
            'inventoryMovements' => InventoryMovement::with(['causal', 'item', 'order'])->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('InventoryMovements/Create', [
            'causals' => Causal::all(),
            'items' => Item::all(),
            'orders' => Order::all(),
        ]);
    }

    public function store(InventoryMovementRequest $request)
    {
        $data = $request->validated();

        InventoryMovement::create($data);

        return redirect()->route('inventory-movements.index');
    }

    public function show(InventoryMovement $inventoryMovement)
    {
        return Inertia::render('InventoryMovements/Show', [
            'inventoryMovement' => $inventoryMovement->load(['causal', 'item', 'order']),
        ]);
    }

    public function edit(InventoryMovement $inventoryMovement)
    {
        return Inertia::render('InventoryMovements/Edit', [
            'inventoryMovement' => $inventoryMovement,
            'causals' => Causal::all(),
            'items' => Item::all(),
            'orders' => Order::all(),
        ]);
    }

    public function update(InventoryMovementRequest $request, InventoryMovement $inventoryMovement)
    {
        $data = $request->validated();

        $inventoryMovement->update($data);

        return redirect()->route('inventory-movements.index');
    }

    public function destroy(InventoryMovement $inventoryMovement)
    {
        $inventoryMovement->delete();

        return redirect()->route('inventory-movements.index');
    }
}
