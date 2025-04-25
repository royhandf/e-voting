<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = User::
             orderBy('created_at', 'desc')
            ->paginate(10)
            ->appends($request->query());

        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    
    public function create()
    {
        $users = User::
        orderBy('nim')->get();

        return Inertia::render('Users/Create', [
            'users' => $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        {
            $request->validate([
                'name' => 'required|string|max:255',
                'nim' => 'required|integer',
                'password' => 'required|string',
                'role' =>  'required|in:admin,user',
                
            ]);
    
            User::create([
                'name' => $request->name,
                'nim' => $request->nim,
                'password' => $request->password,
                'role' => $request->role,
            ]);
    
            return redirect()->route('users.index')->with('success', 'user berhasil ditambahkan.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
    return Inertia::render('Users/Edit', [
        'user' => $user
    ]);
    }


    /**
     * Update the specified resource in storage.
     */

     public function update(Request $request, User $user)
     {
         $request->validate([
             'name' => 'required|string|max:255',
             'nim' => 'required|integer',
             'password' => 'required|string',
             'role' =>  'required|in:admin,user',
         ]);
     
         $user->update([
             'name' => $request->name,
             'nim' => $request->nim,
             'password' => bcrypt($request->password),
             'role' => $request->role,
         ]);
     
         return redirect()->route('users.index')->with('success', 'Data pengguna berhasil diperbarui.');
     }
     

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('success', 'Data pengguna berhasil dihapus.');
    }
}
