<?php

namespace App\Http\Controllers;

use App\Http\Requests\MunicipalityRequest;
use App\Http\Resources\MunicipalityResource;
use App\Models\Municipality;
use Inertia\Inertia;

class MunicipalityController extends Controller
{
    public function index()
    {
        return Inertia::render('Municipalities/Index', [
            'municipalities' => MunicipalityResource::collection(Municipality::all()),
        ]);
    }

    public function create()
    {
        return Inertia::render('Municipalities/Create');
    }

    public function store(MunicipalityRequest $request)
    {
        Municipality::create($request->validated());

        return redirect()->route('municipalities.index');
    }

    public function show(Municipality $municipality)
    {
        return Inertia::render('Municipalities/Show', [
            'municipality' => new MunicipalityResource($municipality),
        ]);
    }

    public function edit(Municipality $municipality)
    {
        return Inertia::render('Municipalities/Edit', [
            'municipality' => new MunicipalityResource($municipality),
        ]);
    }

    public function update(MunicipalityRequest $request, Municipality $municipality)
    {
        $municipality->update($request->validated());

        return redirect()->route('municipalities.index');
    }

    public function destroy(Municipality $municipality)
    {
        $this->authorize('delete', $municipality);
        $municipality->delete();

        return redirect()->route('municipalities.index');
    }
}
