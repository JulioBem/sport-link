# Wave Sync

O **Wave Sync** é um aplicativo de logística desenvolvido para a disciplina **"Projetão"** do curso de **Sistemas de Informação** da **UFPE**. O aplicativo foi criado para facilitar a organização e a participação em eventos e competições de surf, além de fornecer uma plataforma para interação entre surfistas.

## Tecnologias Utilizadas

- **React Native**: Framework para construção de aplicativos móveis utilizando JavaScript e React.
- **Expo**: Conjunto de ferramentas e serviços para o desenvolvimento de aplicativos React Native. Permite uma configuração mais rápida e facilita o desenvolvimento e a distribuição de aplicativos.
- **Expo Router**: Sistema de roteamento integrado ao Expo para navegação entre telas e gerenciamento de rotas.
- **React Native Elements**: Biblioteca de componentes UI prontos para uso, que facilita a criação de interfaces de usuário consistentes e modernas.
- **Material UI**: Biblioteca de componentes React que segue as diretrizes do Material Design, oferecendo uma vasta gama de elementos de UI.

## Funcionalidades

- **Listagem de Eventos**: Exibe uma lista de eventos de surf com detalhes como título, descrição, data e localização.
- **Participação em Eventos**: Permite aos usuários se inscreverem e participarem de eventos.
- **Perfil de Usuário**: Visualização e edição do perfil do usuário, incluindo foto e informações de contato.
- **Navegação Intuitiva**: Navegação entre diferentes seções do aplicativo com o auxílio do Expo Router.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- Node.js (v14 ou superior)
- Expo CLI (`npm install -g expo-cli`)

## Instalação

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/JulioBem/wave-sync.git
   cd wave-sync
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

- **Em construção...**
```

Sinta-se à vontade para personalizar o conteúdo, incluindo seu nome, e-mail e qualquer outro detalhe relevante.
