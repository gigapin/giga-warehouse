<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemStoreRequest;
use App\Http\Requests\ItemUpdateRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\ItemResource;
use App\Models\Category;
use App\Models\Item;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function index()
    {
        return Inertia::render('Items/Index', [
            'items' => ItemResource::collection(Item::with('category')->get()),
        ]);
    }

    public function create()
    {
        return Inertia::render('Items/Create', [
            'categories' => CategoryResource::collection(Category::all()),
        ]);
    }

    public function store(ItemStoreRequest $request)
    {
        Item::create($request->validated());

        return redirect()->route('items.index');
    }

    public function show(Item $item)
    {
        return Inertia::render('Items/Show', [
            'item' => new ItemResource($item->load('category', 'suppliers')),
        ]);
    }

    public function edit(Item $item)
    {
        return Inertia::render('Items/Edit', [
            'item'       => new ItemResource($item),
            'categories' => CategoryResource::collection(Category::all()),
        ]);
    }

    public function update(ItemUpdateRequest $request, Item $item)
    {
        $item->update($request->validated());

        return redirect()->route('items.index');
    }

    public function destroy(Item $item)
    {
        $this->authorize('delete', $item);
        $item->delete();

        return redirect()->route('items.index');
    }
}
