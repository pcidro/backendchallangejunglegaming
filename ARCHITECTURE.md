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
