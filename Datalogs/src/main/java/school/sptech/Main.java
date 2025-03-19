package school.sptech;

public class Main {
    public static void main(String[] args) {
        Functions getDataSystem = new Functions();

String dataHoraAtual = getDataSystem.getSystemDateTime();
        String prefixo = "INFO";
        String mensagem = "Coletando os dados das Ruas de São Paulo...";

        for (int i = 0; i <= 100 ; i++){
            System.out.println(String.format("[%s] [%s] - %s", dataHoraAtual, prefixo, mensagem));
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        ;
    }
}