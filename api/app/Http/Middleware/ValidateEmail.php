<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ValidateEmail
{
    public function handle(Request $request, Closure $next)
    {
        // Key is named 'email' in 'User' model but 'userEmail' in 'Event' model
        $route = $request->route()->uri();

        $email = preg_match('/^users/', $route) ? $request->input('email') : $request->input('userEmail');

        $emailPattern = '/^(?:[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x01-\x08\x0B\x0C\x0E-\x7F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0B\x0C\x0E-\x7F\x21-\x5A\x53-\x7F]|\\[\x01-\x08\x0B\x0C\x0E-\x7F])+)\])$/i';
        $isCorrectEmailFormat = !empty($email) ? preg_match($emailPattern, $email) : true;

        if (!$isCorrectEmailFormat) {
            return response()->json(
                ['error' => 'Invalid email format.'],
                400
            );
        }

        return $next($request);
    }
}
