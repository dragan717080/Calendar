<?php

declare(strict_types = 1);

namespace App\Interfaces\User;

interface UpdateInterface
{
    public function update(
        string $id,
        ?string $username,
        ?string $email,
        ?string $password,
    );
}
