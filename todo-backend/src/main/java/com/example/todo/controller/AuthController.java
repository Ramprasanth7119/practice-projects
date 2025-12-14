package com.example.todo.controller;

import com.example.todo.models.User;
import com.example.todo.repositry.UserRepositry;
import com.example.todo.services.UserServices;
import com.example.todo.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    @Autowired
    private  UserRepositry userRepositry;
    @Autowired
    private UserServices userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, String> body){
        String email = body.get("email");
        String password = passwordEncoder.encode(body.get("password"));

        if(userRepositry.getUserByEmail(email).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered.");
        }

        userService.createUser(User.builder().email(email).password(password).build());

        return new ResponseEntity("Successfully registered", HttpStatus.ACCEPTED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> body){
        String email = body.get("email");
        String password = body.get("password");

        var userPresent = userRepositry.getUserByEmail(email);

        if(userPresent.isEmpty()){
            return new ResponseEntity<>("User not registered!", HttpStatus.UNAUTHORIZED);
        }

        User user = userPresent.get();
        if(!passwordEncoder.matches(password, user.getPassword())){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid password");
        }

        String token = jwtUtil.generateToken(email);
        return ResponseEntity.ok(Map.of("token",  token));
    }
}
