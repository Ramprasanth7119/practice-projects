package com.example.todo.repositry;

import com.example.todo.models.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepositry extends JpaRepository<Todo, Long> {

}
