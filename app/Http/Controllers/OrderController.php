<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderStoreRequest;
use App\Http\Requests\OrderUpdateRequest;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Supplier;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('Orders/Index', [
            'orders' => Order::with(['customer', 'supplier'])->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Orders/Create', [
            'customers' => Customer::all(),
            'suppliers' => Supplier::all(),
        ]);
    }

    public function store(OrderStoreRequest $request)
    {
        $data = $request->validated();

        Order::create($data);

        return redirect()->route('orders.index');
    }

    public function show(Order $order)
    {
        return Inertia::render('Orders/Show', [
            'order' => $order->load(['customer', 'supplier', 'details.item']),
        ]);
    }

    public function edit(Order $order)
    {
        return Inertia::render('Orders/Edit', [
            'order' => $order,
            'customers' => Customer::all(),
            'suppliers' => Supplier::all(),
        ]);
    }

    public function update(OrderUpdateRequest $request, Order $order)
    {
        $data = $request->validated();

        $order->update($data);

        return redirect()->route('orders.index');
    }

    public function destroy(Order $order)
    {
        $order->delete();

        return redirect()->route('orders.index');
    }
}
