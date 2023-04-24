const chatbox = document.querySelector(".chatbox");

function sendUserInput(event) {
  event.preventDefault();
  //lấy giá trị của thẻ input
  const userInput = document.querySelector("#userInput").value;
  let userHtml = `<div class="container user">
  <img src="/images/user.png" alt="Avatar">
  <p>${userInput}</p>
</div>`;

  chatbox.insertAdjacentHTML("beforeend", userHtml);
  let waitHtml = `<div class="container system">
<img src="/images/Chat.png" alt="Avatar">
<p class="content p-blink">|</p>
</div>`;
  chatbox.insertAdjacentHTML("beforeend", waitHtml);
  chatbox.scrollTop = chatbox.scrollHeight;
  //gửi resquest lên server
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: userInput,
      max_tokens: 1000,
      temperature: 0.5,
    }),
  };

  fetch("/chat", options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.status === 200) {
        const content = chatbox.lastElementChild.querySelector("p");
        content.classList.remove("p-blink");
        content.innerHTML = data.message.replace(/\n/g, "<br>");
        document.querySelector("#userInput").value = "";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
