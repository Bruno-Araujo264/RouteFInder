package org.example;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DataGenerator {

    public String getSystemDateTime() {
        LocalDateTime data = LocalDateTime.now();
        DateTimeFormatter formatacaoDaData = DateTimeFormatter.ofPattern("'Dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm:ss");
        String horarioAcesso = data.format(formatacaoDaData);
        return horarioAcesso;
    }
}


