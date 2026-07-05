<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // 🔒 هنا حددنا الـ URLs دياول الـ React بالظبط (ممنوع النجمة مع الـ Credentials)
    'allowed_origins' => [],

   'allowed_origins_patterns' => [
    '/^http:\/\/localhost:\d+$/',
    '/^http:\/\/127\.0\.0\.1:\d+$/'
],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // 🔑 رديناها true حيت الـ Axios كيصيفط الـ Authorization Token
    'supports_credentials' => true,

];