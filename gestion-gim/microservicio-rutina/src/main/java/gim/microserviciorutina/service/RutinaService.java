package gim.microserviciorutina.service;

import gim.microserviciorutina.repository.RutinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RutinaService {
    @Autowired
    private RutinaRepository rutinaRepository;


}
