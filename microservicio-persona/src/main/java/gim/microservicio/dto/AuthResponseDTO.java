package gim.microservicio.dto;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class AuthResponseDTO {

    private String token;
    private String tipo;
    private PersonaPerfilDTO perfil;

    public AuthResponseDTO(String token, PersonaPerfilDTO perfil){
        this.token = token;
        this.tipo = "Bearer";
        this.perfil = perfil;
    }

    public String getToken() {
        return token;
    }

    public String getTipo() {
        return tipo;
    }

    public PersonaPerfilDTO getPerfil() {
        return perfil;
    }
}