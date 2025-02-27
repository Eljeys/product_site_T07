//https://kea-alt-del.dk/t7/api/products/1525

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

fetch("https://kea-alt-del.dk/t7/api/products/" + id)
  .then((response) => response.json())
  .then((data) => showProduct(data)); //(data)hvad der sendes til function showProduct()

function showProduct(product) {
  console.log(product);
  document.querySelector(".purchesBox h3").textContent =
    product.productdisplayname;
  document.querySelector(".purchesBox h2").textContent = product.brandname;
  document.querySelector(".purchesBox .brand").textContent = product.brandname;
  document.querySelector(".purchesBox .subCategory").textContent =
    product.subcategory;
  document.querySelector(
    "img"
  ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;

  document.querySelector(
    ".info .productCard__price"
  ).textContent = `DKK ${product.price},-`;

  if (product.soldout) {
    document.querySelector(".product__image").classList.add("soldOut");
  }
  if (product.discount) {
    /*price Before*/
    document.querySelector(".productCard__price").classList.add("priceBefore");
    //new Price
    document.querySelector(".newPrice").textContent = `Now ${Math.round(
      product.price - (product.price * product.discount) / 100
    )},-`;
    /*Discount in procent*/
    document.querySelector(
      ".info__discount p+p"
    ).textContent = `Save ${product.discount}%`;
    document
      .querySelector(".info__discount p+p")
      .classList.add("discountProcent");
  }

  document.querySelector("dl .modelName").textContent =
    product.productdisplayname;
  document.querySelector("dl .productColor").textContent = product.basecolour;
  document.querySelector("dl .productionYear").textContent =
    product.productionyear;
  document.querySelector("dl .productId").textContent = product.id;
}

/*
{
  "id": 1525,
  "gender": "Unisex",
  "category": "Accessories",
  "subcategory": "Bags",
  "articletype": "Backpacks",
  "basecolour": "Navy Blue",
  "season": "Fall",
  "productionyear": 2010,
  "usagetype": "Casual",
  "productdisplayname": "Deck Navy Blue Backpack",
  "parsed": 1,
  "soldout": 0,
  "relid": 1525,
  "price": 1299,
  "discount": 55,
  "variantname": "Deck Backpack",
  "brandname": "Puma",
  "brandbio": "PUMA is the World's Fastest Sports Brand",
  "brandimage": "http://assets.myntassets.com/assets/images/2015/11/17/11447736932686-113016-3ff8sf.jpg",
  "agegroup": "Adults-Unisex",
  "colour1": "NA",
  "colour2": "NA",
  "fashiontype": "Fashion",
  "materialcaredesc": null,
  "sizefitdesc": null,
  "description": "<p>asfafaf<br> kasjhdkashd</p>",
  "styledesc": null
}

*/
