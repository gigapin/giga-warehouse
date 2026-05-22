<?php

namespace App\Http\Controllers;

use App\Http\Requests\InventoryMovementRequest;
use App\Http\Resources\CausalResource;
use App\Http\Resources\InventoryMovementResource;
use App\Http\Resources\ItemResource;
use App\Http\Resources\OrderResource;
use App\Models\Causal;
use App\Models\InventoryMovement;
use App\Models\Item;
use App\Models\Order;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InventoryMovementController extends Controller
{
    public function index()
    {
        return Inertia::render('InventoryMovements/Index', [
            'inventoryMovements' => InventoryMovementResource::collection(
                InventoryMovement::with(['causal', 'item', 'order'])->get()
            ),
        ]);
    }

    public function create()
    {
        return Inertia::render('InventoryMovements/Create', [
            'causals' => CausalResource::collection(Causal::all()),
            'items'   => ItemResource::collection(Item::all()),
            'orders'  => OrderResource::collection(Order::all()),
        ]);
    }

    public function store(InventoryMovementRequest $request)
    {
        DB::transaction(function () use ($request) {
            InventoryMovement::create($request->validated());
        });

        return redirect()->route('inventory-movements.index');
    }

    public function show(InventoryMovement $inventoryMovement)
    {
        return Inertia::render('InventoryMovements/Show', [
            'inventoryMovement' => new InventoryMovementResource(
                $inventoryMovement->load(['causal', 'item', 'order'])
            ),
        ]);
    }

    public function edit(InventoryMovement $inventoryMovement)
    {
        return Inertia::render('InventoryMovements/Edit', [
            'inventoryMovement' => new InventoryMovementResource($inventoryMovement),
            'causals'           => CausalResource::collection(Causal::all()),
            'items'             => ItemResource::collection(Item::all()),
            'orders'            => OrderResource::collection(Order::all()),
        ]);
    }

    public function update(InventoryMovementRequest $request, InventoryMovement $inventoryMovement)
    {
        DB::transaction(function () use ($request, $inventoryMovement) {
            $inventoryMovement->update($request->validated());
        });

        return redirect()->route('inventory-movements.index');
    }

    public function destroy(InventoryMovement $inventoryMovement)
    {
        $this->authorize('delete', $inventoryMovement);
        DB::transaction(function () use ($inventoryMovement) {
            $inventoryMovement->delete();
        });

        return redirect()->route('inventory-movements.index');
    }
}
