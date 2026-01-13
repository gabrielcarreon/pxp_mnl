<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use OwenIt\Auditing\Auditable;
use OwenIt\Auditing\Contracts\Auditable as ContractsAuditable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Booking extends Model implements ContractsAuditable, HasMedia
{
    use Auditable, HasFactory, InteractsWithMedia, SoftDeletes;

    protected $fillable = [
        'name',
        'mobile_number',
        'camera_id',
        'cost',
        'pickup_date',
        'dropoff_date',
        'rent_days',
        'social_media_url',
        'ecp',
        'ecp_mobile_number',
    ];

    public function camera(): BelongsTo
    {
        return $this->belongsTo(Camera::class, 'camera_id', 'id');
    }
}
