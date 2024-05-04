// Hooks
import { useState, useEffect } from 'react';

// Importando o CSS
import './App.css';

// Importando o componente Formulario
import Formulario from './Formulario';

// Importando o componente Tabela
import Tabela from './Tabela';

// Componente
function App() {

  // useState
  const [indiceVetor, setIndiceVetor] = useState('');
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cidade, setCidade] = useState('');
  const [vetor, setVetor] = useState([]);

  // Obter a listagem de pessoas da API
  useEffect(() => {
    fetch('http://localhost:3000/pessoa')
    .then(retorno => retorno.json())
    .then(retorno => {
        // Verificar se o vetor retornado é diferente do vetor atual antes de atualizá-lo
        if(JSON.stringify(retorno) !== JSON.stringify(vetor)) {
            setVetor(retorno);
        }
    });
  }, []);

  // Função para cadastrar
  const cadastrar = () => {

    // Criar objeto
    let obj = {'nome':nome, 'idade':idade, 'cidade':cidade}

    // Requisição para a API
    fetch('http://localhost:3000/pessoa', {method:'POST', headers: { 'Content-Type': 'application/json' }, body:JSON.stringify(obj)})
    .then(retorno => retorno.json())
    .then(retorno => {
      let copiaVetor = [...vetor];
      copiaVetor.push(retorno);
      setVetor(copiaVetor);
    })

    // Limpar campos
    setNome('');
    setIdade('');
    setCidade('');
  }

  // Função para selecionar o usuário
  const selecionar = (indice) => {
    setIndiceVetor(indice);

    setId(vetor[indice].id);
    setNome(vetor[indice].nome);
    setIdade(vetor[indice].idade);
    setCidade(vetor[indice].cidade);

    setBtnCadastrar(false);
  }

  // Função para alterar os dados
  const alterar = () => {
    let obj = {'nome':nome, 'idade':idade, 'cidade':cidade}

    // Requisição para a API
    fetch('http://localhost:3000/pessoa/'+id, {method:'PUT', headers: { 'Content-Type': 'application/json' }, body:JSON.stringify(obj)})
    .then(retorno => retorno.json())
    .then(retorno => {
      let copiaVetor = [...vetor];
      copiaVetor[indiceVetor] = retorno;
      setVetor(copiaVetor);
    })

    setId('');
    setNome('');
    setIdade('');
    setCidade('');
    setBtnCadastrar(true);
  }

  // Função para remover
  const remover = () => {
    // Requisição para a API
    fetch('http://localhost:3000/pessoa/'+id, {method:'DELETE', headers: { 'Content-Type': 'application/json' }})
    .then(retorno => retorno.json())
    .then(retorno => {
      let copiaVetor = [...vetor];
      copiaVetor.splice(indiceVetor, 1);
      setVetor(copiaVetor);
    })

    setId('')
    setNome('');
    setIdade('');
    setCidade('');
    setBtnCadastrar(true);
  }

  // Função para cancelar a edição ou remoção
  const cancelar = () => {
    setNome('');
    setIdade('');
    setCidade('');

    setBtnCadastrar(true);
  }

  // Retorno
  return (
    <div>
      <Formulario btnCadastrar={btnCadastrar} setNome={setNome} setIdade={setIdade} setCidade={setCidade} cadastrar={cadastrar} alterar={alterar} remover={remover} cancelar={cancelar} nome={nome} idade={idade} cidade={cidade} />              
      <Tabela vetor={vetor} selecionar={selecionar} />
    </div>
  );
}

// Exportando o componente
export default App;
