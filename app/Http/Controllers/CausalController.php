<?php

namespace App\Http\Controllers;

use App\Http\Requests\CausalStoreRequest;
use App\Http\Requests\CausalUpdateRequest;
use App\Http\Resources\CausalResource;
use App\Models\Causal;
use Inertia\Inertia;

class CausalController extends Controller
{
    public function index()
    {
        return Inertia::render('Causals/Index', [
            'causals' => CausalResource::collection(Causal::all()),
        ]);
    }

    public function create()
    {
        return Inertia::render('Causals/Create');
    }

    public function store(CausalStoreRequest $request)
    {
        Causal::create($request->validated());

        return redirect()->route('causals.index');
    }

    public function show(Causal $causal)
    {
        return Inertia::render('Causals/Show', [
            'causal' => new CausalResource($causal),
        ]);
    }

    public function edit(Causal $causal)
    {
        return Inertia::render('Causals/Edit', [
            'causal' => new CausalResource($causal),
        ]);
    }

    public function update(CausalUpdateRequest $request, Causal $causal)
    {
        $causal->update($request->validated());

        return redirect()->route('causals.index');
    }

    public function destroy(Causal $causal)
    {
        $this->authorize('delete', $causal);
        $causal->delete();

        return redirect()->route('causals.index');
    }
}
