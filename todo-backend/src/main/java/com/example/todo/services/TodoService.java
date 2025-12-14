package com.example.todo.services;

import com.example.todo.models.Todo;
import com.example.todo.repositry.TodoRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    @Autowired
    private TodoRepositry todoRepositry;

    public Todo createTodo(Todo todo){
        return todoRepositry.save(todo);
    }

    public Todo getTodoById(Long id){
        return todoRepositry.findById(id).orElseThrow(() -> new RuntimeException("Todo not exist"));
    }

    public List<Todo> getAllTodo(){
        return todoRepositry.findAll();
    }


    public Page<Todo> getAllTodosByPage(int page, int size) {
        Pageable pageable = PageRequest.of(page,size);
        return todoRepositry.findAll(pageable);
    }

    public Todo updateTodo(Todo todo){
        return todoRepositry.save(todo);
    }

    public void deleteTodo(Long id){
        todoRepositry.delete(getTodoById(id));
    }
}
