<h1 align="center">Football Site API</h1>

<h2 align="center">Português</h2>


**Nome**: API de Site de Futebol.

**Conhecimentos Usados**: Typescript.

**Ferramentas usadas**: Node.js, JWT, Express, Sequelize, Docker e Bcrypt.

**Número de Pessoas**: 1 (sozinho).

-----------------------

<h3 align="center">Descrição</h3>

<p align="justify">Trybe Football Club é um site de informativo a respeito de partidas de football e seus impactos no campeonato, exibindo a tabela de classificação com todas as suas informações. O site possui um banco de dados MySQL, consultado por Sequelize; bem como o backend e o frontend feitos, sendo, portanto, funcional. Nele, além de ver as partidas e placares, o usuário pode realizar login, e, a depender de seu cargo, realizar mudanças no site, adicionando e modificando partidas de football, tendo o placar de classificação criado automaticamente de acordo com.</p>
<p align="justify">O propósito deste projeto é a simulação de uma situação na qual eu fora responsável pela criação e teste do backend de um projeto, isso é, o banco de dados e sua utilização através de uma API node express. O projeto possui nele a aplicação de todos os conceitos aprendidos ao longo do módulo de aprendizado referente a backend na Trybe, tendo como tema central o uso correto do conceito de SOLID e orientação a objeto na criação do código.</p>
<p align="justify">Toda a parte de frontend foi criada pela própria Trybe, bem como a infraestrutura básica para a conexão dele com o backend e o banco de dados. O papel do aluno, no caso eu, é criar a API e ajustar corretamente o uso do Docker para que tudo funcione corretamente, portanto, toda a parte de backend do projeto foi criada por mim, incluindo os testes de cobertura.</p>
<p align="justify">A aplicação correta do conceito de SOLID foi um dos maiores desafios ao longo do desenvolvimento, pois este era um conceito totalmente novo para mim; afinal, não bastava apenas aplicar os conceitos, mas eu também me desafiei a fazer um código mais limpo e modular, bem como realizar todo o projeto utilizando-se de TDD, com uma organização de pastas com a qual os tipos de variáveis e seus usos se estruturasssem harmoniosamente. Para esse fim, cada elemento possui sua pasta, com um index para controlar as importações e exportações, um arquivo de tipos e os arquivos de código, tendo o projeto sido construído inteiramente com classes e métodos.</p>
<p align="justify">A primeira parte do projeto foi a criação da infraestrutura básica e da rota de login. Aqui foram criados dois testes unitários para cobrir tal infraestrutura, uma vez que um problema nesta poderia causar problemas por todo o código; muito tempo foi gasto, mas isso aceleraria as etapas seguintes. Além disso, aqui o primeiro contato com programação estritamente TDD surge para mim, algo desafiador por si só, uma vez que se mostrou necessário pensar em toda a estrutura de código, a planejando, antes de ir para qualquer estágio de produção, o que se provou mais prático ao longo do projeto, conforme eu aprendia a aplicar o conceito corretamente e obtinha os resultados de se deparar com menos erros e bugs.</p>
<p align="justify">A segunda etapa foi criar a rota responsável por gerenciar os times, a mais fácil, uma vez que pouco código foi necessário. O desafio retornaria na terceira etapa, pois ela exigiria muitas validações para a inserção e atualização de partidas.</p>
<p align="justify">Já a quarta etapa seria a mais exótica, uma vez que não envolveu a criação de qualquer model, e sim o tratamento de informações para gerar a tabela de classificação. Além de cumprir o desafio inicial, decidi também tentar o fazer sem repetir código, algo obtido através do uso de um "dicionário" do objeto trazido pela model e o uso intensivo do conceito de open/closed.</p>

-----------------------

<h3 align="center">Projeto Trybe</h3>

  <p align="justify">Um projeto Trybe é um projeto o qual eu tenha feito durante minha estadia como aluno da Trybe. Este é um curso 100% online focado em desenvolvimento web, mas que tange partes de outras áreas, tentando prover mais ferramentas.</p>
  <p align="justify">Tais projetos são feitos ao fim de blocos ao longo do curso, com o objetivo de solidificar o conhecimento nele adquirido. Estes projetos são feitos a partir de requisitos os quais devem ser atendidos, os quais buscam imitar requisições feitas para o profissional no mercado de trabalho. Esses requisitos precisam ser implementados, e isso é testado através de testes automáticos fornecidos pela própria Trybe ao longo do desenvolvimento.</p>
  <p align="justify">Entretanto, apesar de estes fornecerem uma estrutura básica para o desenvolvimento e teste do que eles requerem, o código relativo à funcionalidade deste projeto foi desenvolvido por alunos.</p>

-----------------------

<h3 align="center">Como Instalar</h3>
<p align="justify">Para realizar o uso desta API em seu computador, você precisará ter instalado o Node.js, o Docker e Docker-compose, e o servidor de banco de dados MySQL, tendo-os funcionando corretamente. Preencha as variáveis de sistema no .env, retirando o .exemple, tornando-as assim ativas através da biblioteca dotenv pelo projeto. Antes de iniciar o projeto, instale as dependências com "npm install", certifique-se de ter as portas 3000 e 3001 abertas, e em seguida utilize o comando "npm run compose:up" para iniciar, bem como o comando "npm run compose:down" para finalizar.</p>

-----------------------

<h2 align="center">English</h2>


**Name**: Football Site API

**Used Knowledges**: Typescript.

**Used Tools**: Node.js, JWT, Express, Sequelize, Docker and Bcrypt.

**Number of People**: 1 (solo).

-----------------------

<h3 align="center">Description</h3>


-----------------------

<h3 align="center">Trybe Project</h3>

  <p align="justify">A Trybe project is a project which was done during my time as a Trybe student. This is a 100% online course focused on web development, but it touches parts of other areas, trying to provide more tools.</p>
  <p align="justify">Such projects happen at the end of blocks throughout the course, with the aim of solidifying the knowledge acquired along  it. These projects are made from requirements that must be met, which seek to imitate those made to the professionals in the work environment. These requirements need to be implemented, and this is tested through automatic tests provided by Trybe.</p>
  <p align="justify">However, although these provide a basic framework for developing and testing for what they require, the code related to the functionality of these project are developed by students.</p>

-----------------------

<h3 align="center">How to Install</h3>
<p align="justify">For you to use this API on your computer, you'll need to have Node.js, Docker and Docker-compose, and the MySQL database server installed and working properly. Fill in your info in the system variables in the .env and then remove the .example, thus making it active through the dotenv library in the project. Before starting it, install the dependencies with "npm install", then make sure you have 3000 and 3001 ports open; use the command "npm run compose:up" to start, as well as the command "npm run compose:down" to finish.
</p>

-----------------------
