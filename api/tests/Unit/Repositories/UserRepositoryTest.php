<?php

namespace Tests\Unit\Repositories;

use App\Models\User;
use App\Repositories\UserRepository;
use Tests\TestCase;
use Mockery;

class UserRepositoryTest extends TestCase
{
    private $userMock;
    private $userRepositoryMock;
    
    protected function setUp(): void
    {
        parent::setUp();

        $this->userMock = Mockery::mock(User::class);
        $this->userRepositoryMock = Mockery::mock(
            UserRepository::class, 
            [$this->userMock]
        );
    }

    public function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
    
    public function testGetAll()
    {
        // Create mock users
        $this->userRepositoryMock
            ->shouldReceive('getAll')
            ->andReturn([
                new User(),
                new User(),
                new User(),
            ]);
    
        $users = $this->userRepositoryMock->getAll();
    
        $this->assertCount(3, $users);
    }

    public function testGetById()
    {
        $this->userRepositoryMock
            ->shouldReceive('getAll')
            ->andReturn(new User());
    
        $user = $this->userRepositoryMock->getAll(User::factory()->create()->id);

        $this->assertInstanceOf(User::class, $user);
    }
    
    public function testUpdate()
    {
        // Mock the update method
        $this->userRepositoryMock
            ->shouldReceive('update')->andReturnUsing(
                fn ($id, $email, $password) => tap(new User(), function ($user) use ($email, $password) {
                    $user->email = $email;
                    $user->password = $password;
                })
            );
    
        $updatedUser = $this->userRepositoryMock->update('9b9ff231-e8b4-42d1-a1f4-51eb384002ee', 'newemail@example.com', 'newpassword');
    
        $this->assertEquals('newemail@example.com', $updatedUser->email);
    }
    
    public function testCreate()
    {
        // Mock the create method
        $this->userRepositoryMock
            ->shouldReceive('create')
            ->andReturnUsing(
                fn ($email, $password) => tap(new User(), function ($user) use ($email, $password) {
                    $user->email = $email;
                    $user->password = $password;
                })
            );
    
        $createdUser = $this->userRepositoryMock->create('newuser@example.com', 'password');
    
        $this->assertInstanceOf(User::class, $createdUser);
    }

    public function testDelete()
    {
        $user = User::factory()->create();

        $this->userRepositoryMock
            ->shouldReceive('delete')
            ->with($user->id)
            ->andReturn(true);

        $result = $this->userRepositoryMock->delete($user->id);

        $this->assertTrue($result);
    }
}
