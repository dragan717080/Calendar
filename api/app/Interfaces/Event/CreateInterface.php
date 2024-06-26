<?php

declare(strict_types = 1);

namespace App\Interfaces\Event;

interface CreateInterface
{
    public function create(
        string $username,
        string $email,
        string $password,
        string $startTime,
        string $endTime
    );
}
