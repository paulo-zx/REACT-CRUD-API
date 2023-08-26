import React from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";

class Alunos extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            id:0,
            nome:'',
            email:'',
            alunos: [
               /* {'id':1, 'nome':'Luiz Fernando', 'email':'luiz@teste.com'},
                {'id':2, 'nome':'João Felipe', 'email':'joao@teste.com'},
                {'id':3, 'nome':'Paulo', 'email':'paulo@teste.com'}*/
            ],
            modalAberta:false
        }
    }

    componentDidMount(){
        this.buscarAluno();
    }

    componentWillUnmount(){

    }

    buscarAluno = () => {
        fetch("link da api")
        .then(respostas => respostas.json())
        .then(dados => {
            this.setState({alunos : dados})
        })
    }

    deletarAluno = (id) => {
        fetch("link da api"+id, {method:'DELETE'})
        .then(respostas =>  {
           if(respostas.ok){
            this.buscarAluno();
           }
        })
    }

    carregarDados = (id) => {
        fetch("link da api"+id, {method:'GET'})
        .then(respostas => respostas.json())
        .then(aluno => {
            this.setState({
                id : aluno.id,
                nome: aluno.nome,
                email: aluno.email
            })
            this.abrirModal();
        })
        
    }

    cadastrarAluno = (aluno) => {
        fetch("link da api",
         {
            method:'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(aluno)
        }
        )
        .then(respostas =>  {
           if(respostas.ok){
            this.buscarAluno();
           }else {
            alert('Não foi possivel realizar o cadastro');
           }
        })
    }

    atualizarAluno = (aluno) => {
        fetch("link da api",
         {
            method:'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(aluno)
        }
        )
        .then(respostas =>  {
           if(respostas.ok){
            this.buscarAluno();
           }else {
            alert('Não foi possivel atualizar o cadastro');
           }
        })
    }

    renderTabela(){
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        this.state.alunos.map((aluno) => 
                            <tr>
                                <td>{aluno.name}</td>
                                <td>{aluno.level}</td>
                                <td>
                                    <Button variant="secondary" onClick={() =>this.carregarDados(aluno.id)}>Atualizar</Button>
                                    <Button variant="danger" onClick={() =>this.deletarAluno(aluno.id)}>Excluir</Button>
                                </td>
                            </tr>
                        )
                    }

                    
                    
                </tbody>

            </Table>
        )
    }

    atualizaNome = (e) => {
        this.setState(
            {
                nome:e.target.value
            }
        )
    }

    atualizaEmail = (e) => {
        this.setState(
            {
                email:e.target.value
            }
        )
    }

    submit = () => {

        if(this.state.id === 0){
            const aluno = {
                nome: this.state.nome,
                email: this.state.email
            }
    
            this.cadastrarAluno(aluno);
        } else {
            const aluno = {
                id: this.state.id,
                nome: this.state.nome,
                email: this.state.email
            }
    
            this.atualizarAluno(aluno);
        }
        this.fecharModal();
       
    }

    reset = () => {
        this.setState(
            {   
                id: 0,
                nome: '',
                email: ''
            }
        )
        this.abrirModal();
    }

    fecharModal = () => {
        this.setState({
            modalAberta: false
        })
    }

    abrirModal = () => {
        this.setState({
            modalAberta: true
        })
    }

    render(){
        return (
            <div>

                <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
                        <Modal.Header closeButton>
                        <Modal.Title>DADOS DOS ALUNOS</Modal.Title>
                        </Modal.Header>
                            <Modal.Body>

                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control type="text"  value={this.state.id} readOnly={true}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control type="text" placeholder="Digite seu Nome" value={this.state.nome} onChange={this.atualizaNome}/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Digite seu email" value={this.state.email} onChange={this.atualizaEmail}/>
                                        <Form.Text className="text-muted">
                                        Utilize o seu melhor e-mail
                                        </Form.Text>
                                    </Form.Group>



                                    
                                </Form>

                            </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.fecharModal}>
                            Close
                        </Button>
                        
                        <Button variant="primary" type="submit" onClick={this.submit}>
                            Salvar
                        </Button>

                        </Modal.Footer>
                </Modal>

                <Button variant="warning" type="submit" onClick={this.reset}>
                    Novo
                </Button>
                

                {this.renderTabela()}
            </div>
        )
    }

    
}

export default Alunos;