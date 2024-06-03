<?php

namespace App\Repositories;

use App\Models\Event;
use App\Repositories\UserRepository;
use App\Repositories\Traits\{ GetAllTrait, GetByIdTrait, DeleteTrait};
use App\Interfaces\{ ReadInterface, DeleteInterface };
use App\Interfaces\Event\{ CreateInterface, UpdateInterface };

class EventRepository implements CreateInterface, ReadInterface,
    UpdateInterface, DeleteInterface
{
    use GetAllTrait;
    use GetByIdTrait;
    use DeleteTrait;

    public $model;

    public function __construct(private Event $event, private UserRepository $userRepository)
    {
        $this->model = $event;
    }

    public function getAllEventsForUser(string $username): array|string
    {
        $user = $this->userRepository->model->where('username', $username)->first();
        
        if ($user === null) {
            return "User $username does not exist.";
        }

        return $this->model->where('user_id', $user->id)->get()->toArray();
    }

    public function update(
        string $id,
        ?string $username,
        ?string $title, 
        ?string $description,
        ?string $startTime,
        ?string $endTime, 
    ): ?Event
    {
        $event = $this->model->find($id);

        if (!$event) {
            return null;
        }

        if ($title !== null) {
            $event->title = $title;
        }

        if ($description !== null) {
            $event->description = $description;
        }

        if ($startTime !== null) {
            $event->start_time = $startTime;
        }

        if ($endTime !== null) {
            $event->end_time = $endTime;
        }

        $event->save();

        return $event;
    }

    /**
     * Creates an event.
     *
     * @return Event|string Returns either:
     *   - $event: Event if related user was found.
     *   - $errorMessage: string|null In case the related user was not found, the related class 'ResponseBuilder' shall give an informative message with error code 404.
     * 
     *   The 'ResponseBuilder' class shall also handle other parameters, and middleware 'App\Http\Middleware\ValidateEmail' shall validate email.
     */
    public function create(
        string $username,
        string $title, 
        string $description,
        string $startTime,
        string $endTime
    ): Event|string
    {
        $event = new Event();

        $user = $this->userRepository->model->where('username', $username)->first();
        
        if ($user === null) {
            return "User $username does not exist.";
        }

        $event->user_id = $user->id;
        $event->title = $title;
        $event->description = $description;
        $event->start_time = $startTime;
        $event->end_time = $endTime;

        $event->save();

        return $event;
    }
}
