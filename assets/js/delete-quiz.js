const questionList = document.querySelector(".question-list");
const deleteAllBtn = document.querySelector(".delete-all");
const deleteBtns = document.querySelectorAll(".delete-btn");

//get question data from local storage
(() => {
  const questions = JSON.parse(localStorage.getItem("questions"));

  if (questions?.length === 0 || !questions) {
    questionList.innerHTML = `<li class="no-question">No questions available</li>`;
    return;
  }

  questions?.forEach((question) => {
    const questionItem = document.createElement("li");
    questionItem.classList.add("question-item");
    questionItem.innerHTML = `
      <input type="checkbox" id=${question?.id}/>
      <h3>${question?.question}</h3>

      <button id=${question?.id} class="delete-btn">
        <i class="fa-solid fa-trash"></i>
      </button>
    `;

    //add delete event
    questionItem.querySelector(".delete-btn").addEventListener("click", (e) => {
      const id = e.target.id;
      const filteredQuestions = questions.filter(
        (question) => question.id !== parseInt(id)
      );

      localStorage.setItem("questions", JSON.stringify(filteredQuestions));
      window.location.reload();
    });

    questionList.appendChild(questionItem);
  });
})();

//delete all
deleteAllBtn.addEventListener("click", () => {
  localStorage.removeItem("questions");
  window.location.reload();
});

//add select delete event
const multipleDeleteBtn = document.querySelector(".delete-multiple-btn");
let questions = JSON.parse(localStorage.getItem("questions"));

multipleDeleteBtn.addEventListener("click", () => {
  const selectedIds = [];
  const checkedCheckboxes = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );

  checkedCheckboxes.forEach(function (checkbox) {
    selectedIds.push(parseInt(checkbox.id.split("/")[0]));
  });

  selectedIds.forEach((id) => {
    questions = questions?.filter((question) => question?.id !== id);
    localStorage.setItem("questions", JSON.stringify(questions));
  });

  window.location.reload();
});
