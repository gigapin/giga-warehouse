<?php

namespace App\Http\Controllers;

use App\Http\Requests\MunicipalityRequest;
use App\Models\Municipality;
use Inertia\Inertia;

class MunicipalityController extends Controller
{
    public function index()
    {
        return Inertia::render('Municipalities/Index', ['municipalities' => Municipality::all()]);
    }

    public function create()
    {
        return Inertia::render('Municipalities/Create');
    }

    public function store(MunicipalityRequest $request)
    {
        $data = $request->validated();

        Municipality::create($data);

        return redirect()->route('municipalities.index');
    }

    public function show(Municipality $municipality)
    {
        return Inertia::render('Municipalities/Show', ['municipality' => $municipality]);
    }

    public function edit(Municipality $municipality)
    {
        return Inertia::render('Municipalities/Edit', ['municipality' => $municipality]);
    }

    public function update(MunicipalityRequest $request, Municipality $municipality)
    {
        $data = $request->validated();

        $municipality->update($data);

        return redirect()->route('municipalities.index');
    }

    public function destroy(Municipality $municipality)
    {
        $municipality->delete();

        return redirect()->route('municipalities.index');
    }
}
