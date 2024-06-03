<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Event extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = ['title', 'description', 'start_time', 'end_time'];

    protected $hidden = ['id', 'user_id'];

    // This model doesn't need timestamps for created/updated
    public $timestamps = false;
}
