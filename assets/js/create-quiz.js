const form = document.querySelector(".form");
const submitBtn = document.querySelector(".submit-btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const question = document.getElementById("question")?.value?.trim() || "";
  const option1 = document.getElementById("option1")?.value?.trim() || "";
  const option2 = document.getElementById("option2")?.value?.trim() || "";
  const option3 = document.getElementById("option3")?.value?.trim() || "";
  const option4 = document.getElementById("option4")?.value?.trim() || "";
  const correctAnswer =
    document
      .querySelector('input[name="correctAnswer"]:checked')
      ?.value?.trim() || "";

  if (
    [question, option1, option2, option3, option4, correctAnswer].some(
      (field) => field === "" || null
    )
  ) {
    return alert("Please fill all the fields");
  }

  const questionObj = {
    id: Date.now(),
    question: question,
    options: [option1, option2, option3, option4],
    correctAnswer: correctAnswer,
  };

  localStorage.setItem(
    "questions",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("questions") || "[]"),
      questionObj,
    ])
  );

  form.reset();
  alert("Question added successfully");
});
