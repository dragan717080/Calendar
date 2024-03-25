<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Traits\{  GetAllTrait, GetByIdTrait, DeleteTrait };
use App\Interfaces\{ ReadInterface, DeleteInterface };
use App\Interfaces\User\{ CreateInterface, UpdateInterface, AuthInterface };
use Illuminate\Support\Str;

class UserRepository implements CreateInterface, ReadInterface,
    UpdateInterface, DeleteInterface, AuthInterface
{
    use GetAllTrait;
    use GetByIdTrait;
    use DeleteTrait;

    public $model;

    public function __construct(private User $user)
    {
        $this->model = $user;
    }

    public function update(
        string $id,
        ?string $username,
        ?string $email, 
        ?string $password, 
    ): ?User
    {
        $user = $this->model->find($id);

        if (!$user) {
            return null;
        }

        if ($username !== null) {
            $user->username = $username;
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

    /**
     * 
     * Creates user with credentials (default mode).
     */
    public function create(
        string $username,
        string $email,
        string $password,
    ): User
    {
        $user = new User();

        $user->username = $username;
        $user->email = $email;
        $user->password = $password;

        // Generate an opaque string auth token
        $authToken = Str::random(20);
        $user->auth_token = $authToken;

        $user->save();

        /**
         *  When user is created, an auth token will be issued which must be used as 
         *  Bearer Token to access other routes (no token revocation for now since it's simple app)
         */
        return $user;
    }

    /**
     * 
     * Creates user with social providers (e.g. Google and Github).
     */
    public function createWithSocials(
        string $username,
        string $authToken
    ): User
    {
        $user = new User();

        $user->username = $username;
        $user->auth_token = $authToken;

        return $this->signIn($user);
    }

    public function signInWithCredentials(
        string $username,
        string $email,
        string $password
    ): User
    {
        $user = $this->model->where('email', $email)->first();
        if ($user === null) {
            return $this->create($username, $email, $password);
        }

        return $this->signIn($user);
    }

    public function signInWithSocials(
        string $username,
        string $authToken
    ): User
    {
        $user = $this->model->where('username', $username)->first();
        if ($user === null) {
            return $this->createWithSocials($username, $authToken);
        }

        return $this->signIn($user);
    }

    public function signIn(User $user): User
    {
        $user->last_login = now();
        $user->is_active = true;
        $user->save();

        return $user;
    }

    /**
     * 
     * Class 'ResponseBuilder' shall handle case where user is not found
     * and give an informative response and HTTP_NOT_FOUND
     */
    public function signOut(string $username): User|string
    {
        $user = $this->model->where('username', $username)->first();
        if ($user === null) {
            return "User with username $username doesn't exist.";
        }

        $user->is_active = false;
        $user->save();

        return $user;
    }
}
