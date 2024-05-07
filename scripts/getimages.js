(async () => {
  const container = document.getElementById("images");

  const res = await fetch("/.netlify/functions/getImages");
  const json = await res.json();

  const images = json?.images;

  for (const image of images) {
    const node = document.createElement("li");
    node.textContent = image.key;
    container.appendChild(node);
  }
})();
