<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemStoreRequest;
use App\Http\Requests\ItemUpdateRequest;
use App\Models\Category;
use App\Models\Item;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function index()
    {
        return Inertia::render('Items/Index', ['items' => Item::with('category')->get()]);
    }

    public function create()
    {
        return Inertia::render('Items/Create', ['categories' => Category::all()]);
    }

    public function store(ItemStoreRequest $request)
    {
        $data = $request->validated();

        Item::create($data);

        return redirect()->route('items.index');
    }

    public function show(Item $item)
    {
        return Inertia::render('Items/Show', ['item' => $item->load('category', 'suppliers')]);
    }

    public function edit(Item $item)
    {
        return Inertia::render('Items/Edit', [
            'item' => $item,
            'categories' => Category::all(),
        ]);
    }

    public function update(ItemUpdateRequest $request, Item $item)
    {
        $data = $request->validated();

        $item->update($data);

        return redirect()->route('items.index');
    }

    public function destroy(Item $item)
    {
        $item->delete();

        return redirect()->route('items.index');
    }
}
