# Pix Automático (Recorrente)

author: `Darlan Jr. <kelgaxd@gmail.com>`
date: `2024-11-21T08:27:04.000Z`
updated_at: `2024-12-03T02:55:54.635Z`

## TODO's

- [ ] Ler sobre [nova release do pix](https://github.com/bacen/pix-api/releases/tag/2.7.0)
- [ ] Ler sobre [regulamentação do pix](https://www.bcb.gov.br/estabilidadefinanceira/pix?modalAberto=regulamentacao_pix)
- [ ] Ver sobre [os dados do iniciador](https://iniciador.com.br/)
- [ ] Entender como pix funciona, quando eu solicito um pix para um usuário, esse valor não deveria ir direto para o cliente ou target do pix recorrente?
- [ ] Fico confuso pois quando eu vou cobrar uma cobrança recorrente ele não me pede parametros de acordo com o swagger do pix.

## Funcionamento pix

Basicamente quem faz o controle de cobranças recorrentes é o próprio Bacen.

O que precisamos entender é que essa cobrança precisa de uma autorização do usuário.

Abaixo temos algumas rotas da CobR (Cobrança Recorrente).

![Rotas Pix Recorrente](/pix-automatico/rotas.png)

O que podemos fazer é salvar essas informações básicas que vão ser geradas quando realizamos uma transação. 

Exemplo: X `transaction_id` é referente ao meu Y `user_id`.

Table: recurring_pix_transactions

```
type RecurringPixTransactions = {
  transaction_id: string
  user_id: string
  recipient_id: string (id recebedor dentro do Bacen de acordo com a chave pix)
  recipient_pix: string
}
```
  
## Referências

- [Release do pix](https://github.com/bacen/pix-api/releases/tag/2.7.0)
- [Regulamentação do pix](https://www.bcb.gov.br/estabilidadefinanceira/pix?modalAberto=regulamentacao_pix)
- [Iniciador](https://iniciador.com.br/)
- [Documentação do Pix](https://bacen.github.io/pix-api/)