<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseModelController;
use App\Repositories\UserRepository;

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
            ['email', 'password']
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
