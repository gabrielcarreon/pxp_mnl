<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $month = $request->month ?? Carbon::now()->format('m');
        $year = $request->year ?? Carbon::now()->format('Y');

        return Inertia::render('calendar/index', [
            'month_booking' => fn () => Booking::orderBy('pickup_date', 'desc')
                ->whereRaw('MONTH(pickup_date) = ? and YEAR(pickup_date) = ?', [$month, $year])
                ->join('cameras', 'bookings.camera_id', '=', 'cameras.id')
                ->selectRaw('cameras.camera_name AS title, pickup_date AS start, dropoff_date as end, 1 as allDay, hsl as backgroundColor')
                ->get(),
            'month' => fn () => $month,
            'year' => fn () => $year,
            'first_transaction' => fn () => Booking::orderBy('pickup_date', 'asc')->first(),
            'pending_bookings_count' => fn () => Booking::where('status', 'pending')->count(),
            'pending_bookings' => fn () => Booking::orderBy('created_at', 'asc')
                ->where('status', 'pending')
                ->with('camera')
                ->limit(5)
                ->get(),

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
