# Sport Link

O **Sport Link** é um aplicativo de logística desenvolvido para a disciplina **"Projetão"** do curso de **Sistemas de Informação** da **UFPE**. O aplicativo foi criado para otimizar a logística de encontros esportivos, promovendo uma organização colaborativa entre atletas, treinadores e organizadores. Ele oferece uma plataforma onde os usuários podem facilmente criar, gerenciar e participar de encontros esportivos, simplificando desde a comunicação até a coordenação de recursos.

## Tecnologias Utilizadas

- **React Native**: Framework para construção de aplicativos móveis utilizando JavaScript e React.
- **Expo**: Conjunto de ferramentas e serviços para o desenvolvimento de aplicativos React Native. Permite uma configuração mais rápida e facilita o desenvolvimento e a distribuição de aplicativos.
- **Expo Router**: Sistema de roteamento integrado ao Expo para navegação entre telas e gerenciamento de rotas.
- **React Native Elements**: Biblioteca de componentes UI prontos para uso, que facilita a criação de interfaces de usuário consistentes e modernas.

## Funcionalidades

- **Listagem de Eventos**: Exibe uma lista de eventos de surf com detalhes como título, descrição, data e localização.
- **Participação em Eventos**: Permite aos usuários se inscreverem e participarem de eventos.
- **Logística de Equipamentos e Transportes**: Permite aos usuários fretarem transportes e/ou dividir equipamentos próprios para realização de um evento esportivo.
- **Perfil de Usuário**: Visualização do perfil do usuário, incluindo foto e informações de contato.
- **Navegação Intuitiva**: Navegação entre diferentes seções do aplicativo com o auxílio do Expo Router.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- Node.js (^18.18.0 || ^20.9.0 || >=21.1.0)
- Expo CLI (`npm install -g expo-cli`)

## Instalação

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/JulioBem/sport-link.git
   cd sport-link
   ```

2. **Instale as Dependências**

   ```bash
   npm install
   ```

3. **Inicie o Servidor de Desenvolvimento**

   ```bash
   expo start
   ```

   Isso abrirá uma nova aba no seu navegador com o Expo DevTools, onde você pode iniciar o aplicativo em um emulador ou dispositivo físico.

## Execução

Para rodar o aplicativo, você pode usar um emulador de Android ou iOS, ou um dispositivo físico com o aplicativo Expo Go instalado. Escaneie o código QR exibido no Expo DevTools para abrir o aplicativo no Expo Go. Alternativamente, também é possível rodar no navegador web utilizando o DevTools para se obter uma visão portátil.

## Estrutura do Projeto

  `App.js`: Arquivo principal que configura o roteamento e a navegação do aplicativo.
    
  `components/`: Contém componentes reutilizáveis, como `CommunityEventCard` e `CommunityHeader`.
    
  `hooks/`: Contém hooks personalizados utilizados no aplicativo.
    
  `data/`: Contém dados estáticos utilizados no aplicativo, como o JSON de eventos.

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## Equipe

<h2>Time de Desenvolvimento</h2>

<ul>
    <li>Júlio Bem - <i>Liderança Técnica & Desenvolvedor</i> - <a href="https://github.com/JulioBem">JulioBem</a></li>
    <li>Higor Cunha - <i>Desenvolvedor Front-end</i> - <a href="https://github.com/higorcunha1">higorcunha1</a></li>
    <li>Luiz Roberto - <i>Desenvolvedor Front-end</i> - <a href="https://github.com/roboberto1403">roboberto1403</a></li>
    <li>Arthur Conegundes - <i>Desenvolvedor Back-end</i> - <a href="https://github.com/ArthurConegundes29102002">ArthurConegundes29102002</a></li>
</ul>

```

Sinta-se à vontade para personalizar o conteúdo, incluindo seu nome, e-mail e qualquer outro detalhe relevante.
