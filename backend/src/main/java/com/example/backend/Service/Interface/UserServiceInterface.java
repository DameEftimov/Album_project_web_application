package com.example.backend.Service.Interface;

import org.springframework.stereotype.Service;

import com.example.backend.Models.User;
@Service
public interface UserServiceInterface {
    User registerUser(User user);
    User loginUser(String username, String password);
    User findUserByUsername(String username);
}
