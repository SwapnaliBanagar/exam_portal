package com.exam.serviceImpl;

import com.exam.dto.LoginDto;
import com.exam.dto.UserDto;
import com.exam.entity.UserEntity;
import com.exam.repository.UserRepository;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired // this is autowired from MySecurityConfig class
    BCryptPasswordEncoder bCryptPasswordEncoder;   // for the secure password

    @Override
    public ResponseEntity<Map<String, Object>> userRegistration(UserDto userDto) {
        Optional<UserEntity> byUserName = userRepository.findByUserName(userDto.getUserName());
        if (byUserName.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Username already exists! Please use a different unique username."));
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setUserName(userDto.getUserName());
        userEntity.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
        userEntity.setRole(userDto.getRole());
        userEntity.setFirstName(userDto.getFirstName());
        userEntity.setLastName(userDto.getLastName());
        userEntity.setEmail(userDto.getEmail());
        userEntity.setPhoneNumber(userDto.getPhoneNumber());

        UserEntity savedUser = userRepository.save(userEntity);  // Save and get the saved user with ID

        // Create a response with userId
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Your registration is successfully done! Now you can log in.");
        response.put("userId", savedUser.getUserId()); // Get the generated userId

        return ResponseEntity.ok(response);
    }



    @Override
    public ResponseEntity<UserDto> login(LoginDto loginDto) {
        Optional<UserEntity> byUserName = userRepository.findByUserName(loginDto.getUserName());

        if (byUserName.isPresent()) {
            UserEntity user = byUserName.get();

            if (bCryptPasswordEncoder.matches(loginDto.getPassword(), user.getPassword())
                    && loginDto.getRole().equals(user.getRole())) {

                // Convert UserEntity to UserDto to send as response
                UserDto userDto = new UserDto();
                userDto.setUserId(user.getUserId());  // ✅ Make sure your entity has userId
                userDto.setUserName(user.getUserName());
                userDto.setRole(user.getRole());
                userDto.setFirstName(user.getFirstName());
                userDto.setLastName(user.getLastName());
                userDto.setEmail(user.getEmail());
                userDto.setPhoneNumber(user.getPhoneNumber());

                return ResponseEntity.ok(userDto);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }


    ///---------------------------------------  Admin access ----------------------------------------------------------------------------------

    @Override
    public List<UserEntity> allUsers() {
        userRepository.findAll();
        return userRepository.findAll();
    }

    @Override
    public ResponseEntity<?> getUserById(int id) {
        Optional<UserEntity> byId = userRepository.findById(id);
        if (byId.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Id:" + id + " NOT FOUND");
        }
        return ResponseEntity.ok(byId.get());
    }

    @Override
    public String deleteUserById(int id) {
        Optional<UserEntity> byId = userRepository.findById(id);
        if (byId.isPresent()) {
            userRepository.deleteById(id);
            return "user id:" + id + " details deleted successfully";
        }
        return "User Id:" + id + " Not Found";
    }
}
