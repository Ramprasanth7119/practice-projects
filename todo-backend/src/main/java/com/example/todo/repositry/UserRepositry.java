package com.example.todo.repositry;

import com.example.todo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepositry extends JpaRepository<User, Long> {
    Optional<User> getUserByEmail(String email);
}
