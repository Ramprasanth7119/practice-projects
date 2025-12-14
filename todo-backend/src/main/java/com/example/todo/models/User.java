package com.example.todo.models;

import io.swagger.v3.oas.annotations.info.Contact;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="UserTable")
public class User {
    @Id
    @GeneratedValue
    long id;

    @Email
    String email;
    String password;

}
