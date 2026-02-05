package com.example.backend.Controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.Models.User;
import com.example.backend.Service.Interface.UserServiceInterface;
import com.example.backend.Utils.JwtUtil;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserServiceInterface userService;
    public UserController(UserServiceInterface userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody User user){
        User loggedInUser=userService.loginUser(user.getUsername(),user.getPassword());
        if (loggedInUser!=null){
            String token=JwtUtil.generateToken(user.getUsername());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

    }
}
