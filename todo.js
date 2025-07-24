document.addEventListener("DOMContentLoaded", function () {
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  addTaskBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
      ${taskText}
      <button class="delete-btn">Delete</button>
    `;

    // Delete button event
    li.querySelector(".delete-btn").addEventListener("click", function () {
      li.remove();
    });

    taskList.appendChild(li);
    taskInput.value = "";
  });
});
