package com.witcher.desck.controller;

import com.witcher.desck.service.AuthService;
import com.witcher.desck.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        String result = authService.registerUser(request);
        if (result.startsWith("Помилка")) {
            return ResponseEntity.badRequest().body(result);
        }

        return ResponseEntity.ok(result);
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request){
        String result = authService.loginRequest(request);
        if (result.startsWith("Помилка")) {
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }
}
