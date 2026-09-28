export interface TextParagraph {
  id: string;
  es: string;
  am: string;
  keywords?: { es: string; am: string }[];
}

export interface CommunicationElement {
  id: string;
  number: number;
  esName: string;
  amName: string;
  esDef: string;
  amDef: string;
  esExample: string;
  amExample: string;
  iconName: string;
  roleBadge: string;
  color: {
    bg: string;
    border: string;
    text: string;
    light: string;
    accent: string;
  };
}

export interface QuestionAnswer {
  id: number;
  esQuestion: string;
  amQuestion: string;
  esAnswer: string;
  amAnswer: string;
}

export interface VocabularyItem {
  id: string;
  es: string;
  am: string;
  category: 'element' | 'action' | 'concept' | 'channel';
  pronunciation?: string;
  exampleEs?: string;
  exampleAm?: string;
}

export const APP_METADATA = {
  titleEs: "3. ELEMENTOS DE LA COMUNICACIÓN",
  titleAm: "3. ՀԱՂՈՐԴԱԿՑՈՒԹՅԱՆ ՏԱՐՐԵՐԸ",
  subtitleEs: "Aprende los elementos de la comunicación en español con traducción interactiva al armenio.",
  subtitleAm: "Սովորեք իսպաներեն հաղորդակցության տարրերը՝ սեղմելով ցանկացած իսպաներեն տեքստի վրա հայերեն թարգմանությունը տեսնելու համար։",
};

// 10 paragraphs of the full text (Texto completo / Լիարժեք տեքստ)
export const FULL_TEXT_PARAGRAPHS: TextParagraph[] = [
  {
    id: "p1",
    es: "La comunicación es el proceso mediante el cual una persona transmite información a otra.",
    am: "Հաղորդակցությունը այն գործընթացն է, որի միջոցով մի մարդ տեղեկություն է փոխանցում մեկ ուրիշին։",
    keywords: [
      { es: "La comunicación", am: "Հաղորդակցությունը" },
      { es: "el proceso", am: "գործընթացը" },
      { es: "mediante el cual", am: "որի միջոցով" },
      { es: "transmite información", am: "տեղեկություն է փոխանցում" }
    ]
  },
  {
    id: "p2",
    es: "Para que exista comunicación, intervienen varios elementos: el emisor, el receptor, el mensaje, el código, el canal y el contexto.",
    am: "Հաղորդակցության համար մասնակցում են մի քանի տարրեր՝ ուղարկողը, ստացողը, հաղորդագրությունը, կոդը, կապուղին և համատեքստը։",
    keywords: [
      { es: "Para que exista", am: "Որպեսզի գոյություն ունենա" },
      { es: "intervienen", am: "մասնակցում են / ներգրավված են" },
      { es: "varios elementos", am: "մի քանի տարրեր" }
    ]
  },
  {
    id: "p3",
    es: "El emisor es la persona que envía el mensaje.",
    am: "Ուղարկողը այն մարդն է, ով ուղարկում է հաղորդագրությունը։",
    keywords: [
      { es: "El emisor", am: "Ուղարկողը" },
      { es: "la persona", am: "անձը / մարդը" },
      { es: "envía el mensaje", am: "ուղարկում է հաղորդագրությունը" }
    ]
  },
  {
    id: "p4",
    es: "El receptor es la persona que recibe el mensaje.",
    am: "Ստացողը այն մարդն է, ով ստանում է հաղորդագրությունը։",
    keywords: [
      { es: "El receptor", am: "Ստացողը" },
      { es: "recibe", am: "ստանում է" }
    ]
  },
  {
    id: "p5",
    es: "El mensaje es la información que se transmite.",
    am: "Հաղորդագրությունը փոխանցվող տեղեկությունն է։",
    keywords: [
      { es: "El mensaje", am: "Հաղորդագրությունը" },
      { es: "la información", am: "տեղեկությունը" },
      { es: "se transmite", am: "փոխանցվում է" }
    ]
  },
  {
    id: "p6",
    es: "El código es el sistema de signos que utilizan el emisor y el receptor para comunicarse, por ejemplo, una lengua.",
    am: "Կոդը այն նշանների համակարգն է, որը օգտագործում են հաղորդակցության մասնակիցները, օրինակ՝ լեզուն։",
    keywords: [
      { es: "El código", am: "Կոդը" },
      { es: "sistema de signos", am: "նշանների համակարգ" },
      { es: "utilizan", am: "օգտագործում են" },
      { es: "por ejemplo, una lengua", am: "օրինակ՝ լեզուն" }
    ]
  },
  {
    id: "p7",
    es: "El canal es el medio por el que se transmite el mensaje. Puede ser el aire, el teléfono, una carta, Internet, etc.",
    am: "Կապուղին այն միջոցն է, որով փոխանցվում է հաղորդագրությունը։ Այն կարող է լինել օդը, հեռախոսը, նամակը, ինտերնետը և այլն։",
    keywords: [
      { es: "El canal", am: "Կապուղին" },
      { es: "el medio", am: "միջոցը" },
      { es: "el aire", am: "օդը" },
      { es: "el teléfono", am: "հեռախոսը" },
      { es: "una carta", am: "նամակը" },
      { es: "Internet", am: "ինտերնետը" }
    ]
  },
  {
    id: "p8",
    es: "El contexto es la situación en la que se produce la comunicación.",
    am: "Համատեքստը այն իրավիճակն է, որի մեջ տեղի է ունենում հաղորդակցությունը։",
    keywords: [
      { es: "El contexto", am: "Համատեքստը" },
      { es: "la situación", am: "իրավիճակը" },
      { es: "se produce", am: "տեղի է ունենում" }
    ]
  },
  {
    id: "p9",
    es: "Para que la comunicación funcione correctamente, el emisor y el receptor deben compartir el mismo código y el mensaje debe llegar correctamente por el canal.",
    am: "Որպեսզի հաղորդակցությունը ճիշտ աշխատի, ուղարկողը և ստացողը պետք է օգտագործեն նույն կոդը, իսկ հաղորդագրությունը պետք է ճիշտ հասնի կապուղով։",
    keywords: [
      { es: "funcione correctamente", am: "ճիշտ աշխատի" },
      { es: "deben compartir", am: "պետք է կիսեն / օգտագործեն նույնը" },
      { es: "el mismo código", am: "նույն կոդը" },
      { es: "llegar correctamente", am: "ճիշտ հասնի" }
    ]
  },
  {
    id: "p10",
    es: "En resumen, los elementos principales de la comunicación son el emisor, el receptor, el mensaje, el código, el canal y el contexto.",
    am: "Ամփոփելով՝ հաղորդակցության հիմնական տարրերն են ուղարկողը, ստացողը, հաղորդագրությունը, կոդը, կապուղին և համատեքստը։",
    keywords: [
      { es: "En resumen", am: "Ամփոփելով / Համառոտ" },
      { es: "los elementos principales", am: "հիմնական տարրերը" }
    ]
  }
];

// The 6 main elements (Elementos principales / Հիմնական տարրերը)
export const MAIN_ELEMENTS: CommunicationElement[] = [
  {
    id: "emisor",
    number: 1,
    esName: "Emisor",
    amName: "Ուղարկող",
    esDef: "Es quien envía el mensaje.",
    amDef: "Նա է, ով ուղարկում է հաղորդագրությունը։",
    esExample: "Ana escribe un mensaje a Pedro. Ana es la emisora.",
    amExample: "Աննան հաղորդագրություն է գրում Պեդրոյին։ Աննան ուղարկողն է։",
    iconName: "Send",
    roleBadge: "Ակունք / Սկիզբ",
    color: {
      bg: "bg-blue-500",
      border: "border-blue-300",
      text: "text-blue-700",
      light: "bg-blue-50",
      accent: "#2563eb"
    }
  },
  {
    id: "receptor",
    number: 2,
    esName: "Receptor",
    amName: "Ստացող",
    esDef: "Es quien recibe el mensaje.",
    amDef: "Նա է, ով ստանում է հաղորդագրությունը։",
    esExample: "Pedro recibe el mensaje. Pedro es el receptor.",
    amExample: "Պեդրոն ստանում է հաղորդագրությունը։ Պեդրոն ստացողն է։",
    iconName: "UserCheck",
    roleBadge: "Հասցեատեր",
    color: {
      bg: "bg-emerald-500",
      border: "border-emerald-300",
      text: "text-emerald-700",
      light: "bg-emerald-50",
      accent: "#059669"
    }
  },
  {
    id: "mensaje",
    number: 3,
    esName: "Mensaje",
    amName: "Հաղորդագրություն",
    esDef: "Es la información que se transmite.",
    amDef: "Դա փոխանցվող տեղեկությունն է։",
    esExample: "“Nos vemos a las cinco.”",
    amExample: "«Կհանդիպենք ժամը հինգին»։",
    iconName: "MessageSquare",
    roleBadge: "Բովանդակություն",
    color: {
      bg: "bg-amber-500",
      border: "border-amber-300",
      text: "text-amber-700",
      light: "bg-amber-50",
      accent: "#d97706"
    }
  },
  {
    id: "codigo",
    number: 4,
    esName: "Código",
    amName: "Կոդ",
    esDef: "Es el sistema de signos que usamos para comunicarnos.",
    amDef: "Դա հաղորդակցվելու համար օգտագործվող նշանների համակարգն է։",
    esExample: "El español.",
    amExample: "Իսպաներենը։",
    iconName: "Code2",
    roleBadge: "Լեզու / Նշաններ",
    color: {
      bg: "bg-purple-500",
      border: "border-purple-300",
      text: "text-purple-700",
      light: "bg-purple-50",
      accent: "#7c3aed"
    }
  },
  {
    id: "canal",
    number: 5,
    esName: "Canal",
    amName: "Կապուղի",
    esDef: "Es el medio por el que se transmite el mensaje.",
    amDef: "Դա այն միջոցն է, որով փոխանցվում է հաղորդագրությունը։",
    esExample: "teléfono, carta, aire, Internet",
    amExample: "հեռախոս, նամակ, օդ, ինտերնետ",
    iconName: "Radio",
    roleBadge: "Միջոց / Կապ",
    color: {
      bg: "bg-cyan-500",
      border: "border-cyan-300",
      text: "text-cyan-700",
      light: "bg-cyan-50",
      accent: "#0891b2"
    }
  },
  {
    id: "contexto",
    number: 6,
    esName: "Contexto",
    amName: "Համատեքստ",
    esDef: "Es la situación en la que ocurre la comunicación.",
    amDef: "Դա այն իրավիճակն է, որտեղ տեղի է ունենում հաղորդակցությունը։",
    esExample: "Lugar, momento y circunstancias de la conversación.",
    amExample: "Զրույցի վայրը, պահը և հանգամանքները։",
    iconName: "Compass",
    roleBadge: "Իրավիճակ",
    color: {
      bg: "bg-rose-500",
      border: "border-rose-300",
      text: "text-rose-700",
      light: "bg-rose-50",
      accent: "#e11d48"
    }
  }
];

// All 11 questions and answers (Preguntas y respuestas / Հարցեր և պատասխաններ)
export const QUESTIONS_AND_ANSWERS: QuestionAnswer[] = [
  {
    id: 1,
    esQuestion: "¿Qué es la comunicación?",
    amQuestion: "Ի՞նչ է հաղորդակցությունը։",
    esAnswer: "Es el proceso de transmitir información de una persona a otra.",
    amAnswer: "Դա մի մարդուց մյուսին տեղեկություն փոխանցելու գործընթացն է։"
  },
  {
    id: 2,
    esQuestion: "¿Cuáles son los elementos de la comunicación?",
    amQuestion: "Որո՞նք են հաղորդակցության տարրերը։",
    esAnswer: "Emisor, receptor, mensaje, código, canal y contexto.",
    amAnswer: "Ուղարկող, ստացող, հաղորդագրություն, կոդ, կապուղի և համատեքստ։"
  },
  {
    id: 3,
    esQuestion: "¿Qué es el emisor?",
    amQuestion: "Ո՞վ է ուղարկողը։",
    esAnswer: "Es quien envía el mensaje.",
    amAnswer: "Նա է, ով ուղարկում է հաղորդագրությունը։"
  },
  {
    id: 4,
    esQuestion: "¿Qué es el receptor?",
    amQuestion: "Ո՞վ է ստացողը։",
    esAnswer: "Es quien recibe el mensaje.",
    amAnswer: "Նա է, ով ստանում է հաղորդագրությունը։"
  },
  {
    id: 5,
    esQuestion: "¿Qué es el mensaje?",
    amQuestion: "Ի՞նչ է հաղորդագրությունը։",
    esAnswer: "Es la información que se transmite.",
    amAnswer: "Դա փոխանցվող տեղեկությունն է։"
  },
  {
    id: 6,
    esQuestion: "¿Qué es el código?",
    amQuestion: "Ի՞նչ է կոդը։",
    esAnswer: "Es el sistema de signos utilizado para comunicarse.",
    amAnswer: "Դա հաղորդակցվելու համար օգտագործվող նշանների համակարգն է։"
  },
  {
    id: 7,
    esQuestion: "¿Qué puede ser un código?",
    amQuestion: "Ի՞նչ կարող է լինել կոդը։",
    esAnswer: "Una lengua, por ejemplo el español.",
    amAnswer: "Լեզու, օրինակ՝ իսպաներենը։"
  },
  {
    id: 8,
    esQuestion: "¿Qué es el canal?",
    amQuestion: "Ի՞նչ է կապուղին։",
    esAnswer: "Es el medio por el que se transmite el mensaje.",
    amAnswer: "Դա այն միջոցն է, որով փոխանցվում է հաղորդագրությունը։"
  },
  {
    id: 9,
    esQuestion: "¿Qué puede ser un canal?",
    amQuestion: "Ի՞նչ կարող է լինել կապուղին։",
    esAnswer: "El teléfono, una carta, el aire o Internet.",
    amAnswer: "Հեռախոսը, նամակը, օդը կամ ինտերնետը։"
  },
  {
    id: 10,
    esQuestion: "¿Qué es el contexto?",
    amQuestion: "Ի՞նչ է համատեքստը։",
    esAnswer: "Es la situación en la que ocurre la comunicación.",
    amAnswer: "Դա այն իրավիճակն է, որտեղ տեղի է ունենում հաղորդակցությունը։"
  },
  {
    id: 11,
    esQuestion: "¿Qué necesita la comunicación para funcionar bien?",
    amQuestion: "Ի՞նչ է անհրաժեշտ, որ հաղորդակցությունը ճիշտ աշխատի։",
    esAnswer: "Que emisor y receptor compartan el mismo código y que el mensaje llegue correctamente.",
    amAnswer: "Որ ուղարկողն ու ստացողը օգտագործեն նույն կոդը, և հաղորդագրությունը ճիշտ հասնի։"
  }
];

// Texto corto / Կարճ տեքստ
export const SHORT_TEXT = {
  titleEs: "Texto corto",
  titleAm: "Կարճ տեքստ",
  paragraphs: [
    {
      id: "st1",
      es: "La comunicación es el proceso de transmitir información.",
      am: "Հաղորդակցությունը տեղեկություն փոխանցելու գործընթացն է։"
    },
    {
      id: "st2",
      es: "Sus elementos principales son el emisor, que envía el mensaje; el receptor, que lo recibe; el mensaje, que es la información; el código, que es el sistema de signos; el canal, que es el medio de transmisión; y el contexto, que es la situación en la que ocurre la comunicación.",
      am: "Նրա հիմնական տարրերն են ուղարկողը, որը ուղարկում է հաղորդագրությունը, ստացողը, որը ստանում է այն, հաղորդագրությունը՝ փոխանցվող տեղեկությունը, կոդը՝ նշանների համակարգը, կապուղին՝ փոխանցման միջոցը, և համատեքստը՝ այն իրավիճակը, որտեղ տեղի է ունենում հաղորդակցությունը։"
    }
  ]
};

// Vocabulary / Glossary list
export const VOCABULARY: VocabularyItem[] = [
  { id: "v1", es: "la comunicación", am: "հաղորդակցություն", category: "concept", pronunciation: "լա կոմունիկասյո՛ն" },
  { id: "v2", es: "el emisor", am: "ուղարկող (հաղորդող)", category: "element", pronunciation: "էլ էմիսո՛ռ" },
  { id: "v3", es: "el receptor", am: "ստացող (ընդունող)", category: "element", pronunciation: "էլ ռեսեպտո՛ռ" },
  { id: "v4", es: "el mensaje", am: "հաղորդագրություն", category: "element", pronunciation: "էլ մենսա՛խե" },
  { id: "v5", es: "el código", am: "կոդ (լեզու, նշաններ)", category: "element", pronunciation: "էլ կո՛դիգո" },
  { id: "v6", es: "el canal", am: "կապուղի (փոխանցման միջոց)", category: "element", pronunciation: "էլ կանա՛լ" },
  { id: "v7", es: "el contexto", am: "համատեքստ (իրավիճակ)", category: "element", pronunciation: "էլ կոնտե՛քստո" },
  { id: "v8", es: "transmitir", am: "փոխանցել", category: "action", pronunciation: "տրանսմիտի՛ռ" },
  { id: "v9", es: "enviar", am: "ուղարկել", category: "action", pronunciation: "էնվիա՛ռ" },
  { id: "v10", es: "recibir", am: "ստանալ", category: "action", pronunciation: "ռեսիբի՛ռ" },
  { id: "v11", es: "el proceso", am: "գործընթաց", category: "concept", pronunciation: "էլ պրոսե՛սո" },
  { id: "v12", es: "la información", am: "տեղեկություն", category: "concept", pronunciation: "լա ինֆորմասյո՛ն" },
  { id: "v13", es: "el sistema de signos", am: "նշանների համակարգ", category: "concept", pronunciation: "էլ սիստե՛մա դե սի՛գնոս" },
  { id: "v14", es: "la lengua", am: "լեզու", category: "concept", pronunciation: "լա լե՛նգուա" },
  { id: "v15", es: "el aire", am: "օդ", category: "channel", pronunciation: "էլ ա՛յրե" },
  { id: "v16", es: "el teléfono", am: "հեռախոս", category: "channel", pronunciation: "էլ տելե՛ֆոնո" },
  { id: "v17", es: "la carta", am: "նամակ", category: "channel", pronunciation: "լա կա՛ռտա" },
  { id: "v18", es: "Internet", am: "ինտերնետ", category: "channel", pronunciation: "ինտերնե՛տ" },
  { id: "v19", es: "compartir", am: "կիսել, միասին օգտագործել", category: "action", pronunciation: "կոմպարտի՛ռ" },
  { id: "v20", es: "funcionar correctamente", am: "ճիշտ աշխատել / գործել", category: "action", pronunciation: "ֆունսիոնա՛ռ կոռռեկտամե՛նտե" }
];
