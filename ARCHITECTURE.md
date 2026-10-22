## Infraestrutura — LocalStack

O projeto utiliza **LocalStack** para simular o AWS SQS localmente, permitindo desenvolver e testar a comunicação assíncrona sem depender de serviços reais da AWS.

**Motivos da escolha:**

- **Redução de custos:** evita gastos com recursos da AWS.
- **Facilidade de configuração:** integração com Docker Compose.
- **Isolamento:** testes sem afetar ambientes reais.
- **Portabilidade:** permite alternar entre LocalStack e AWS real por meio de variáveis de ambiente.

**Decimal.js**

O projeto utiliza Decimal.js para representar e manipular valores monetários com precisão, evitando problemas de arredondamento comuns ao tipo number do JavaScript.

**Motivos da escolha:**

**Precisão**: evita erros de ponto flutuante em cálculos financeiros.

**Confiabilidade:** garante maior segurança na manipulação de saldos e transações.

**Consistência:** permite padronizar valores monetários com duas casas decimais.

**Autenticação e autorização**

**Decisão:** A autenticação não será implementada nesta versão do desafio.

**Justificativa:** Como a autenticação não integra os critérios de pontuação, priorizei a consistência financeira, a idempotência, o controle de concorrência e a confiabilidade do processamento assíncrono.

**Arquitetura proposta:** Em um ambiente de produção, a autenticação seria delegada a um Identity Provider externo, como Keycloak, utilizando OAuth 2.0 e OpenID Connect.

## Arquitetura — Separação entre Domínio e Persistência

O projeto utiliza **EntitySchema do MikroORM** para manter as configurações de persistência separadas das entidades de domínio.

**Motivos da escolha:**

- **Separação de responsabilidades:** entidades concentram regras de negócio, enquanto schemas definem o mapeamento com o PostgreSQL.
- **Independência do domínio:** evita acoplamento direto das entidades ao MikroORM.
- **Testabilidade:** permite testar regras de negócio sem depender do banco de dados.
- **Manutenibilidade:** facilita alterações na camada de persistência sem modificar diretamente as entidades.
