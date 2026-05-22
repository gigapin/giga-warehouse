<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderStoreRequest;
use App\Http\Requests\OrderUpdateRequest;
use App\Http\Resources\CustomerResource;
use App\Http\Resources\OrderResource;
use App\Http\Resources\SupplierResource;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Supplier;
use App\Services\OrderNumberGenerator;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('Orders/Index', [
            'orders' => OrderResource::collection(Order::with(['customer', 'supplier'])->get()),
        ]);
    }

    public function create()
    {
        return Inertia::render('Orders/Create', [
            'customers' => CustomerResource::collection(Customer::all()),
            'suppliers' => SupplierResource::collection(Supplier::all()),
        ]);
    }

    public function store(OrderStoreRequest $request)
    {
        DB::transaction(function () use ($request) {
            $data = $request->validated();
            $data['order_number'] = (new OrderNumberGenerator)->generate($data['typology']);
            Order::create($data);
        });

        return redirect()->route('orders.index');
    }

    public function show(Order $order)
    {
        return Inertia::render('Orders/Show', [
            'order' => new OrderResource($order->load(['customer', 'supplier', 'details.item'])),
        ]);
    }

    public function edit(Order $order)
    {
        return Inertia::render('Orders/Edit', [
            'order'     => new OrderResource($order),
            'customers' => CustomerResource::collection(Customer::all()),
            'suppliers' => SupplierResource::collection(Supplier::all()),
        ]);
    }

    public function update(OrderUpdateRequest $request, Order $order)
    {
        $order->update($request->validated());

        return redirect()->route('orders.index');
    }

    public function destroy(Order $order)
    {
        $this->authorize('delete', $order);
        $order->delete();

        return redirect()->route('orders.index');
    }
}
