package com.example.backend.Service.Implementation;
import org.springframework.stereotype.Service;

import com.example.backend.Models.User;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Service.Interface.UserServiceInterface;
@Service
public class UserServiceImplementation implements UserServiceInterface {
    private final UserRepository userRepository;
    public UserServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User loginUser(String username, String password) {
        User user=userRepository.findByUsernameAndPassword(username, password);
        if (user==null){
            throw new RuntimeException("Invalid username or password");
        }
        return user;
    }
    @Override
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
}
