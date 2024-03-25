<?php

declare(strict_types = 1);

namespace App\Interfaces\User;

use App\Models\User;

interface AuthInterface
{
    public function signInWithCredentials(
        string $username,
        string $email,
        string $password
    ): User;

    public function signInWithSocials(
        string $username,
        string $authToken
    ): User;
}
