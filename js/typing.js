let typingBool = false;
let typingIdx = 0;
let liIndex = 0;
let liLength = $(".typing-txt>ul>li").length;
let tyInt;

function startTyping() {
  let typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();
  typingTxt = typingTxt.split("");

  if (typingBool == false) {
    typingBool = true;
    tyInt = setInterval(typing, 100);
  }

  function typing() {
    $(".typing ul li").removeClass("on");
    $(".typing ul li").eq(liIndex).addClass("on");

    if (typingIdx < typingTxt.length) {
      $(".typing ul li").eq(liIndex).append(typingTxt[typingIdx]);
      typingIdx++;
    } else {
      if (liIndex < liLength - 1) {
        liIndex++;
        typingIdx = 0;
        typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();

        clearInterval(tyInt);
        setTimeout(function () {
          tyInt = setInterval(typing, 100);
        }, 2000);
      } else if (liIndex == liLength - 1) {
        clearInterval(tyInt);

        setTimeout(function () {
          typingBool = false;
          liIndex = 0;
          typingIdx = 0;

          $(".typing ul li").html("");
          startTyping();
        }, 3000);
      }
    }
  }
}

startTyping();
