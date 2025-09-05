document.addEventListener("DOMContentLoaded", () => {
  const habitForm = document.getElementById("add-habit-form");
  const habitInput = document.getElementById("habit-input");
  const habitList = document.getElementById("habit-list");

  let habits = JSON.parse(localStorage.getItem("habits")) || [];

  const saveHabits = () => {
    localStorage.setItem("habits", JSON.stringify(habits));
  };

  const renderHabits = () => {
    habitList.innerHTML = "";

    habits.forEach((habit, index) => {
      const li = document.createElement("li");
      li.dataset.index = index;
      if (habit.completed) {
        li.classList.add("completed");
      }
      li.innerHTML = `
                <span class="habit-text">${habit.text}</span>
                <button class="delete-btn">X</button>
            `;

      habitList.appendChild(li);
    });
  };

  habitForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newHabitText = habitInput.value.trim();

    if (newHabitText !== "") {
      habits.push({ text: newHabitText, completed: false });
      saveHabits();
      renderHabits();
      habitInput.value = "";
    }
  });

  habitList.addEventListener("click", (e) => {
    const index = e.target.closest("li").dataset.index;

    if (e.target.classList.contains("delete-btn")) {
      habits.splice(index, 1);
    } else {
      habits[index].completed = !habits[index].completed;
    }

    saveHabits();
    renderHabits();
  });

  renderHabits();
});
