
/** @type {Array<{category: string, value: number, isJoker: boolean} | {category: string, value: number, question: string, answers?: Array<string>, solution: string|number }>} */
const bibleQuestions = [
    {
        category: 'Bibel',
        value: 10,
        question: 'Wie viele Jünger hatte Jesus?',
        solution: '12',
    },
    {
        category: 'Bibel',
        value: 20,
        question: 'Wer wurde von einem Fisch verschluckt, aber nach 3 Tagen & 3 Nächten wieder ausgespuckt?',
        solution: 'Jona',
    },
    {
        category: 'Bibel',
        value: 30,
        question: 'Wie heißt der Zöllner, der auf einem Baum auf Jesus wartete?',
        solution: 'Zahäus',
    },
    {
        category: 'Bibel',
        value: 40,
        isJoker: true,
    },
    {
        category: 'Bibel',
        value: 50,
        question: 'Schätzfrage: Wie viele Bücher hat die Bibel?',
        solution: '73',
    },
    {
        category: 'Bibel',
        value: 60,
        question: 'Wie heißen die 4 Evangelien?',
        solution: 'Markus, Matthäus, Lukas und Johannes',
    },
    // {
    //   category: "Bibel",
    //   value: 70,
    //   question: "Wie heißt der Bruder von Kain?",
    //   solution: "Abel",
    // },
    // {
    //   category: "Bibel",
    //   value: 80,
    //   question: "Was ist das letzte Buch der Bibel?",
    //   solution: "Offenbarung",
    // },
];

const rfQuestions = [
    {
        category: 'Rauchfang',
        value: 10,
        question: 'Wie viele Stufen hat der Rauchfang? (Alle Treppen)',
        solution: '32',
    },
    {
        category: 'Rauchfang',
        value: 20,
        question: 'Wie viele Räume gibt es hier?',
        solution: '',
    },
    {
        category: 'Rauchfang',
        value: 30,
        isJoker: true,
    },
    {
        category: 'Rauchfang',
        value: 40,
        question: 'Welche Hausnummer hat der Rauchfang',
        solution: '15',
    },
    {
        category: 'Rauchfang',
        value: 50,
        question: 'Wann putzt die Mädchenjungschar den Rauchfang?',
        solution: '14. September',
    },
    {
        category: 'Rauchfang',
        value: 60,
        question: 'Wann wurde der Rauchfang renoviert?',
        answers: ['2004', '2008', '2012', '2016'],
        solution: 0,
    },
    // {
    //   category: "Rauchfang",
    //   value: 70,
    //   question: "Wann/Wie oft hat die Jungenjungschar Programm?",
    //   solution: "Jede Woche Samstags",
    // },
    // {
    //   category: "Rauchfang",
    //   value: 80,
    //   question: "Geschichte erzählen",
    //   solution: "",
    // },
];

const showQuestions = [
    {
        category: 'Unterhaltung',
        value: 10,
        question: 'Welcher dieser Fernsehsender stammt ursprünglich aus Amerika?',
        answers: ['ZDF', 'Disney Channel', 'RTL'],
        solution: 1,
    },
    {
        category: 'Unterhaltung',
        value: 20,
        question: '?',
        answers: ['ThaddäusTentakel', 'SpongeBob', 'PatrickStar'],
        solution: 1,
    },
    {
        category: 'Unterhaltung',
        value: 30,
        question: 'Durch welche Plattform wurde die Videoproduzentin Bianca Claßen erstmals bekannt? ',
        answers: ['YouTube', 'Facebook', 'Musical.ly'],
        solution: 0,
    },
    {
        category: 'Unterhaltung',
        value: 40,
        question: 'Von wem wird die Figur Harry Potter in der gleichnamigen Filmreihe gespielt?',
        answers: ['Daniel Wellington', 'James Miller ', 'Daniel Radcliffe'],
        solution: 2,
    },
    {
        category: 'Unterhaltung',
        value: 50,
        question: 'Aus welchem Land kommt Justin Biebe?',
        answers: ['Großbritannien ', 'Kanada', 'USA'],
        solution: 1,
    },
    {
        category: 'Unterhaltung',
        value: 60,
        isJoker: true,
    },
    // {
    // category: "Unterhaltung",
    // value: 70,
    // question: "Seit wann gibt es die Castingshow „Deutschland sucht den Superstar“?",
    // answers: ["2005", "2003", "2002"],
    // solution: 2,
    // },
    // {
    //   category: "Unterhaltung",
    //   value: 80,
    //   question: "In welchem Land wurde die Schauspielerin Emma Watson geboren?",
    //   answers: ["Belgien", "Frankreich", "England"],
    //   solution: 1,
    // },
];
const actionQuestions = [
    {
        category: 'Aktion',
        value: 10,
        question: 'Sucht (und bringt uns) drei Kugelschreiber!',
        solution: '🖊🖊🖊',
    },
    {
        category: 'Aktion',
        value: 20,
        question: 'Wettessen',
        solution: '🤮',
    },
    {
        category: 'Aktion',
        value: 30,
        question: 'Mathe',
        solution: '♾',
    },
    {
        category: 'Aktion',
        value: 40,
        question: 'Bringt uns einen Locher!',
        solution: '✈',
    },
    {
        category: 'Aktion',
        value: 50,
        question: 'Wann putzt die Mädchenjungschar den Rauchfang?',
        solution: '14. September',
    },
    {
        category: 'Aktion',
        value: 60,
        question: 'Tiere?',
        solution: '🦓🦒',
    },
    // {
    //   category: "Aktion",
    //   value: 70,
    //   isJoker: true,
    // },
    // {
    //   category: "Aktion",
    //   value: 80,
    //   question: 'Wo steht der Spruch: "Der Mensch sieht was vor Augen ist, der Herr aber sieht das Herz an." ?',
    //   solution: "Rauchfang",
    // },
];

const sportsQuestions = [
    {
        category: 'Sport',
        value: 10,
        question: 'Schreibe 5 Ballsportarten auf',
        solution: '',
    },
    {
        category: 'Sport',
        value: 20,
        question: 'Wer ist als letztes Fußball-Weltmeister geworden?',
        solution: 'Frankreich',
    },
    {
        category: 'Sport',
        value: 30,
        question: 'Was sind die wichtigsten Markierungen/Linien auf einem Handballfeld?',
        solution: 'Außenlinien, 6/9/7-Meter-Linie, Mittellinie',
    },
    {
        category: 'Sport',
        value: 40,
        question: 'Wie nennt man den "Ball" beim Hockey?',
        solution: 'Puck',
    },
    {
        category: 'Sport',
        value: 50,
        question: 'bei welchem Sport ist der Ball nicht rund?',
        solution: 'Football',
    },
    {
        category: 'Sport',
        value: 60,
        isJoker: true,
    },
    // {
    //   category: "Sport",
    //   value: 70,
    //   question: "Welchen Sport machte Henry Maske?",
    //   solution: "Boxen",
    // },
    // {
    //   category: "Sport",
    //   value: 80,
    //   question: "Wer wurde in der Saison 2011/2012 deutscher Fußball-Meister?",
    //   solution: "Borussia Dortmund",
    // },
];

const personRevealQuestions = [
    {
        category: 'Personen',
        value: 10,
        type: 'image-reveal',
        imageUrl: '/images/logo.png',
        solution: 'Mr. X',
        // question: "Schreibe 5 Ballsportarten auf",
        // solution: "",
    },
    {
        category: 'Personen',
        value: 20,
        type: 'image-reveal',
        imageUrl: '/images/logo.png',
        solution: 'Mr. X',
        // question: "Schreibe 5 Ballsportarten auf",
        // solution: "",
    },
    {
        category: 'Personen',
        value: 30,
        type: 'image-reveal',
        imageUrl: '/images/logo.png',
        solution: 'Mr. X',
        // question: "Schreibe 5 Ballsportarten auf",
        // solution: "",
    },
    {
        category: 'Personen',
        value: 40,
        type: 'image-reveal',
        imageUrl: '/images/thunberg.jpg',
        solution: 'Greta',
        // question: "Schreibe 5 Ballsportarten auf",
        // solution: "",
    },
];

const questions = [...personRevealQuestions, ...rfQuestions, ...showQuestions, ...actionQuestions, ...sportsQuestions];

export default questions;
