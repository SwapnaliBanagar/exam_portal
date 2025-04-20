package com.exam.controller.admin;

import com.exam.entity.UserEntity;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exam/admin")
@CrossOrigin(origins = "http://localhost:4200") // Allow Angular frontend
public class AdminController {
    @Autowired
    UserService userService;

    @GetMapping("/getAllUsers")
    public List<UserEntity> allUsers() {
        return userService.allUsers();
    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("deleteUserById/{id}")
    public String deleteUserById(@PathVariable int id) {
        return userService.deleteUserById(id);
    }
}
