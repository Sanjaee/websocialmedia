async function fetchData() {
  try {
    const response = await fetch("https://be-socialmedia.vercel.app/api");
    const data = await response.json();
    console.log(data);
    return data;
  } catch {
    console.error("Gagal mengambil data:", error);
    return null;
  }
}

function createCardElement(cardData) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.className = "card_img";
  img.src = cardData.image_post;
  img.alt = "";

  const cardText = document.createElement("div");
  cardText.className = "card_text";

  const date = document.createElement("p");
  date.className = "date";
  date.textContent = new Date(cardData.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Jakarta", // Menetapkan zona waktu ke Asia/Jakarta
  });

  const title = document.createElement("h3");
  title.className = "title";
  title.textContent = cardData.title;

  const author = document.createElement("div");
  author.className = "author";

  const authorImg = document.createElement("img");
  authorImg.src = cardData.image_profile;
  authorImg.alt = "";

  const authorName = document.createElement("p");
  authorName.textContent = cardData.name;

  const categoryFav = document.createElement("div");
  categoryFav.className = "category_fav";

  const categoryButton = document.createElement("button");
  categoryButton.textContent = cardData.category;

  const favImg = document.createElement("img");
  favImg.className = "fav";
  favImg.src = "";
  favImg.alt = "";

  author.appendChild(authorImg);
  author.appendChild(authorName);

  categoryFav.appendChild(categoryButton);
  categoryFav.appendChild(favImg);

  cardText.appendChild(date);
  cardText.appendChild(title);

  cardText.appendChild(author);
  cardText.appendChild(categoryFav);

  card.appendChild(img);
  card.appendChild(cardText);

  return card;
}

async function loadAndMapData() {
  const data = await fetchData();

  if (data) {
    const cardContainer = document.querySelector(".card_semuabacaan");

    console.log(data);

    cardContainer.innerHTML = "";

    data.forEach((cardData) => {
      const cardElement = createCardElement(cardData);
      cardContainer.appendChild(cardElement);
    });
  }
}

loadAndMapData();
