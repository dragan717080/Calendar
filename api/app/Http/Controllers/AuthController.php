<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Http\ResponseBuilder;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;

class AuthController extends BaseController
{
    public function __construct(protected UserRepository $userRepository) {}

    public function signIn()
    {
        return new JsonResponse(['message' => 'This will sign in user']);
    }

    public function signOut()
    {
        return new JsonResponse(['message' => 'This will sign out user']);
    }
}
