<?php

namespace Tests\Unit\Repositories;

use App\Models\User;
use App\Models\Event;
use App\Repositories\{ EventRepository, UserRepository };
use Tests\TestCase;
use Mockery;


class EventRepositoryTest extends TestCase
{
    private $eventRepositoryMock;
    private $eventMock;
    private $userMock;
    private $userRepositoryMock;

    public function setUp(): void
    {
        parent::setUp();

        $this->eventMock = Mockery::mock(Event::class);
        $this->userMock = Mockery::mock(User::class);
        $this->userRepositoryMock = Mockery::mock(UserRepository::class, [
            'model' => $this->userMock,
        ]);

        // Mock the EventRepository with expectations
        $this->eventRepositoryMock = Mockery::mock(EventRepository::class, [
            'model' => $this->eventMock,
            'userRepository' => $this->userRepositoryMock,
        ]);
    }

    public function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function testGetAll()
    {
        $this->eventRepositoryMock
            ->shouldReceive('getAll')
            ->andReturn([
                new Event(),
                new Event(),
                new Event(),
            ]);
    
        $events = $this->eventRepositoryMock->getAll();
    
        $this->assertCount(3, $events);
    }

    public function testGetById()
    {
        $this->eventRepositoryMock
            ->shouldReceive('getAll')
            ->andReturn(new Event());
    
        $event = $this->eventRepositoryMock->getAll(Event::factory()->create()->id);

        $this->assertInstanceOf(Event::class, $event);
    }

    public function testUpdate()
    {
        // Mock the update method
        $this->eventRepositoryMock
            ->shouldReceive('update')->andReturnUsing(
                fn ($id, $username, $title, $description, $startTime, $endTime) => tap(new Event(), function ($event) use ($id, $title, $description) {
                    $event->title = $title;
                    $event->description = $description;
                })
            );

        $updatedEvent = $this->eventRepositoryMock->update(
            '9b9fe005-8e43-48cf-96df-b1c31221641e',
            User::factory()->create()->email,
            'Thanksgiving lunch',
            'We will have fun time with family',
            now()->toString(),
            now()->addHour()->toString()
        );
    
        $this->assertEquals('Thanksgiving lunch', $updatedEvent->title);
    }

    public function testCreate()
    {
        // Getting a user instance, alternative is using actual user repository and getAll method
        $user = User::factory()->create();

        $params = [
            $user->email, 
            'Test Title',
            'Test Description',
            now()->toString(),
            now()->addHour()->toString()
        ];

        // Mock the Event creation
        $this->eventRepositoryMock
        ->shouldReceive('create')
        ->with(...$params)
        ->andReturnUsing(fn () => tap(new Event(), function ($event) use ($params) {
            $event->title = $params[1];
        }));

        $createdEvent = $this->eventRepositoryMock->create(...$params);

        $this->assertInstanceOf(Event::class, $createdEvent);
        $this->assertIsString($createdEvent->title);
    }

    public function testDelete()
    {
        $event = Event::factory()->create();

        $this->eventRepositoryMock
            ->shouldReceive('delete')
            ->with($event->id)
            ->andReturn(true);

        $result = $this->eventRepositoryMock->delete($event->id);

        $this->assertTrue($result);
    }
}
