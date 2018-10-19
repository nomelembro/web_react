import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { throws } from 'assert';

function Item(props) {
  return <li>{props.message}</li>;
}

class App extends Component {


  constructor(props) {
    super(props);
    this.state = { nome: '', rga: '', alunos: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchAlunos = this.fetchAlunos.bind(this);

  }

  componentDidMount() {
    var myRequest = new Request('http://paw.ic.ufmt.br/jivago/alunos-api/public/index.php/alunos');
    let alunos = [];

    fetch(myRequest)
      .then(response => response.json())
      .then(data => {
        this.setState({ alunos: data })
      })
  }

  fetchAlunos() {
    return fetch('http://paw.ic.ufmt.br/jivago/alunos-api/public/index.php/alunos');
  }


  handleChange(event) {
    this.setState({ nome: event.target.value });
  }

  handleChange2(event) {
    this.setState({ rga: event.target.value });
  }

  handleSubmit(event) {
    alert('Nome: ' + this.state.nome + ' RGA: ' + this.state.rga);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
          <input type="text" nome={this.state.nome} onChange={this.handleChange} />
          </label>
          <label>
            RGA:
          <input type="text" rga={this.state.rga} onChange={this.handleChange2} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div>
          <br />
          <div>
            <h1>Alunos</h1>
            <ul>
              <ul></ul>
              {this.state.alunos.map(aluno => {
                return <li key={`aluno-${aluno.rga}`}>{aluno.nome}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
