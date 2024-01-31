/**
 *
 * DELETE GRID FUNCTIONS
 *
 */
function deleteItem(el) {
  const id = el.target.dataset.id;
  const input = `${location.pathname}/${id}`;
  fetch(input, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        el.target.parentElement.parentElement.classList.add("hide");
      }
    })
    .catch((err) => console.log("err", err));
}
document
  .querySelectorAll(".btn-delete")
  .forEach((item) => item.addEventListener("click", deleteItem));
