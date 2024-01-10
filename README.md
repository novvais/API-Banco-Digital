# API-Banco-Digital

## Como Usar

1. Clone o Repositório
   * Clone este repositório para o seu computador usando o seguinte comando:
     ```bash
     $ git clone git@github.com:novvais/API-Banco-Digital.git

2. Encontre o Diretorio
   * Encontre o diretorio usando o código abaixo:
     ```bash
     $ cd API-Banco-Digital
     
3. Baixe todas as Dependecias do Projeto
   * No terminal utilize o código abaixo para baixar todas as bibliotecas:
     ```bash
     $ npm i

4. Inicie o Servidor
   * Inicie o servidor usando o código:
     ```bash
     $ npm run dev

5. Para executar as rotas utilize o Insomnia ou um programa similiar
   * Baixe e instale o Insomnia acessando o link: https://insomnia.rest/download
   * Crie uma conta e se conecte no aplicativo
      
## Como Usar o Insomnia

1. Na página incial do Insomnia, clique no ícone de + no canto superior direito
   <div><img src="./assets/foto_1.png"><div>

2. Clique na primeira opção
   <div><img src="./assets/foto_2.png"><div>

3. Dê um nome para a coleção
   <div><img src="./assets/foto_3.png"><div>

4. Clique no ícone de + para criar uma rota
   <div><img src="./assets/foto_4.png"><div> 

5. Clique na primeira opção
   <div><img src="./assets/foto_5.png"><div>

6. Escolha o verbo da rota
   * Adicione o domínio e o caminho da API
     ```bash
     http://localhost:3000
   <div><img src="./assets/foto_6.png"><div>

7. Para testar a rota "listarConta" necessita adicionar a senha do banco do usuario
   <div><img src="./assets/foto_8.png"><div>

8. Para testar as rotas "consultaDoSaldo" e "extrato" necessita adicionar o número da conta e senha do banco
   <div><img src="./assets/foto_7.png"><div>
   
#### Exemplo de conteúdo do Body Request
   <img src="./assets/exemplo_json.png">

#### Exemplo de saída 
   <img src="./assets/exemplo_res.png">