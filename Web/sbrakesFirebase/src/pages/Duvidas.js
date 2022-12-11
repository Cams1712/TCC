import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Ds from '../assets/css/Duvidas.module.css';
import Accordion from '../components/radix/Accordion';
import { ComponentContext } from '../hooks/useComponentContext';

const duvidasSistema = [
  {
    pergunta: 'Posso utilizar esse sistema em qualquer veículo?',
    resposta:
      'Inicialmente, este dispositivo será funcional apenas para caminhões. O uso deste sistema em outros veículos pode não apresentar resultados esperados.',
    value: 'item-1',
  },
  {
    pergunta: 'O motorista precisa acionar os freios manualmente?',
    resposta:
      'Não! Os freios poderão ser acionados manualmente caso o motorista esteja conduzindo o veículo e que saiba o momento correto de ativar a frenagem manual. Caso contrário, o próprio sistema poderá decidir o momento adequado para ativar a funcionalidade.',
    value: 'item-2',
  },
  {
    pergunta: 'Preciso estar conectado via internet para acionar os freios?',
    resposta:
      'Não! O único requisito necessário para acionar os freios é a conexão Bluetooth do smartphone com o veículo. Não será necessário utilizar um pacote de dados para realizar a conexão.',
    value: 'item-3',
  },
  {
    pergunta: 'Existem requisitos mínimos para utilizar o sistema no celular?',
    resposta:
      'Alguns smartphones não poderão ser utilizados para rodar o sistema de frenagem segura. É importante consultar o responsável da sua empresa para a aquisição de um dispositivo que atenda os requisitos mínimos de software: Android 5.0 ou superior.',
    value: 'item-4',
  },
  {
    pergunta: 'Não consegui realizar a conexão Bluetooth, e agora?',
    resposta:
      'A cabine do caminhão dispõe de dois botões que você poderá utilizar para acionar o sistema de freios. No entanto, é fundamental que você entre em contato com o responsável da sua empresa para poder auxiliar você neste processo. Em caso problemas relacionados ao sistema, é necessário entrar em contato conosco para uma avaliação mais rigorosa.',
    value: 'item-5',
  },
];

const duvidasDashboard = [
  {
    pergunta:
      'Cadastro do usuário, mas ainda aparece "Preencha os dados corretamente"',
    resposta:
      'Ao cadastrar um novo funcionário, esteja ciente de que nosso sistema aceita apenas endereços de emails válidos. Dessa forma, ao digitar um email inválido, nosso sistema irá bloquear o cadastro deste funcionário',
    value: 'item-6',
  },
  {
    pergunta:
      'Requisitei a redefinição de senha, mas nada chegou ao meu email. Como proceder?',
    resposta:
      'Neste caso, é necessário entrar em contato com o setor de T.I da sua empresa para que eles possam verificar os problemas causados no momento de redefinir sua senha. Um dos motivos pode ser que você tenha cadastrado outro email no sistema ou cadastrado um email incorreto.',
    value: 'item-7',
  },
  {
    pergunta:
      'Errei na digitação da credencial do funcionário, o que posso fazer?',
    resposta:
      'Ao editar os dados do funcionário, é possível alterar todas as suas informações EXCETO a credencial. Neste caso, o administrador deve entrar em contato com a equipe de T.I da sua empresa para realizar as correções necessárias.',
    value: 'item-8',
  },
  {
    pergunta:
      'Por que minha lista de funcionários não mostra todos os funcionarios?',
    resposta:
      'A lista de funcionários mostrará todos os funcionários que atendam o seguinte critério: Não ser o usuário logado no sistema e apresentar elegibilidade com base numa série de critérios definidos pela nossa equipe. Comumente, todos os funcionários, com exceção ao logado, devem aparecer. Caso isso não ocorra, entre em contato com a equipe de T.I da sua empresa.',
    value: 'item-9',
  },
  {
    pergunta: 'Por que não consigo sair da tela de login?',
    resposta:
      'Alguns motivos principais: o primeiro motivo pode estar relacionado ao funcionário possuir ou não permissões administrativas no sistema. Caso tenha, ele poderá acessar o sistema. Outro motivo pode estar relacionado com a instabilidade de nosso sistema que, infelizmente, pode acontecer devido ao grande número de acessos. Neste caso, basta atualizar a página.',
    value: 'item-10',
  },
];

export default function Duvidas() {
  const { setDisplay } = React.useContext(ComponentContext);

  React.useEffect(() => {
    setDisplay(false);
  }, []);

  return (
    <div className={Ds.Container}>
      <h1 className={Ds.Title}>Dúvidas</h1>
      <p style={{ color: 'gray' }}>Principais dúvidas de nossos clientes</p>
      <Row className={Ds.Duvidas}>
        <Col sm={6}>
          <h4 className={Ds.DuvidasTitle}>
            Em relação ao sistema de segurança
          </h4>
          <Accordion duvidas={duvidasSistema} />
        </Col>
        <Col sm={5} className={Ds.MaisDuvidas}>
          <p>
            Não encontrou respostas para suas perguntas? Entre em contato com a
            nossa central de atendimento online clicando no ícone inferior
            direito da sua tela.
          </p>
        </Col>
      </Row>

      <Row className={Ds.Duvidas}>
        <Col>
          <h4 className={Ds.DuvidasTitle}>Em relação ao Dashboard</h4>
          <Accordion duvidas={duvidasDashboard} />
        </Col>
      </Row>
    </div>
  );
}
