package com.example.todo.services;

import com.example.todo.models.User;
import com.example.todo.repositry.UserRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServices {

    @Autowired
    private UserRepositry userRepositry;

    public User createUser(User user){
        return userRepositry.save(user);
    }

    public User getUserById(Long id){
        return userRepositry.findById(id).orElseThrow(() -> new RuntimeException("Invalid User"));
    }
}
