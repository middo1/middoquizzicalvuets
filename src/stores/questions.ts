import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useQuestionStore = defineStore("questions", () => {
  const amount = ref(sessionStorage.getItem("amount") ? Number(sessionStorage.getItem("amount")) : 5);
  const difficulty = ref(sessionStorage.getItem("difficulty") ? sessionStorage.getItem("difficulty") : "");
  const category = ref(sessionStorage.getItem("category") ? sessionStorage.getItem("category") : "");
  const type = ref(sessionStorage.getItem("type") ? sessionStorage.getItem("type") : "");
  const checker = ref(true);
  function setOption(incorrect: Array<any>, correct: any) {
    const options = ref<any[]>([]);
    const rand = Math.floor(Math.random() * 4);
    let op = [];
    options.value = [];
    op = [...incorrect];
    op.splice(rand, 0, correct);
    for (let x = 0; x < op.length; x++) {
      options.value.push({ value: op[x], isSelected: false });
    }
    return options
  }
  const offlineQuestions = [
    {
      category: "Sports",
      type: "multiple",
      difficulty: "hard",
      question:
        "How many times did Martina Navratilova win the Wimbledon Singles Championship?",
      correct_answer: "Nine",
      incorrect_answers: ["Ten", "Seven", "Eight"],
    },
    {
      category: "Entertainment: Video Games",
      type: "multiple",
      difficulty: "easy",
      question:
        "Which of these is NOT a main playable character in &quot;Grand Theft Auto V&quot;?",
      correct_answer: "Lamar",
      incorrect_answers: ["Trevor", "Michael", "Franklin"],
    },
    {
      category: "Entertainment: Comics",
      type: "boolean",
      difficulty: "hard",
      question:
        "In the comic book &quot;Archie&quot;, Betty is friends with Veronica because she is rich.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Entertainment: Film",
      type: "multiple",
      difficulty: "easy",
      question: "What is the oldest Disney film?",
      correct_answer: "Snow White and the Seven Dwarfs",
      incorrect_answers: ["Pinocchio", "Dumbo", "Fantasia"],
    },
    {
      category: "Entertainment: Film",
      type: "boolean",
      difficulty: "easy",
      question: "George Lucas directed the entire original Star Wars trilogy.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "History",
      type: "boolean",
      difficulty: "easy",
      question: "Kublai Khan is the grandchild of Genghis Khan?",
      correct_answer: "True",
      incorrect_answers: ["False"],
    },
    {
      category: "Politics",
      type: "multiple",
      difficulty: "medium",
      question:
        "Before 2016, in which other year did Donald Trump run for President?",
      correct_answer: "2000",
      incorrect_answers: ["2012", "1988", "2008"],
    },
    {
      category: "Entertainment: Video Games",
      type: "multiple",
      difficulty: "easy",
      question:
        "In &quot;Pheonix Wright: Ace Attorney&quot; which character is the District Chief of Police?",
      correct_answer: "Damon Gant",
      incorrect_answers: ["Miles Edgeworth", "Lana Skye", "Mike Meekins"],
    },
    {
      category: "Entertainment: Video Games",
      type: "multiple",
      difficulty: "medium",
      question:
        "In the co-op shooter Payday 2, which contact helps you break out Hoxton?",
      correct_answer: "The Dentist",
      incorrect_answers: ["Vlad", "The Elephant", "The Butcher"],
    },
    {
      category: "Science: Mathematics",
      type: "multiple",
      difficulty: "medium",
      question: "What type of function is x&sup2;+2x+1?",
      correct_answer: "Quadratic",
      incorrect_answers: ["Rational", "Linear", "Exponential"],
    },
  ];
  const questions = ref<any>([]);
  
  function setOptions(){
    for(var i = 0; i < questions.value.length; i++){
      questions.value[i].options = setOption(questions.value[i].incorrect_answers, questions.value[i].correct_answer)
    }
  }
  async function getQuestions() {
    try {
      questions.value = [];
      let res = await fetch(
        `https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${difficulty.value}&type=${type.value}`
      );
      let data = await res.json();
      questions.value = data?.results;
      console.log(`https://opentdb.com/api.php?amount=${amount.value}&category=${category.value}&difficulty=${difficulty.value}&type=${type.value}`);
      sessionStorage.setItem("amount", String(amount.value))
      sessionStorage.setItem("category", String(category.value))
      sessionStorage.setItem("difficulty", String(difficulty.value))
      sessionStorage.setItem("type", String(type.value))
      setOptions()
      // checker.value = false
    } catch (error) {
      questions.value = offlineQuestions;
      setOptions()
      console.log(error);
    }
  }
  // const questions = computed(() => {
  //     getQuestions()
  //     return onlineQuestions
  // })
  const categories = ref<Array<string>>([
    "Any Category",
    "Entertainment: Books",
    "Entertainment: Film",
    "Entertainment: Music",
    "Entertainment: Musicals & Theatres",
    "Entertainment: Television",
    "Entertainment: Video Games",
    "Entertainment: Board Games",
    "Science & Nature",
    "Science: Computers",
    "Science: Mathematics",
    "Mythology",
    "Sports",
    "Geography",
    "History",
    "Politics",
    "Art",
    "Celebrities",
    "Animals",
    "Vehicles",
    "Entertainment: Comics",
    "Science: Gadgets",
    "Entertainment: Japanese Anime & Manga",
    "Entertainment: Cartoon & Animations",
  ]);
  const difficulties = ref<Array<string>>([
    "Any Difficulty",
    "Easy",
    "Medium",
    "Hard",
  ]);
  const types = ref<Array<string>>([
    "Any Type",
    "Multiple Choice",
    "True/False",
  ]);
  const score = ref<number>(0);

  return {
    questions,
    amount,
    difficulty,
    category,
    type,
    categories,
    difficulties,
    types,
    score,
    getQuestions,
    setOptions
  };
});
