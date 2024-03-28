<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseModelController;
use App\Repositories\UserRepository;
use Illuminate\Http\JsonResponse;

class UserController extends BaseModelController
{
    protected $responseBuilder;

    public function __construct(protected UserRepository $userRepository) {
        parent::__construct($this->userRepository);
    }

    public function create(Request $req)
    {
        return $this->responseBuilder->postResponse(
            $req->request->all(),
            ['username', 'email', 'password']
        );
    }

    public function signInWithCredentials(Request $req)
    {
        return $this->responseBuilder->signIn(
            $req->request->all(),
            ['username', 'email', 'password'],
            true
        );
    }

    public function signInWithSocials(Request $req)
    {
        return $this->responseBuilder->signIn(
            $req->request->all(),
            ['username', 'authToken'],
            false
        );
    }

    public function signOut(Request $req)
    {
        return $this->responseBuilder->signOut(
            $req->request->all(),
            ['username'],
        );
    }

    public function update(string $id, Request $req)
    {
        return $this->responseBuilder->updateResponse(
            $id,
            $req->request->all(),
            ['email', 'password']
        );
    }
}
