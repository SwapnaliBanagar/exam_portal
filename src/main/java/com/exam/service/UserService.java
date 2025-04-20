package com.exam.service;

import com.exam.dto.LoginDto;
import com.exam.dto.UserDto;
import com.exam.entity.UserEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;

@Service
public interface UserService {
    public ResponseEntity<Map<String, Object>> userRegistration(UserDto userDto);
    public ResponseEntity<UserDto> login(LoginDto loginDto);

    // - -----------------------------------   Admin access --------------------------------------
    public List<UserEntity> allUsers();

    public ResponseEntity<?>getUserById( int id);

    public String deleteUserById(@PathVariable int id);
}
