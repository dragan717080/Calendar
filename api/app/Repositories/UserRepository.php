<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Traits\{ GetByIdTrait, DeleteTrait };
use App\Interfaces\{ ReadInterface, DeleteInterface };
use App\Interfaces\User\{ CreateInterface, UpdateInterface };
use Illuminate\Support\Str;

class UserRepository implements CreateInterface, ReadInterface,
    UpdateInterface, DeleteInterface
{
    use GetByIdTrait;
    use DeleteTrait;

    public $model;

    public function __construct(private User $user)
    {
        $this->model = $user;
    }

    public function getAll()
    {
        return User::all();
    }

    public function update(
        string $id,
        ?string $email, 
        ?string $password, 
    ): ?User
    {
        $user = $this->model->find($id);

        if (!$user) {
            return null;
        }

        if ($email !== null) {
            $user->email = $email;
        }

        if ($password !== null) {
            $user->password = $password;
        }

        $user->save();

        return $user;
    }

    public function create(
        string $email,
        string $password,
    ): User
    {
        $user = new User();

        $user->email = $email;
        $user->password = $password;

        // Generate an opaque string auth token
        $authToken = Str::random(60);
        $user->auth_token = $authToken;

        $user->save();

        /**
         *  When user is created, an auth token will be issued which must be used as 
         *  Bearer Token to access other routes (no token revocation for now since it's simple app)
         */
        return $user;
    }

    public function signIn(string $email): User|string
    {
        $user = $this->model->where('email', $email)->first();
        if ($user === null) {
            return "User with email $email doesn't exist.";
        }

        $user->last_login = now();
        $user->is_active = true;
        $user->save();

        return $user;
    }

    public function signOut(string $email)
    {
        $user = $this->model->where('email', $email)->first();
        if ($user === null) {
            return "User with email $email doesn't exist.";
        }

        $user->is_active = false;
        $user->save();

        return $user;
    }
}
