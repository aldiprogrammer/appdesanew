<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminPermission
{
    public function handle(Request $request, Closure $next, string $menu): Response
    {
        $admin = Auth::guard('admin')->user();

        if (!$admin || !$admin->hasPermission($menu)) {
            abort(403, 'Anda tidak memiliki akses ke menu ini.');
        }

        return $next($request);
    }
}
