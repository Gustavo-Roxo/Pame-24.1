const { none } = require("list")
const prompt = require("prompt-sync")({sigint:true})

//gera os id's de novos clientes e funcionários
let clientes_id = 0
let funcionarios_id = 0

//os bancos de dados do sistema
let cadastros = []
let clientes = []
let funcionarios = []
let pedidos = []

let login_status = -1
let login_conta = 0

//variável que indica se o programa encerrará ou não
//manipulada pelo método sair() da classe Sistema
let sair = false

class Pedido{
    constructor(id_pedido, id_cliente, status, data_pedido){
        this.id_pedido = id_pedido
        this.id_cliente = id_cliente
        this.status = status
        this.data_pedido = data_pedido
    }
}

class Funcionário{
    constructor(id_funcionario, nome, cpf, email, senha){
        this.id_funcionario = id_funcionario
        this.nome = nome
        this.cpf = cpf
        this.email = email
        this.senha = senha
    }
}

class Cliente{
    constructor(id_cliente, nome, data_nascimento, cpf, email, senha){
        this.id_cliente = id_cliente
        this.nome = nome
        this.data_nascimento = data_nascimento
        this.cpf = cpf
        this.email = email
        this.senha = senha
    }
}

class Produtos{
    constructor(validade, preço, quantidade_estoque, nome, descrição){
        this.validade = validade
        this.preço = preço
        this.quantidade_estoque = quantidade_estoque
        this.nome = nome
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
            for (let i = 0; i < cadastros.length(); i++) {
                if (cadastros[i][0] == email) {
                  console.log("Email já cadastrado")
                  return
                }
            }
            let senha = prompt("crie a sua senha: ")

            //cria um novo cadastro
            let cadastro = [email,senha,0]
            cadastros.push(cadastro)

            //cria um novo cliente
            let new_cliente = new Cliente(clientes_id, nome, data_nascimento, cpf, email, senha)
            clientes_id++
            clientes.push(new_cliente)

            return
        }
        
        //usuário escreveu: "funcionário"
        //funcionário = 1 nos cadastros
        else if(conta=="funcionário"){
            let nome = prompt("digite o seu nome: ")
            let cpf = prompt("digite o seu cpf: ")
            let email = prompt("digite o seu email: ")

            //Não permite dois emails iguais nos cadastros
            for (let i = 0; i < cadastros.length(); i++) {
                if (cadastros[i][0] == email) {
                  console.log("Email já cadastrado")
                  return
                }
            }
            let senha = prompt("crie a sua senha: ")

            //cria um novo cadastro
            let cadastro = [email,senha,1]
            cadastros.push(cadastro)

            //cria um novo funcioário
            let new_funcionario = new Funcionário(funcionarios_id, nome, cpf, email, senha)
            funcionarios_id++
            funcionarios.push(new_funcionario)

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
        for (let i = 0; i < cadastros.length(); i++) {

            //Encontrou email nos cadastros
            if (cadastros[i][0] == email) {
                let senha = prompt("digite a sua senha: ")

                //Confere se a senha está correta
                if(cadastros[i][1] == senha){

                    //login como cliente
                    if(cadastros[i][2]==0){
                        login_status=0
                        login_conta=email

                        return
                    }

                    //login como funcionário
                    if(cadastros[i][2]==1){
                        login_status=1
                        login_conta=email

                        return
                    }
                }

                //Senha incorreta
                else{
                    console.log("Senha incorreta\n")

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

        //Tem um funcionário logado
        else if(login_status==1){
            //Procura Funcionário na lista de funcionários
            for (let index = 0; index < funcionarios.length(); index++) {
                //Encontrou o Funcionário
                if(funcionarios[index].email==login_conta){
                    //Imprime os dados do funcionário na tela
                    console.log(funcionarios[index])

                    return
                }
            }
        }

        //Tem um cliente logado
        else if(login_status==0){
            //Procura cliente na lista de clientes
            for (let index = 0; index < clientes.length(); index++) {
                //Encontrou o cliente
                if(clientes[index].email==login_conta){
                    //Imprime os dados do funcionário na tela
                    console.log(clientes[index])

                    return
                }
            }
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
            //Procura Funcionário na lista de funcionários
            for (let index = 0; index < funcionarios.length(); index++) {
                //Encontrou o Funcionário
                if(funcionarios[index].email==login_conta){
                    //Imprime os dados do funcionário na tela
                    console.log(funcionarios[index])

                    return
                }
            }
        }

        //Tem um cliente logado
        else if(login_status==0){
            //Procura cliente na lista de clientes
            for (let index = 0; index < clientes.length(); index++) {
                //Encontrou o cliente
                if(clientes[index].email==login_conta){
                    //Imprime os dados do funcionário na tela
                    console.log(clientes[index])

                    return
                }
            }
        }
    }
}

const sistema = new Sistema()


//Não tem ninguem logado
if(login_status==-1){
    console.log("Não tem ninguem logado")
    
    return
}

//Tem um funcionário logado
else if(login_status==1){

}

//Tem um cliente logado
else if(login_status==0){
    
}