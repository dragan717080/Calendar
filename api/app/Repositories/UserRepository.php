<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Traits\{ GetByIdTrait, DeleteTrait };
use App\Interfaces\{ ReadInterface, DeleteInterface };
use App\Interfaces\User\{ CreateInterface, UpdateInterface };

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

        $user->save();

        return $user;
    }
}
