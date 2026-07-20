package gim.microservicio.config;

import gim.microservicio.security.JWTFilter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JWTFilter jwtFilter;

    public SecurityConfig(JWTFilter jwtFilter){
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable()) // Solo necesitas desactivarlo una vez

                .authorizeHttpRequests(auth -> auth
                        // 1. Permitir peticiones preflight (CORS) a nivel de seguridad
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        .requestMatchers(
                                "/personas/login",
                                "/personas/register",
                                "/error" // 2. IMPORTANTE: Excluir la ruta de errores para no enmascarar fallos
                        ).permitAll()

                        .anyRequest().authenticated()
                )

                // Integrar la configuración de CORS
                .cors(cors -> {
                })

                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)

                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint((request, response, authException) ->
                                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "No autenticado")
                        )
                );

        return http.build();
    }}

