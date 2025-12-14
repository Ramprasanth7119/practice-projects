package com.example.todo.controller;

import com.example.todo.models.Todo;
import com.example.todo.services.TodoService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@Slf4j
@RequestMapping("/todos")
public class TodoController {

    private static final Logger log = LoggerFactory.getLogger(TodoController.class);
    @Autowired
    TodoService todoService;

    @PostMapping("/create")
    ResponseEntity<Todo> createTodoController(@Valid @RequestBody Todo todo) {
        return new ResponseEntity<>(todoService.createTodo(todo), HttpStatus.CREATED);
    }


    @ApiResponses(value={
            @ApiResponse(responseCode = "200", description = "Todo retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Todo  was not found")
    })
    @GetMapping("/{id}")
    ResponseEntity<Todo> getTodoController(@PathVariable Long id) {
        try {
            Todo temp = todoService.getTodoById(id);
            return new ResponseEntity<>(temp, HttpStatus.OK);
        } catch (RuntimeException e) {
            log.info("Error");
            log.warn("");
            log.error("Error", e);
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    ResponseEntity<List<Todo>> getAllTodoController() {
        return new ResponseEntity<List<Todo>>(todoService.getAllTodo(), HttpStatus.OK);
    }

    @GetMapping("/page")
    ResponseEntity<Page<Todo>> getAllTodoByPage(@RequestParam int page, @RequestParam int size) {
        return new ResponseEntity<>(todoService.getAllTodosByPage(page, size), HttpStatus.OK);
    }

    @PutMapping("/update")
    ResponseEntity<Todo> updateTodoController(@RequestBody Todo todo) {
        return new ResponseEntity<Todo>(todoService.updateTodo(todo), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/delete/{id}")
    void deleteTodoController(@PathVariable Long id) {
        todoService.deleteTodo(id);
    }
}
