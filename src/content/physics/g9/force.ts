import { topicSchema, type Topic } from '@/content/schema/topic'

/**
 * Convenção de texto: **palavra** vira destaque na renderização.
 * Ver design-system/patterns/RichText.tsx.
 */
const force: Topic = {
  id: 'physics-g9-force',
  subjectId: 'physics',
  gradeIds: ['g9'],
  title: 'Força',
  slug: 'forca',
  summary: 'O que é força, como ela age sobre os objetos e como muda o movimento.',
  difficulty: 2,
  estimatedMinutes: 15,
  prerequisites: [],
  lesson: {
    intro:
      'Bora entender força de verdade? Prometo: nada de decoreba. Em poucos minutos você vai olhar pra qualquer objeto se movendo e saber o que está acontecendo.',
    outro:
      'Isso aí! Você já sabe o que é força, como calcular e — o mais importante — como pensar sobre movimento sem cair na pegadinha mais comum.',
    blocks: [
      {
        type: 'concept',
        id: 'what-is-force',
        title: 'O que é força?',
        body: 'Força é um **empurrão** ou um **puxão**. Sempre que dois objetos interagem, existe força entre eles.\n\nVocê não vê a força — você vê o **efeito** dela.',
        keyPoints: [
          'Chutar uma bola: seu pé faz força nela.',
          'Um ímã atraindo um clipe: força sem encostar.',
          'Você sentado na cadeira: a cadeira faz força pra cima em você.',
        ],
        alternatives: {
          simpler: {
            body: 'Força é quando você **empurra** ou **puxa** alguma coisa. Só isso. Se algo mudou de jeito ou de lugar, teve força ali.',
          },
          analogy: {
            body: 'Pensa no vento. Você não enxerga o vento, mas vê a árvore balançando. Com força é igual: você não vê a força, vê o **objeto reagindo** a ela.',
          },
          practical: {
            body: 'Agora mesmo tem força agindo em você: a **gravidade** te puxa pra baixo e a cadeira (ou o chão) te empurra pra cima. As duas se equilibram — por isso você não afunda nem flutua.',
          },
          visual: {
            body: 'Uma força é sempre desenhada como uma **seta**. O tamanho da seta mostra a intensidade, e a ponta mostra pra onde ela empurra.',
            diagram: '   caixa\n   ┌─────┐\n──▶│     │──▶  seta maior = força maior\n   └─────┘',
          },
        },
      },
      {
        type: 'howItWorks',
        id: 'how-force-works',
        title: 'O que a força faz?',
        body: 'Uma força pode fazer **três** coisas com um objeto:',
        steps: [
          'Colocar em movimento o que estava parado.',
          'Mudar a velocidade do que já estava se movendo (acelerar ou frear).',
          'Mudar a direção do movimento, ou deformar o objeto.',
        ],
        alternatives: {
          simpler: {
            body: 'Força **muda** as coisas: faz começar a andar, faz andar mais rápido, faz parar, faz virar ou entorta.',
          },
          practical: {
            body: 'No futebol dá pra ver os três: o chute tira a bola do lugar, o goleiro segura e ela para, e um toque de leve faz ela desviar pro lado.',
          },
        },
      },
      {
        type: 'checkpoint',
        id: 'cp-effects',
        question:
          'Um skatista está descendo a rua em linha reta e vai **ficando mais rápido**. Isso acontece porque:',
        options: [
          {
            id: 'a',
            text: 'Existe uma força resultante agindo nele.',
            correct: true,
            feedback: 'Exatamente. Mudou de velocidade, então tem força resultante ali — no caso, a gravidade puxando ele ladeira abaixo.',
          },
          {
            id: 'b',
            text: 'Ele não precisa de força nenhuma para ganhar velocidade.',
            correct: false,
            feedback:
              'Quase! Sem força ele continuaria na **mesma** velocidade. Como ele está ficando mais rápido, alguma força está agindo. Tenta de novo.',
          },
        ],
        successFeedback: 'Você pegou a ideia principal: velocidade mudou = teve força.',
      },
      {
        type: 'formula',
        id: 'newton-second-law',
        title: 'A fórmula da força',
        latex: 'F = m \\cdot a',
        terms: [
          { symbol: 'F', name: 'Força resultante', unit: 'N (newton)' },
          { symbol: 'm', name: 'Massa do objeto', unit: 'kg' },
          { symbol: 'a', name: 'Aceleração', unit: 'm/s²' },
        ],
        whenToUse:
          'Use quando quiser descobrir **quanta** força é preciso para acelerar algo — ou qual aceleração uma força vai causar. Quanto mais pesado o objeto, mais força ele exige para a mesma aceleração.',
        quickExample: {
          latex: 'F = 2 \\cdot 3 = 6\\ \\text{N}',
          caption: 'Uma caixa de 2 kg acelerando a 3 m/s² precisa de 6 N.',
        },
        alternatives: {
          simpler: {
            body: 'Multiplique a **massa** pela **aceleração** e você tem a força. Objeto mais pesado ou aceleração maior = mais força.',
          },
          analogy: {
            body: 'Empurrar um carrinho de supermercado vazio é fácil. Cheio, com a mesma pressa, você precisa empurrar muito mais forte. A massa aumentou, então a força também precisa aumentar.',
          },
          stepByStep: {
            body: 'Para usar a fórmula:',
            steps: [
              'Descubra a massa (m), em quilogramas.',
              'Descubra a aceleração (a), em m/s².',
              'Multiplique os dois: F = m × a.',
              'O resultado sai em newtons (N).',
            ],
          },
        },
      },
      {
        type: 'example',
        id: 'example-cart',
        title: 'Vamos resolver junto',
        statement:
          'Um carrinho de **4 kg** é empurrado e ganha uma aceleração de **2 m/s²**. Qual é a força aplicada nele?',
        given: ['massa (m) = 4 kg', 'aceleração (a) = 2 m/s²', 'força (F) = ?'],
        steps: [
          {
            title: 'Identifique o que você tem',
            body: 'O enunciado já deu a massa e a aceleração. É força que queremos descobrir.',
          },
          {
            title: 'Escolha a fórmula',
            body: 'Temos massa e aceleração, e queremos força. A fórmula encaixa direto:',
            latex: 'F = m \\cdot a',
          },
          {
            title: 'Substitua os valores',
            body: 'Troque as letras pelos números do enunciado:',
            latex: 'F = 4 \\cdot 2',
          },
          {
            title: 'Calcule',
            body: 'Agora é só multiplicar — e não esqueça a unidade.',
            latex: 'F = 8\\ \\text{N}',
          },
        ],
        answer: 'A força aplicada no carrinho é de **8 newtons**.',
        answerLatex: 'F = 8\\ \\text{N}',
        alternatives: {
          stepByStep: {
            body: 'Resumindo o caminho:',
            steps: [
              'Anote o que o enunciado deu: m = 4 kg e a = 2 m/s².',
              'Escreva a fórmula: F = m × a.',
              'Substitua: F = 4 × 2.',
              'Responda com a unidade: F = 8 N.',
            ],
          },
          practical: {
            body: 'Se esse mesmo carrinho estivesse com **8 kg** (o dobro) e você quisesse a mesma aceleração, precisaria de 16 N — o dobro de força. Massa dobrou, força dobrou.',
          },
        },
      },
      {
        type: 'commonMistake',
        id: 'mistake-sustain',
        title: 'A pegadinha clássica',
        wrong: 'Se um objeto está se movendo, é porque tem força empurrando ele.',
        why: 'No dia a dia tudo sempre para, então parece que o movimento "acaba" quando a força acaba. Mas o que faz parar é o **atrito** — não a falta de força.',
        right:
          'Força é o que **muda** o movimento. Para continuar na mesma velocidade, um objeto não precisa de força nenhuma.',
        misconceptionId: 'force-sustains-motion',
        alternatives: {
          practical: {
            body: 'Pensa numa nave no espaço, com o motor desligado. Não tem ar, não tem atrito. Ela continua viajando na mesma velocidade **para sempre**, sem nenhuma força empurrando.',
          },
          analogy: {
            body: 'É como empurrar um livro na mesa: ele para. Mas empurre um disco de hóquei no gelo — ele desliza muito mais longe. Quanto menos atrito, mais ele continua sozinho.',
          },
        },
      },
      {
        type: 'checkpoint',
        id: 'cp-formula',
        question:
          'Se a **força resultante aumentar** e a massa continuar a mesma, o que acontece com a aceleração?',
        options: [
          {
            id: 'a',
            text: 'Aumenta também.',
            correct: true,
            feedback: 'Isso! Em F = m · a, com a massa fixa, mais força significa mais aceleração.',
          },
          {
            id: 'b',
            text: 'Diminui.',
            correct: false,
            feedback:
              'Vamos olhar a fórmula juntos: F = m · a. Se F cresce e m fica igual, o "a" precisa crescer para a conta fechar. Tenta de novo.',
          },
          {
            id: 'c',
            text: 'Fica igual.',
            correct: false,
            feedback:
              'Se a aceleração ficasse igual e a massa também, a força não teria como mudar. Como F mudou, o "a" mudou junto. Tenta de novo.',
          },
        ],
        successFeedback: 'Você já consegue ler a fórmula, não só decorar. É exatamente isso.',
      },
    ],
  },
  challenge: {
    question:
      'Um carrinho de brinquedo está se movendo em linha reta sobre uma mesa sem atrito. O que é necessário para que ele continue se movendo na mesma velocidade?',
    options: [
      {
        id: 'a',
        text: 'Uma força constante empurrando o carrinho.',
        correct: false,
        misconceptionId: 'force-sustains-motion',
      },
      { id: 'b', text: 'Nenhuma força — ele continua por inércia.', correct: true },
      {
        id: 'c',
        text: 'Uma força cada vez maior.',
        correct: false,
        misconceptionId: 'force-sustains-motion',
      },
    ],
  },
  misconceptions: [
    {
      id: 'force-sustains-motion',
      label: 'Achar que é preciso força para manter o movimento',
      whyItHappens:
        'No dia a dia, o atrito faz os objetos pararem, então parece que "falta força" quando eles desaceleram.',
      correction:
        'Sem atrito ou resistência, um objeto em movimento continua se movendo sem nenhuma força atuando (1ª Lei de Newton).',
    },
  ],
}

export default topicSchema.parse(force)
