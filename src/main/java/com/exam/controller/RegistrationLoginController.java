package com.exam.controller;

import com.exam.dto.LoginDto;
import com.exam.dto.UserDto;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/exam")
@CrossOrigin(origins = {"http://localhost:4200", "https://swapnalibanagar.github.io"}) // Allow Angular frontend  , allow GitHub
public class RegistrationLoginController {

    @Autowired
    UserService userService;


    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> userRegistration(@RequestBody UserDto userDto) {

        return userService.userRegistration(userDto);
    }



    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody LoginDto loginDto)
    {

        return userService.login(loginDto);
    }
}
