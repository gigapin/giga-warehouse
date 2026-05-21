<?php

namespace App\Http\Controllers;

use App\Http\Requests\CustomerStoreRequest;
use App\Http\Requests\CustomerUpdateRequest;
use App\Models\Customer;
use App\Models\Municipality;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index()
    {
        return Inertia::render('Customers/Index', ['customers' => Customer::with('municipality')->get()]);
    }

    public function create()
    {
        return Inertia::render('Customers/Create', ['municipalities' => Municipality::all()]);
    }

    public function store(CustomerStoreRequest $request)
    {
        $data = $request->validated();

        Customer::create($data);

        return redirect()->route('customers.index');
    }

    public function show(Customer $customer)
    {
        return Inertia::render('Customers/Show', ['customer' => $customer->load('municipality')]);
    }

    public function edit(Customer $customer)
    {
        return Inertia::render('Customers/Edit', [
            'customer' => $customer,
            'municipalities' => Municipality::all(),
        ]);
    }

    public function update(CustomerUpdateRequest $request, Customer $customer)
    {
        $data = $request->validated();

        $customer->update($data);

        return redirect()->route('customers.index');
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();

        return redirect()->route('customers.index');
    }
}
