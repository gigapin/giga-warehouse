<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderDetailRequest;
use App\Models\Item;
use App\Models\Order;
use App\Models\OrderDetail;
use Inertia\Inertia;

class OrderDetailController extends Controller
{
    public function index()
    {
        return Inertia::render('OrderDetails/Index', [
            'orderDetails' => OrderDetail::with(['order', 'item'])->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('OrderDetails/Create', [
            'orders' => Order::all(),
            'items' => Item::all(),
        ]);
    }

    public function store(OrderDetailRequest $request)
    {
        $data = $request->validated();

        OrderDetail::create($data);

        return redirect()->route('order-details.index');
    }

    public function show(OrderDetail $orderDetail)
    {
        return Inertia::render('OrderDetails/Show', [
            'orderDetail' => $orderDetail->load(['order', 'item']),
        ]);
    }

    public function edit(OrderDetail $orderDetail)
    {
        return Inertia::render('OrderDetails/Edit', [
            'orderDetail' => $orderDetail,
            'orders' => Order::all(),
            'items' => Item::all(),
        ]);
    }

    public function update(OrderDetailRequest $request, OrderDetail $orderDetail)
    {
        $data = $request->validated();

        $orderDetail->update($data);

        return redirect()->route('order-details.index');
    }

    public function destroy(OrderDetail $orderDetail)
    {
        $orderDetail->delete();

        return redirect()->route('order-details.index');
    }
}
