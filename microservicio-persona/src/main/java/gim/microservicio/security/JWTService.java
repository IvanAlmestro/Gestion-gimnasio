package gim.microservicio.security;

import gim.microservicio.entity.Persona;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JWTService {
    private final String SECRET_KEY = "miclavesupersecretamiclavesupersecretamiclave";

    public String generarToken(Persona persona){

        return Jwts.builder()
                .setSubject(persona.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + 1000 * 60 * 60)
                )
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /*private Key getSignKey(){

        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);

        return Keys.hmacShaKeyFor(keyBytes);
    }*/
    private Key getSignKey(){
        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes()
        );
    }

    public String extraerEmail(String token){

        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validarToken(String token){

        try{

            Jwts.parserBuilder()
                    .setSigningKey(getSignKey())
                    .build()
                    .parseClaimsJws(token);

            return true;

        }catch (Exception e){
            return false;
        }
    }
}
