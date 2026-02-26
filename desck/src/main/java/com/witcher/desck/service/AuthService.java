package com.witcher.desck.service;
import com.witcher.desck.model.User;
import com.witcher.desck.repositorys.UserRepository;
import org.springframework.stereotype.Service;


@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String registerUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Помилка: Відьмак з такою поштою вже існує!";
        }


        User newUser = new User(
                request.getUsername(),
                request.getEmail(),
                request.getPassword()
        );


        userRepository.save(newUser);
        return "Успіх: Мутація пройдена, відьмака зареєстровано!";
    }
    public String loginRequest(LoginRequest request){
        var userOption = userRepository.findByEmail(request.getEmail());
        if (userOption.isEmpty() || !userOption.get().getPassword().equals(request.getPassword())) {
            return "Помилка: Невірна пошта або пароль!";
        }
        return "Успіх, ти відьмак";
    }
}