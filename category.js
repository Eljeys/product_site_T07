fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((respons) => respons.json())
  .then(showCategories);
function showCategories(cats) {
  cats.forEach(showCategory);
}
function showCategory(cat) {
  //fang template
  const template = document.querySelector("template").content;
  //cloner
  const clone = template.cloneNode(true);
  //ændrer indhold
  clone.querySelector("a").textContent = cat.category;
  clone.querySelector("a").href = `produktliste.html?category=${cat.category}`;
  //appender
  document.querySelector(".categoryList ul").appendChild(clone);
}
