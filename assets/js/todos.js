$(document).ready(function () {
	// Function to update the number of tasks
	function updateNumberOfTasks() {
		let numberOfTasks = $("ul li").length;
		$(".number-of-tasks").text(numberOfTasks);
	}

	// Load tasks from localStorage when the page loads
	let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
	tasks.forEach(function (task) {
		$("ul").append(
			`<li ${task.completed ? 'class="completed"' : ""}>
              <span><i class="fa-solid fa-trash"></i></span>
              <span><i class="fa-solid fa-pencil-alt"></i></span>
              ${task.text}
          </li>`
		);
	});
	updateNumberOfTasks();

	// Function to save tasks to localStorage
	function saveTasks() {
		let tasks = [];
		$("ul li").each(function () {
			tasks.push({
				text: $(this).text().trim().replace("×", "").trim(),
				completed: $(this).hasClass("completed"),
			});
		});
		localStorage.setItem("tasks", JSON.stringify(tasks));
		updateNumberOfTasks(); // Update the number of tasks after saving
	}

	// Toggle completion status of tasks
	$("ul").on("click", "li", function () {
		$(this).toggleClass("completed");
		saveTasks();
	});

	// Remove tasks
	$("ul").on("click", "span:first-child", function (e) {
		$(this)
			.parent()
			.fadeOut(400, function () {
				$(this).remove();
				saveTasks();
			});
		e.stopPropagation();
	});

	// Edit task
	$("ul").on("click", "span:last-child", function (e) {
		let $li = $(this).parent();
		let $taskText = $li.text().trim();
		$li.html(`<input type="text" value="${$taskText}" />`);
		$li.find("input").focus();
		$(this).hide();
		$(this).prev().hide();
		$(this).next().show();
	});

	// Update task
	$("ul").on("keypress", "input", function (e) {
		if (e.keyCode === 13) {
			let $newTaskText = $(this).val().trim();
			$(this)
				.parent()
				.html(
					`<span><i class="fa-solid fa-trash"></i></span> <span><i class="fa-solid fa-pencil-alt"></i></span> ${$newTaskText}`
				);
			saveTasks();
		}
	});

	// Cancel editing
	$("ul").on("keydown", "input", function (e) {
		if (e.keyCode === 27) {
			let $taskText = $(this).parent().text().trim();
			$(this)
				.parent()
				.html(
					`<span><i class="fa-solid fa-trash"></i></span> <span><i class="fa-solid fa-pencil-alt"></i></span> ${$taskText}`
				);
		}
	});

	// Add new task
	$("input").on("keypress", function (e) {
		if ($(this).val().length >= 3) {
			if (e.keyCode === 13) {
				let inputVal = $(this).val();
				$("ul").append(
					`<li>
                      <span class="delete"><i class="fa-solid fa-trash"></i></span>
                      <span class="edit"><i class="fa-solid fa-pencil-alt"></i></span>
                      ${inputVal}
                  </li>`
				);
				$(this).val("");
				saveTasks();
			}
		}
	});

	// Toggle input field
	$(".fa-plus").on("click", function () {
		$("input").fadeToggle("hideInput");
	});
});
