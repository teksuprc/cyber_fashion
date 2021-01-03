
const init = () => {
  let modal = document.getElementById("myModal");
  let span = document.getElementById("close");

  span.onclick = function() {
    modal.style.display = "none";

    let container = document.getElementsByClassName("w3-container")[0];
    container.style.backgroundColor = null;
  }

  window.onclick = ((event) => {
    if (event.target == modal) {
      modal.style.display = "none";

      let container = document.getElementsByClassName("w3-container")[0];
      container.style.backgroundColor = null;
    }
  });
};

const handleClick = ((link, name) => {
  let container = document.getElementsByClassName("w3-container")[0];
  container.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';

  let modal = document.getElementById("myModal");
  modal.style.display = "block";

  let imgModal = document.getElementById("imgModal");
  imgModal.src = link;

  let title = document.getElementById('card-title');
  title.textContent = name;
});
