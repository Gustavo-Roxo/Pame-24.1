const { none, repeat } = require("list")
const prompt = require("prompt-sync")({sigint:true})

//gera os id's de novos clientes, funcionários e pedidos
let clientes_id = 0
let funcionarios_id = 0
let pedidos_id = 0

//os bancos de dados do sistema
let cadastros = []
let clientes = []
let funcionarios = []
let pedidos = []
let produtos = []
let avaliações = []

//guarda o cadastro atualmente logado
let login_status = -1
let login_conta = 0

//variável que indica se o programa encerrará ou não
//manipulada pelo método sair() da classe Sistema
let sair = false

class Funcionário{
    constructor(nome, cpf, email, senha){
        this.id_funcionario = funcionarios_id
        funcionarios_id++
        this.nome = nome
        this.cpf = cpf
        this.email = email
        this.senha = senha
        this.cliente = false
    }
}

class Cliente{
    constructor(nome, data_nascimento, cpf, email, senha){
        this.id_cliente = clientes_id
        clientes_id++
        this.nome = nome
        this.data_nascimento = data_nascimento
        this.cpf = cpf
        this.email = email
        this.senha = senha
        this.cliente = true
    }
}

class Produto{
    constructor(validade, preço, quantidade_estoque, nome, descrição){
        this.validade = validade
        this.preço = preço
        this.quantidade_estoque = quantidade_estoque
        this.nome = nome
        this.descrição = descrição
    }
}

class Pedido{
    constructor(data_pedido, lista_produtos, valor){
        this.id_pedido = pedidos_id
        pedidos_id++
        this.id_cliente = id_cliente
        this.status = "Pendente"
        this.data_pedido = data_pedido
        this.lista_produtos = lista_produtos
        this.valor = valor
    }
}

class Avaliacao{
    constructor(id_pedido, nota, descrição){
        this.id_pedido = id_pedido
        this.nota = nota
        this.descrição = descrição
    }
}

class Sistema{
    cadastro(){

        let conta = prompt("cliente ou funcionário: ")
        
        //usuário escreveu: "cliente"
        //cliente = 0 nos cadastros
        if(conta=="cliente"){ 
            let nome = prompt("digite o seu nome: ")
            let data_nascimento = prompt("digite a sua data de nascimento: ")
            let cpf = prompt("digite o seu cpf: ")
            let email = prompt("digite o seu email: ")

            //Não permite dois emails iguais nos cadastros
            for (let i = 0; i < cadastros.length; i++) {
                if (cadastros[i].email == email) {
                  console.log("Email já cadastrado")
                  return
                }
            }
            let senha = prompt("crie a sua senha: ")

            //cria um novo cliente
            let new_cliente = new Cliente(nome, data_nascimento, cpf, email, senha)
            clientes.push(new_cliente)

            //cria novo cadastro
            cadastros.push(new_cliente)

            console.log("Cadastro criado")

            return
        }
        
        //usuário escreveu: "funcionário"
        //funcionário = 1 nos cadastros
        else if(conta=="funcionario"){
            let nome = prompt("digite o seu nome: ")
            let cpf = prompt("digite o seu cpf: ")
            let email = prompt("digite o seu email: ")

            //Não permite dois emails iguais nos cadastros
            for (let i = 0; i < cadastros.length; i++) {
                if (cadastros[i].email == email) {
                  console.log("Email já cadastrado")
                  return
                }
            }
            let senha = prompt("crie a sua senha: ")

            //cria um novo funcioário
            let new_funcionario = new Funcionário(nome, cpf, email, senha)
            funcionarios.push(new_funcionario)

            //cria novo cadastro
            cadastros.push(new_funcionario)

            console.log("Cadastro criado")

            return
        }

        //usuário escreveu uma entrada não válida
        else{
            console.log("Entrada não reconhecida\n")

            return
        }
    }

    login(){
        let email = prompt("digite o seu email: ")

        //Procura email nos cadastros
        for (let i = 0; i < cadastros.length; i++) {

            //Encontrou email nos cadastros
            if (cadastros[i].email == email) {
                let senha = prompt("digite a sua senha: ")

                //Confere se a senha está correta
                if(cadastros[i].senha == senha){

                    //login como cliente
                    if(cadastros[i].cliente){
                        login_status=0
                        login_conta=cadastros[i]

                        console.log("Cliente Logado")

                        return
                    }

                    //login como funcionário
                    if(!cadastros[i].cliente){
                        login_status=1
                        login_conta=cadastros[i]

                        console.log("Funcionário Logado")

                        return
                    }
                }

                //Senha incorreta
                else{
                    console.log("Senha incorreta")

                    return
                }
            }
        }

        //Email incorreto
        console.log("Email não encontrado")

        return
    }

    sair(){
        sair = true

        return
    }

    ver_dados(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem alguém logado logado
        else{
            console.log(login_conta)
        }
    }

    modificar_dados(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            //Pergunta quais os dados novos
            let nome = prompt("digite o seu nome: ")
            let cpf = prompt("digite o seu cpf: ")
            
            //Altera os dados
            login_conta.nome = nome
            login_conta.cpf = cpf

            console.log("Dados alterados")

            return
        }

        //Tem um cliente logado
        else if(login_status==0){
            //Pergunta quais os dados novos
            let nome = prompt("digite o seu nome: ")
            let cpf = prompt("digite o seu cpf: ")
            let data_nascimento = prompt("digite a sua data de nascimento: ")
            
            //Altera os dados
            login_conta.nome = nome
            login_conta.cpf = cpf
            login_conta.data_nascimento = data_nascimento

            console.log("Dados alterados")

            return
        }
    }

    ver_produtos(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
    
            return
        }

        //Tem um funcionário ou cliente logado
        else {
            console.log(produtos.sort(ordem_alfabetica))
        }
    }

    ver_pedidos(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            console.log(pedidos.sort(ordem_cronologica))

            return
        }

        //Tem um cliente logado
        else if(login_status==0){
            console.log("Comando reservado para Funcionários")

            return
        }
    }

    ver_clientes(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            console.log(clientes.sort(ordem_alfabetica))

            return
        }

        //Tem um cliente logado
        else if(login_status==0){
            console.log("Comando reservado para Funcionários")

            return
        }
    }

    mudar_status_pedido(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            let pedido_id = prompt("Id do pedido: ")

            //Procura Pedido na lista de pedidos
            for (let index = 0; index < pedidos.length; index++) {
                //Encontrou o pedido
                if(pedidos[index].id_pedido==pedido_id){
                    //Pergunta quais os dados novos
                    let novo_status = prompt("digite o novo status: ")
                    
                    //Altera o status
                    pedidos[index].status = novo_status

                    console.log("Status alterado")

                    return
                }
            }
        }

        //Tem um cliente logado
        else if(login_status==0){
            console.log("Comando reservado para Funcionários")

            return
        }
    }

    adicionar_produto(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            //Pergunta quais os dados do novo Produto
            let validade = prompt("digite a validade do produto: ")
            let preço = prompt("digite o preço: ")
            let quantidade_estoque = prompt("digite a quantidade em estoque: ")
            let nome = prompt("digite o nome: ")
            let descrição = prompt("digite a descrição do produto: ")
            
            //Cria um novo Produto
            let novo_produto = new Produto(validade, preço, quantidade_estoque, nome, descrição)
            produtos.push(novo_produto)

            console.log("Produto adcionado")

            return
        }

        //Tem um cliente logado
        else if(login_status==0){
            console.log("Comando reservado para Funcionários")

            return
        }
    }

    editar_produto(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            let produto_nome = prompt("Nome do produto: ")

            //Procura Produto na lista de produtos
            for (let index = 0; index < produtos.length; index++) {
                //Encontrou o Produto
                if(produtos[index].nome==produto_nome){
                    //Pergunta quais os dados novos
                    let validade = prompt("digite a validade do produto: ")
                    let preço = prompt("digite o preço: ")
                    let quantidade_estoque = prompt("digite a quantidade em estoque: ")
                    let nome = prompt("digite o nome: ")
                    let descrição = prompt("digite a descrição do produto: ")
                    
                    //Altera os dados
                    produtos[index].validade = validade
                    produtos[index].preço = preço
                    produtos[index].quantidade_estoque = quantidade_estoque
                    produtos[index].nome = nome
                    produtos[index].descrição = descrição

                    console.log("Produto editado")

                    return
                }
            }
        }

        //Tem um cliente logado
        else if(login_status==0){
            console.log("Comando reservado para Funcionários")

            return
        }
    }

    excluir_produto(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            let produto_nome = prompt("Nome do produto: ")

            //Procura Produto na lista de produtos
            for (let index = 0; index < produtos.length; index++) {
                //Encontrou o Produto
                if(produtos[index].nome==produto_nome){
                    //Exclui o Produto da lista de produtos
                    produtos[index] = null

                    console.log("Produto excluido")

                    return
                }
            }
        }

        //Tem um cliente logado
        else if(login_status==0){
            console.log("Comando reservado para Funcionários")

            return
        }
    }

    fazer_pedido(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            console.log("Comando reservado para Clientes")

            return
        }

        //Tem um cliente logado
        else if(login_status==0){
            let carrinho = []
            let valor_carrinho = 0

            //Monta o carrinho de compras
            while(true){
                let produto = prompt("Digite o nome do produto para adicionar ao carrinho: ")
                let produto_encontrado = false

                //Procura Produto na lista de produtos
                for (let index = 0; index < produtos.length; index++) {
                    //Encontrou o Produto
                    if(produtos[index].nome==produto){
                        produto_encontrado = true

                        //Adiciona Produto ao carrinho
                        carrinho.push(produtos[index])

                        //Diminui a quantidade em estoque do Produto
                        produtos[index].quantidade_estoque--

                        //Adiciona o preço do Produto ao valor total do carrinho
                        valor_carrinho += produtos[index].preço

                        console.log("Produto adcionado ao carrinho")

                        break
                    }
                }

                if(!produto_encontrado){
                    console.log("Produto não encontrado")
                }

                let resposta = prompt("Deseja adicionar mais alguma coisa ao pedido? (Sim/Não): ")
                if(resposta=="Nao"){
                    break
                }

                if(resposta!="Sim"){
                    console.log("Resposta inválida")

                    return
                }
            }

            //Confirma o Pedido
            console.log(carrinho)
            console.log(valor_carrinho)
            let resposta = prompt("Confirmar Pedido? (Sim/Não): ")

            if(resposta=="Nao"){
                return
            }

            if(resposta=="Sim"){
                //Cria Pedido
                let data_pedido = prompt("Digite a data do pedido: ")
                let new_pedido = new Pedido(data_pedido, carrinho, valor_carrinho)

                //Adiciona Pedido a lista de pedidos
                pedidos.push(new_pedido)

                console.log("Pedido concluido!")
                console.log("Esse é o ID do seu pedido: " + new_pedido.id_pedido)

                return
            }

            console.log("Resposta inválida")

            return
        }
    }

    cancelar_pedido(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            console.log("Comando reservado para Clientes")

            return
        }

        //Tem um cliente logado
        else if(login_status==0){
            let pedido_id = prompt("Digite o ID do Pedido: ")

            //Procura Pedido na lista de pedidos
            for (let index = 0; index < pedidos.length; index++) {
                //Encontrou o Pedido
                if(pedidos[index].id_pedido==pedido_id){
                    //Cancela o Pedido
                    pedidos[index].status = "cancelado"
                    console.log("Pedido cancelado")
                    
                    //Reabastece o estoque
                    for (let i = 0; i < pedidos[index].lista_produtos.length; i++) {
                        pedidos[index].lista_produtos[i].quantidade_estoque++
                    }

                    return
                }
            }
        }
    }

    ver_meus_pedidos(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            console.log("Comando reservado para Clientes")

            return
        }

        //Tem um cliente logado
        else if(login_status==0){
            let meus_pedidos = []

            let pedido_encontrado = false

            //Procura Pedido na lista de pedidos
            for (let index = 0; index < pedidos.length; index++) {
                //Encontrou o Pedido
                if(pedidos[index].id_cliente==login_conta.id_cliente){
                    pedido_encontrado = true

                    //Adiciona Pedido a lista de meus pedidos
                    meus_pedidos.push(pedidos[index])
                }
            }

            //Nenhum Pedido encontrado
            if(!pedido_encontrado){
                console.log("Você não possui pedidos")
            }

            meus_pedidos.sort(ordem_cronologica)

            console.log(meus_pedidos)
        }
    }

    avaliar_pedido(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            console.log("Comando reservado para Clientes")

            return
        }

        //Tem um cliente logado
        else if(login_status==0){
            let pedido_id = parseInt(prompt("Digite o ID do pedido: "))
            let pedido_encontrado = false

            //Procura Pedido na lista de pedidos
            for (let index = 0; index < pedidos.length; index++) {
                //Encontrou o Pedido
                if(pedidos[index].id_pedido==pedido_id){
                    pedido_encontrado = true

                    break
                }
            }

            //Pedido não encontrado
            if(!pedido_encontrado){
                console.log("Não existem pedidos com esse ID")

                return
            }

            let nota = parseInt(prompt("Dê uma nota para o pedido (0 a 10): "))
            
            //Testa se a nota esta dentro do intervalo
            if(nota<0||nota>10){
                console.log("Nota inválida!")

                return
            }

            let descricao = prompt("Digite um descrição da avaliação")

            let avaliação = new Avaliacao(pedido_id, nota, descricao)

            avaliação.push(avaliação)

            console.log("Avaliação publicada!")

            return
        }
    }

    visualizar_avaliações(){
        //Não tem ninguem logado
        if(login_status==-1){
            console.log("Não tem ninguem logado")
            
            return
        }

        //Tem um funcionário logado
        else if(login_status==1){
            console.log("Comando reservado para Clientes")

            return
        }

        //Tem um cliente logado
        else if(login_status==0){
            console.log(avaliações)
        }
    }
}

function ordem_cronologica(a,b){
    return (a.data_pedido - b.data_pedido)
}

function ordem_alfabetica(a,b){
    return a.nome.localeCompare(b.nome)
}

const sistema = new Sistema()

console.log("Bem vindo")
console.log("Faça o seu cadastro ou login")

const comandos = `Comandos disponíveis:

Fazer cadastro
Fazer login
Sair
Ver meus dados
Modificar meus dados
Ver lista de produtos
Ver lista de pedidos
Ver lista de clientes
Mudar status do pedido
Adicionar produto
Editar produto
Excluir produto
Fazer pedido
Cancelar pedido
Ver meus pedidos
Avaliar pedido
Visualizar avaliacoes

`

console.log(comandos)

let comando = ""

//Interface do programa
while(!sair){
    comando = prompt("Digite o comando: ")

    if(comando == "Fazer login"){
        sistema.login()
    }

    else if(comando == "Fazer cadastro"){
        sistema.cadastro()
    }

    else if(comando == "Sair"){
        sistema.sair()
    }

    else if(comando == "Ver meus dados"){
        sistema.ver_dados()
    }

    else if(comando == "Modificar meus dados"){
        sistema.modificar_dados()
    }

    else if(comando == "Ver lista de produtos"){
        sistema.ver_produtos()
    }

    else if(comando == "Ver lista de pedidos"){
        sistema.ver_pedidos()
    }

    else if(comando == "Ver lista de clientes"){
        sistema.ver_clientes()
    }

    else if(comando == "Mudar status do pedido"){
        sistema.mudar_status_pedido()
    }

    else if(comando == "Adicionar produto"){
        sistema.adicionar_produto()
    }

    else if(comando == "Editar produto"){
        sistema.editar_produto()
    }

    else if(comando == "Excluir produto"){
        sistema.excluir_produto()
    }

    else if(comando == "Fazer pedido"){
        sistema.fazer_pedido()
    }

    else if(comando == "Cancelar pedido"){
        sistema.cancelar_pedido()
    }

    else if(comando == "Ver meus pedidos"){
        sistema.ver_meus_pedidos()
    }

    else if(comando == "Avaliar pedido"){
        sistema.avaliar_pedido()
    }

    else if(comando == "Visualizar avaliacoes"){
        sistema.visualizar_avaliações()
    }
}