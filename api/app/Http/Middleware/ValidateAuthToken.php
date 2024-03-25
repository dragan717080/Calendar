<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ValidateAuthToken
{
    /**
     * Checks if auth token is in request body and if it is in desired format.
     * 
     * Use for every route but 'users'
     */
    public function handle(Request $request, Closure $next)
    {
        $authToken = $request->input('authToken');

        $isInvalidFormat = is_string($authToken) && strlen($authToken) !== 60 || !is_string($authToken);
        if ($authToken === null) {
            return response()->json(
                ['error' => 'Must provide an auth token to access this resource.'],
                403,
            );
        } else if ($isInvalidFormat) {
            return response()->json(
                ['error' => 'Invalid auth token format.'],
                400,
            );
        }

        return $next($request);
    }
}
