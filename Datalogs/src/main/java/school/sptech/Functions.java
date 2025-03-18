package school.sptech;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Functions {

    public String getSystemDateTime() {
        LocalDateTime data = LocalDateTime.now();
        DateTimeFormatter formatacaoDaData = DateTimeFormatter.ofPattern("'Dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm:ss");
        String horarioAcesso = data.format(formatacaoDaData);
        return horarioAcesso;
    }
}