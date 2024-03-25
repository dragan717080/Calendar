<?php

declare(strict_types = 1);

namespace App\Interfaces\User;

interface CreateInterface
{
    public function create(
        string $username,
        string $email,
        string $password
    );
}
