# TODO
- Testar se os veículos estão sujando ao passar 1 dia de tick
- Veículos salvos no persistance
- Corrigir veículos caindo
- Spawnar taxi quando outro sair
- criar blips de shortrange para profissões ex mecanico
- Remover heatl and armour de debaixo do mapa
- Criar painel de criar personagem
- Syncronizar no servidor O rosto do personagem
- Guardar Veículos nas garagens onde forem deixados

## Taxi:
- Compartilhar posição de destino
- Cancelar a qualquer momento

## Mecânico:
- bodyHealth e engineHealth Não funcionam para verificar se o veiculo está mt danificado.
- Recuperar veículo quando dentro do restoreVehicle
- Criar interação ao chamar igual taxi

## Intel:
- Colocar comando de revistar
- Colocar comando de prender
- Colocar comando de Investigar (* 1)

## Lawyer:
- Criar Escritório (Label/Marker)
- Criar getUniform

## Police:
- Entrada na ficha criminal
- Board de acessos dos membros da policia mostrando o ultimo login, e o tempo online no dia e na semana
- Board de acessos com membros da policia e máximo permitido em cada nivel com botões de promover e despromover
- Area para pegar Colete
- Criar interação ao chamar igual taxi
- Equipamento tatico da policia tem limite máximo por player a cada 3 dias reseta.

## Rescue:
- Encontrar um Local para o batalhão(markers e blips)
- Criar GetUniform
- Criar GetVehicles e GetChopper
- Criar Guardar Veículo
- Criar Comando de reviver
- Criar comando de curar
- Criar board de Acessos mostrando o ultimo login, e o tempo online no dia e na semana
- Criar Interação ao chamar igual ao taxi

## Trafic: 
- Criar um Local para o batalhão
- Criar GetUniform
- Criar GetVehicles(reboque e moto)
- Criar Deposito

## Guarda Privada:
- Criar Batalhão
- Criar GetUniform
- Criar GetVehicles(só elite)
- Valor de salário é igual a valor pago por proprietários divido por todos
- Proprietários de imóveis pode pagar para terem seus imóveis guardados pela guarda
- Guarda recebe notificação quando um dos imóveis de sua franquia está sendo assaltado

## Propriedade Plantação de Maconha:
- Ser possível o player Comprar
- Ser possível colher 1 vez ao dia demorando 3 dias para uma plantação completa
- Ser possível vender para o player mais próximo
- Policia pode fechar o local, necessário prender o player e entrar o com o mesmo no checkpoint e fechar local
- Quando policia fecha o local ganha 1 slots de material tatico para cada policial

## Propriedade de Processamento de Drogas:
- Ser possível o player Comprar
- Ser possível receber as drogas do player mais próximo
- Processar drogas e enviar dinheiro sujo
- Policia pode fechar o local, necessário prender o player e entrar o com o mesmo no checkpoint e fechar local
- Quando policia fecha o local ganha 1 slots de material tatico para cada policial

## Propriedade Ponto de venda de Drogas:
- Ser possivel o player Comprar
- Ser possível players venderem drogas em quantidade no local
- Dono da propriedade pode determinar o preço de compra indivídual
- Valor arrecadado fica no local devendo ser recolhido pelo player
- Local pode ser assaltado por Players de outras facções
- Policia pode fechar o local, necessário prender o player e entrar o com o mesmo no checkpoint e fechar local
- Quando policia fecha o local ganha 1 slots de material tatico para cada policial

## Criminal:
- Criar variavel em char Criminal e Criminal Level(criminal se ele é bandido e Criminal level o nivel de criminoso)
- Aumentar criminal level ao consumir drogas, matar players, matar policiais(mais pontos), efetuar assaltos etc
e perder pontos ao morrer e ser preso.
- Vender drogas indivíduais para outros players
- Se tiver variavel criminal pode roubar itens de players
- Pode roubar propriedades
- Pode roubar veículos
- Ao fechar propriedade de um criminal o mesmo perde todos os pontos de criminal
- Armas que criminals player podem usar são relativos ao level de criminal
- Criminal level acima de "x" ele pode "ficar de olheiro" e descobrir gape de valor retido em propriedade

## Evento de Tráfico de Armas:
- Uma vez a cada 3 dias reais um evento de compra de armas é iniciado em um local do mapa com range alto
- Quanto maior o level de criminal menor o range
- O player que encontrar o Ped traficante pode comprar armas de alto calibre e munição(quantidade de armas é limitada)
- Policia pode encontrar o Ped e encerrar o evento
- Para a Policia o range é muito grande
- Para Intel o range é menor
- Quando policia fecha o local ganha 1 slots de material tatico para cada policial

## Propriedade Desmanche:
- Player pode comprar propriedade
- Para um veículo ser entregue no desmanche o proprietário do mesmo precisa estar junto
- Policia pode fechar o local, necessário prender o player e entrar o com o mesmo no checkpoint e fechar local
- Ao roubar veículos ele pode levar até o desmanche, existem varios desmanches no mapa, o veículo precisa ficar até
2 dias no desmanche para sumir
- A policia pode resgatar o veículo se descobrir qual o desmanche
- Intel pode ficar na frente do pc para descobrir a cidade em que o desmanche com o veículo está
- Quando policia fecha o local ganha 1 slots de material tatico para cada policial

## Propriedades Comuns:
- Player pode comprar a propriedade
- Arrecada Dinheiro por tempo
- Pensar em rotatividade para outros players poderem comprar

## Lava Jato:
- Players podem comprar a propriedade
- Valor arrecadado fica no local e pode ser assaltado
- Quanto maior o valor arrecadado no local menor o custo de troca por dinheiro sujo
- Players pode lavar dinheiro no local com a presença do dono da propriedade
- Policia pode dar batida no local se tiver dinheiro sujo policial da batida ganha 1 equipamento tatico se não perde 1

## Lanchonete:
- Players podem comprar a propriedade
- Valor arrecadado fica no local e pode ser assaltado
- Quanto maior o valor arrecadado no local menor o custo de troca por dinheiro sujo
- Players pode lavar dinheiro no local com a presença do dono da propriedade
- Policia pode dar batida no local se tiver dinheiro sujo policial da batida ganha 1 equipamento tatico se não perde 1

## Loja de armas:
- Somente venda de armas de baixo calibre e pouca munição
- Players podem comprar a propriedade
- Valor arrecadado fica no local e pode ser assaltado
- Quanto maior o valor arrecadado no local menor o custo de troca por dinheiro sujo
- Players pode lavar dinheiro no local com a presença do dono da propriedade
- Policia pode dar batida no local se tiver dinheiro sujo policial da batida ganha 1 equipamento tatico se não perde 1

## Posto de Gasolina:
- Carro consumir combustivel ao andar
- Com bustivel ser salvo junto com o carro mesmo quando não estiver mais no mundo
- Encher combustivel nos postos de gasolina
- Postos de Gasolina podem ser Comprados por Players
- Valor Arrecadado fica no local o player precisa retirar
- Postos podem ser assaltados por facções
- Policia pode dar batida no local se tiver dinheiro sujo policial da batida ganha 1 equipamento tatico se não perde 1

## Paraiso Fiscal:
- Donos de propriedade podem depositar dinheiro sujo

## Evento do Cartel:
- Uma vez a cada 4 dias da vida real o evento do cartel inicia
- Donos de propriedade podem trocar dinheiro sujo em dinheiro limpo por taxa variando de 1.0 a 1.6
- Policia pode encontrar o Ped e encerrar o evento
- Para a Policia o range é muito grande
- Para Intel o range é menor
- Quando policia fecha o local ganha 1 slots de material tatico para cada policial

## Notificações:
- Mudar argumento dos botões das notificações de booleano pra string
- Colocar uma cor diferente dependendo do estagio do job

## Locais Padrões:
- Criar Barbearia
- Criar Lojas de Roupa
- Criar Lojas de arma
- Criar loja de Comida

## Bancos:
- Valor Máximo de deposito e saque de "x" valores maiores que isso somente no banco Central







(*1) - O funcionario da Intel deve chegar próximo do player, digitar o comando de investigar e ficar durante 5 
minutos dentro da área marcada para retornar sua facção pertencente e uma porcentagem de outros membros da facção,
um gape do valor que o mesmo tem no banco, e um gape do valor que o mesmo tem na carteira, quais armas
o mesmo tem ... entre outros.