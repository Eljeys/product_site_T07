const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

/*https://kea-alt-del.dk/t7/api/products?limit=50&start=10 */
window.addEventListener("DOMContentLoaded", init);

function init() {
  fetch("https://kea-alt-del.dk/t7/api/products?category=" + category)
    .then((res) => res.json())
    .then((data) => showProducts(data));
}
function showProducts(products) {
  products.forEach(showProduct);
}

function showProduct(product) {
  // fang <template>
  const template = document.querySelector("#productCardTemplate").content;
  //lav kopi
  const copy = template.cloneNode(true);
  //ændre indhold
  copy.querySelector("h3").textContent = product.productdisplayname;
  copy.querySelector(
    "img"
  ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  copy.querySelector(".brand").textContent = product.brandname;
  copy.querySelector(".subCategory").textContent = product.subcategory;
  copy.querySelector(
    ".productCard__price"
  ).textContent = `DKK ${product.price} ,-`;

  //betingeser for soldout og discount
  if (product.soldout) {
    copy.querySelector("article").classList.add("soldOut");
  }
  if (product.discount != null) {
    /*price Before*/
    copy.querySelector(".productCard__price").classList.add("priceBefore");
    //new Price
    const price = product.price;
    const procent = product.discount;
    const newPrice = Math.round(price - (price * procent) / 100);
    copy.querySelector(".newPrice").textContent = `Now ${newPrice} ,-`;

    /*Discount in procent*/
    const div = copy.querySelector("div");
    const discountProcent = div.getElementsByTagName("p");
    const lastP = discountProcent[discountProcent.length - 1];
    lastP.textContent = ` Save ${product.discount} %`;
    lastP.classList.add("discountProcent");
  }
  copy
    .querySelector(".productCard__link")
    .setAttribute("href", `produkt.html?id=${product.id}`);
  //append (hvor skal indholdet placeres i HTML)
  document.querySelector("main").appendChild(copy);
}
