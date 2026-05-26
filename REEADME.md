# Microservicios Gestion-Gimnasio

## Tecnologías
- Java
- Spring Boot
- MySQL
- Docker
- REST API

## Microservicios
- Persona
- Rutina

## Cómo ejecutar
...



Implementé autenticación stateless usando Spring Security y JWT.
El login genera un token firmado que el cliente envía en requests posteriores.
Un filtro personalizado intercepta cada request, valida el token y autentica al usuario dentro del contexto de seguridad de Spring.