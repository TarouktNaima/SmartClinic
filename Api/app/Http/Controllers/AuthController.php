public function login(Request $request)
{
    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['message' => 'Invalid'], 401);
    }

    $user = Auth::user();
    $token = $user->createToken('token')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user' => $user
    ]);
}