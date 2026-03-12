# Spotly UI

Interface web do projeto Spotly, construída com [Vite](https://vite.dev/) e JavaScript puro.

## Pré-requisitos

- Node.js 20 ou superior
- npm 10 ou superior

## Como rodar o projeto

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra no navegador o endereço exibido no terminal.

Observação: o projeto sobe com `--host 0.0.0.0`, então também pode ser acessado pela rede local, dependendo da sua configuração.

## Scripts disponíveis

### `npm run dev`

Inicia o ambiente de desenvolvimento com recarregamento automático.

### `npm run build`

Gera a versão de produção na pasta `dist/`.

### `npm run preview`

Serve localmente a build gerada para validação final:

```bash
npm run build
npm run preview
```

## Estrutura principal

```text
.
|-- index.html
|-- public/
|-- src/
|   |-- main.js
|   `-- style.css
|-- package.json
`-- README.md
```

## Tecnologias

- Vite
- JavaScript ES Modules
- CSS puro

## Validação

O comando abaixo foi executado com sucesso neste repositório em 12 de março de 2026:

```bash
npm run build
```
