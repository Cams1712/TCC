# TCC
Coloque os arquivos do TCC aqui para facilitar o compartilhamento dos arquivos.
# Projeto Senai - TCC

1. **Levantamento de requisitos, isto é, o que será resolvido e o que precisa para isso? (pode ser por entrevista, formulário, conversas entre os membros da equipe, brainstorm, entre outros).**
    
    Equipamentos de Hardware necessários 
    
    - Arduíno
    - Sensores
        - Acelerôretro
        - Bluetooth BLE
        - Sensor de Corrente
        - Sensor para ativação do Pistão
    - Dois Botões
        
        
        Sistema Mobile → Conexão com o Blutetooth para ativar / desativar o pistão. Também vai ter a função de alertar quando o pistão estiver ativado. Além disso temos também a funcionalidade de alterar a senha do login. 
        
        Sistema Web → Utilizado para divulgar e explicar melhor o sistema utilizado no veículo, cadastrar e deletar os funcionários que tem acesso ao aplicativo web.
        
    
    Sua finalidade é solucionar o problema de colisão traseira entre um caminhão e os demais veículos em uma subida. 
    
    1. **Verificar as funcionalidades do sistema (escopo e não-escopo)**
        
        Esse produto vai resolver apenas as colisões traseiras que podem ocorrer no evento de falha de freio / peso excessivo em uma subida. As demais situações não terão aplicabilidade nesta solução.
        
    
    1. **Modelagem do banco de dados**
    
    O banco de dados terá uma tabela para funcionários que deve conter o número do funcionário (String) que funcionará como chave primária, uma foto do funcionário (LongBlob), nome, email, senha, CPF (todos são Strings) e se esse funcionário está ativo (Bool).
    
    1. **Escolher qual banco de dados será utilizado (relacional ou não-relacional)**
        
        Modelo Relacional (MySQL)
        ****
        
    2. **Modelagem das classes**
    
    1. **Criação de wireframe das telas (tanto web quanto mobile)**
    
        Fizemos no figma.
        
        Web: https://www.figma.com/file/vprT0jfrCSUaK2e56K68JL/Wireframe---Mobile?node-id=0%3A1
        
        Site: 
    
    1. **Levantamento dos softwares necessários para o desenvolvimento**
    
        - Android Studio (Mobile)
        - Visual Studio (Web)
        - MySQL (Banco de Dados)
        - Arduíno IDE (Controle da parte física da solução)
    
    1. **Verificação de APIs complementares que farão parte do projeto**
        
        APIs de envio de e-mail e GPS
        
    
    1. **Pesquisa se já existem soluções que façam a mesma coisa (caso existam, qual a diferença do seu projeto para o que já existe?)**
        
        Não existem soluções que façam algo parecido com isso.
        
        Nossos diferenciais são que evitaremos grande parte dos danos materiais para a empresa por conta dos acidentes e possíveis mortes. 
        
    2. **Iniciar a escrita da documentação (objetivos, justificativa, escopo, não escopo e demais itens que já possuírem definição)**
    
    1. **Verificar e estipular prazos para o que será feito em cada Sprint**
        
        Banco de Dados, Mobile e Front-End (Primeiro Sprint) 
                
        Desenvolvimento com Arduíno (Segundo ao Terceiro Sprint) 
        
        Documentação (Segundo ao Quarto Sprint) 
        
        Pitch (Quarto Sprint)
        
    2. **Estipular qual integrante ficará responsável por cada parte**
        
        
        | Camila | Desenvolvimento Mobile, Banco de Dados e Arduíno  |
        | --- | --- |
        | Felipe Abreu | Desenvolvimento Web Front-End  e Documentação |
        | Felipe Lira | Desenvolvimento Web Front-End e Documentação |
        | Johnny | Desenvolvimento Mobile e Pitch  |
        | Thiago  | Desenvolvimento Web Back-End e Pitch |
        
    3. **Verificar e calcular uma projeção de qual o valor que o software poderá ser comercializado/vendido**
    
    1. **Calcular quais as despesas para manter o software em funcionamento**
        - Hospedagem da página web
        - Distribuição da aplicação android
        
    2. **Configurar os computadores para o desenvolvimento (atualizar softwares se preciso)**
    
        Não é necessário
    
    1. **No caso do aplicativo Android, verificar se a versão do Android suporta os recursos que desejam implementar**
    
    1. **~~Criar conta no Git (caso não tenha) e montar o projeto dentro do Git com os membros do grupo~~**
