# Carrinho de Compras — Estudo de Caso CI/CD

Projeto usado como estudo de caso do seminário **"Integração de Testes no Pipeline"**
(Eixo 1 — QAOps, Melhoria de Testes e Quality Gates).

Demonstra a integração de testes automatizados a uma esteira de CI/CD, com um
**Quality Gate** que trava o pipeline caso a cobertura de testes fique abaixo do
limite definido.

## Estrutura

```
src/cart.js         Lógica de um carrinho de compras (adicionar/remover item, cupom, total)
test/cart.test.js   Testes unitários (Jest)
.github/workflows/  Pipeline de CI/CD (GitHub Actions)
sonar-project.properties  Configuração do SonarQube Cloud
```

## Rodando localmente

```bash
npm install
npm run test:coverage
```

## Pipeline

A cada Pull Request para `main`, o GitHub Actions:
1. Instala as dependências
2. Roda os testes com relatório de cobertura (lcov)
3. Envia o relatório para o SonarQube Cloud
4. Aguarda o resultado do Quality Gate — se a cobertura ficar abaixo do limite
   configurado, o pipeline falha e o merge fica bloqueado.

## Configuração necessária no GitHub

Em **Settings → Secrets and variables → Actions**, adicione o secret:
- `SONAR_TOKEN`: gerado em sonarcloud.io (My Account → Security)

## Simulando o cenário de falha (Quality Gate travando)

Como este projeto tem 100% de cobertura por padrão, para demonstrar o Quality
Gate travando de forma honesta, crie um Pull Request que **adiciona uma nova
função sem teste correspondente** (em vez de simplesmente remover testes
existentes) — isso reduz a cobertura de código novo abaixo do limite e reflete
um cenário realista: alguém esqueceu de testar a funcionalidade nova.

---
Pipeline configurado e testado em 2026/09/01.
