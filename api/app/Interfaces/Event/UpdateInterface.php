<?php

declare(strict_types = 1);

namespace App\Interfaces\Event;

interface UpdateInterface
{
    public function update(
        string $id,
        ?string $userEmail,
        ?string $title,
        ?string $description,
        ?string $startTime,
        ?string $endTime
    );
}
