<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderDetailRequest;
use App\Http\Resources\ItemResource;
use App\Http\Resources\OrderDetailResource;
use App\Http\Resources\OrderResource;
use App\Models\Item;
use App\Models\Order;
use App\Models\OrderDetail;
use Inertia\Inertia;

class OrderDetailController extends Controller
{
    public function index()
    {
        return Inertia::render('OrderDetails/Index', [
            'orderDetails' => OrderDetailResource::collection(OrderDetail::with(['order', 'item'])->get()),
        ]);
    }

    public function create()
    {
        return Inertia::render('OrderDetails/Create', [
            'orders' => OrderResource::collection(Order::all()),
            'items'  => ItemResource::collection(Item::all()),
        ]);
    }

    public function store(OrderDetailRequest $request)
    {
        OrderDetail::create($request->validated());

        return redirect()->route('order-details.index');
    }

    public function show(OrderDetail $orderDetail)
    {
        return Inertia::render('OrderDetails/Show', [
            'orderDetail' => new OrderDetailResource($orderDetail->load(['order', 'item'])),
        ]);
    }

    public function edit(OrderDetail $orderDetail)
    {
        return Inertia::render('OrderDetails/Edit', [
            'orderDetail' => new OrderDetailResource($orderDetail),
            'orders'      => OrderResource::collection(Order::all()),
            'items'       => ItemResource::collection(Item::all()),
        ]);
    }

    public function update(OrderDetailRequest $request, OrderDetail $orderDetail)
    {
        $orderDetail->update($request->validated());

        return redirect()->route('order-details.index');
    }

    public function destroy(OrderDetail $orderDetail)
    {
        $this->authorize('delete', $orderDetail);
        $orderDetail->delete();

        return redirect()->route('order-details.index');
    }
}
