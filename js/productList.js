/*https://kea-alt-del.dk/t7/api/products?limit=50&start=10 */
window.addEventListener("DOMContentLoaded", init);

function init() {
  fetch("https://kea-alt-del.dk/t7/api/products?limit=20")
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
  ).textContent = `pre DKK ${product.price} ,-`;
  // copy.querySelector(".newPrice").textContent = `${
  //   (product.price * product.discount) / 100
  // }`; //gik på beregningen for denne kommando.

  // copy.querySelector("productCard__price").textContent = product.price;

  //betingeser for soldout og discount
  if (product.soldout) {
    copy.querySelector("article").classList.add("soldOut");
  }
  copy
    .querySelector(".productCard__link")
    .setAttribute("href", `produkt.html?id=${product.id}`);
  //append (hvor skal indholdet placeres i HTML)
  document.querySelector("main").appendChild(copy);
}

/*
HTML struktur for card
     <article class="productCard">
          <img
            src="https://kea-alt-del.dk/t7/images/webp/640/1587.webp"
            alt="Superfit Football hite Shoe"
            class="productCard__img"
          />
          <h3 class="productCard__title">Superfit Football hite Shoe</h3>
          <p class="productCard__subtle">Shoe | Kipsta</p>
          <p class="productCard__price"><span>pre DKK 2099,-</span></p>
          <div class="discount">
            <p>Now DKK 925,-</p>
            <p>-60%</p>
          </div>
          <a href="produkt.html" class="productCard__link">Read More</a>
        </article>



*/

/*
 {
    "id": 1537,
    "gender": "Men",
    "category": "Apparel",
    "subcategory": "Topwear",
    "articletype": "Tshirts",
    "season": "Fall",
    "productionyear": 2010,
    "usagetype": "Sports",
    "productdisplayname": "Red Net Jersey",
    "price": 1299,
    "discount": 57,
    "brandname": "Puma",
    "soldout": 0
  }



*/
