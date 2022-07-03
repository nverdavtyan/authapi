<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{


    function register(Request $data)
    {
        $validator = Validator::make($data->all(), [
            'name' => ['required', 'string', 'min:2', 'max:40'],
            'lastname' => ['required', 'string', 'min:2', 'max:40'],
            'email' => ['required', 'string', 'email', 'max:191', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation fails',
                'validation_errors' => $validator->errors()
            ], 400);
        }

        $user = User::create([
            'name' => $data['name'],
            'lastname' => $data['lastname'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        return response()->json([
            'message' => 'L\'inscription  réussi',
            'data' => $user
        ], 200);
    }

    function login(Request $data)
    {
        $validator = Validator::make($data->all(), [
            'email' => ['required', 'string', 'email', 'max:191'],
            'password' => ['required', 'string', 'min:8'],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status'=>400,
                'message' => 'Validation fails',
                'validation_errors' => $validator->errors()
            ]);
        }
        else{
              $user = User::where('email', $data->email)->first();

        if (!$user || !Hash::check($data->password, $user->password)) {
            return response()->json([
                'status'=>401,
                "message" => "Email ou mot de passe est incorrect",
            ]);

        }else{
            $token = $user->createToken($user->email.'_Token')->plainTextToken;
            return response()->json([
               'status'=>200,
                'user' => $user->name,
                'token'=>$token,
                'message'=>'Connexion réussi'
            ]);
        }
 
        }

     
    }
}
