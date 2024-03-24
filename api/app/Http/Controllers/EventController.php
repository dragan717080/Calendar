<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\BaseModelController;
use App\Repositories\EventRepository;

class EventController extends BaseModelController
{
    protected $responseBuilder;

    public function __construct(protected EventRepository $eventRepository) {
        parent::__construct($this->eventRepository);
    }

    public function create(Request $req)
    {
        // It's more intuitive to pass user email when creating event rather than uuid
        return $this->responseBuilder->postResponse(
            $req->request->all(),
            ['userEmail', 'title', 'description', 'startTime', 'endTime']
        );
    }

    public function update(string $id, Request $req)
    {
        return $this->responseBuilder->updateResponse(
            $id,
            $req->request->all(),
            ['userEmail', 'title', 'description', 'startTime', 'endTime']
        );
    }
}
