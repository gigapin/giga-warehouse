<?php

namespace App\Http\Controllers;

use App\Http\Requests\CausalStoreRequest;
use App\Http\Requests\CausalUpdateRequest;
use App\Models\Causal;
use Inertia\Inertia;

class CausalController extends Controller
{
    public function index()
    {
        return Inertia::render('Causals/Index', ['causals' => Causal::all()]);
    }

    public function create()
    {
        return Inertia::render('Causals/Create');
    }

    public function store(CausalStoreRequest $request)
    {
        $data = $request->validated();

        Causal::create($data);

        return redirect()->route('causals.index');
    }

    public function show(Causal $causal)
    {
        return Inertia::render('Causals/Show', ['causal' => $causal]);
    }

    public function edit(Causal $causal)
    {
        return Inertia::render('Causals/Edit', ['causal' => $causal]);
    }

    public function update(CausalUpdateRequest $request, Causal $causal)
    {
        $data = $request->validated();

        $causal->update($data);

        return redirect()->route('causals.index');
    }

    public function destroy(Causal $causal)
    {
        $causal->delete();

        return redirect()->route('causals.index');
    }
}
