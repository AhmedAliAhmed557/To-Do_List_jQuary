$("ul").on("click", "li", function () {
  $(this).toggleClass("completed");
});
$("ul").on("click", "span", function (e) {
  $(this)
    .parent()
    .fadeOut(400, function () {
      $(this).remove();
    });
  e.stopPropagation();
});
$("input").on("keypress", function (e) {
  if ($(this).val().length >= 3) {
    if (e.keyCode === 13) {
      let inputVal = $(this).val();
      $("ul").append(`<li><span> X </span> ${inputVal}</li>`);
      $(this).val("");
    }
  } else {
    // alert("Type More Than 5 Characters");
    // e.delegateTarget.placeholder = "Type More Than 5 Characters";
  }
});

$(".fa-solid").on("click", function () {
  $("input").fadeToggle("hideInput");
});
