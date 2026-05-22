<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerStoreRequest;
use App\Http\Requests\CustomerUpdateRequest;
use App\Http\Resources\CustomerResource;
use App\Http\Resources\MunicipalityResource;
use App\Models\Customer;
use App\Models\Municipality;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        return Inertia::render('Customers/Index', [
            'customers' => CustomerResource::collection(Customer::with('municipality')->get()),
        ]);
    }

    public function create()
    {
        return Inertia::render('Customers/Create', [
            'municipalities' => MunicipalityResource::collection(Municipality::all()),
        ]);
    }

    public function store(CustomerStoreRequest $request)
    {
        Customer::create($request->validated());

        return redirect()->route('customers.index');
    }

    public function show(Customer $customer)
    {
        return Inertia::render('Customers/Show', [
            'customer' => new CustomerResource($customer->load('municipality')),
        ]);
    }

    public function edit(Customer $customer)
    {
        return Inertia::render('Customers/Edit', [
            'customer'       => new CustomerResource($customer),
            'municipalities' => MunicipalityResource::collection(Municipality::all()),
        ]);
    }

    public function update(CustomerUpdateRequest $request, Customer $customer)
    {
        $customer->update($request->validated());

        return redirect()->route('customers.index');
    }

    public function destroy(Customer $customer)
    {
        $this->authorize('delete', $customer);
        $customer->delete();

        return redirect()->route('customers.index');
    }
}
