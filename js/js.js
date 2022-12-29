(function ($) {
  $(function () {
    $('nav ul li > a:not(:only-child)').click(function (e) {
      $(this)
        .siblings('.nav-dropdown')
        .slideToggle()
      $('.nav-dropdown')
        .not($(this).siblings())
        .hide()
      e.stopPropagation()
    })
    $('html').click(function () {
      $('.nav-dropdown').hide()
    })
    // Toggle open and close nav styles on click
    $('#nav-toggle').click(function () {
      $('nav ul').slideToggle();
    });
    $('#nav-toggle').on('click', function () {
      this.classList.toggle('active')
    })
  })
})(jQuery);







const one = document.querySelector(".one");
const one_one = document.getElementById("one_one");
const two_two = document.getElementById("two_two");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");
const five = document.querySelector(".five");
const back_back = document.getElementById("back_back");

if (window.location.href == "http://127.0.0.1:5500/question.html") {
  one.classList.add("active");
  two.classList.add("active");
  three.classList.add("active");
  four.classList.remove("active");
}

one_one.onclick = function () {
  one.classList.add("active");
  two.classList.remove("active");
  three.classList.remove("active");
  four.classList.remove("active");
};

two_two.onclick = function () {
  let name = document.getElementById("credit-card").value;
  sessionStorage.setItem("full_name", name);
  window.location.replace("./question.html");
  one.classList.add("active");
  two.classList.add("active");
  three.classList.remove("active");
  four.classList.remove("active");
};

back_back.onclick = function () {
  one.classList.remove("active");
  two.classList.remove("active");
  three.classList.remove("active");
  four.classList.remove("active");
};

// three.onclick = function () {
//   one.classList.add("active");
//   two.classList.add("active");
//   three.classList.add("active");
//   four.classList.remove("active");
// };
// four.onclick = function () {
//   one.classList.add("active");
//   two.classList.add("active");
//   three.classList.add("active");
//   four.classList.add("active");
// };






