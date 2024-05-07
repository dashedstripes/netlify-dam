(async () => {
  const container = document.getElementById("images");

  const res = await fetch("/.netlify/functions/getImages");
  const json = await res.json();

  const images = json?.images;

  for (const image of images) {
    const node = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");

    img.src = `/.netlify/images?url=/.netlify/functions/getSingleImage?key=${image.key}&w=50&h=50`;
    a.href = `/.netlify/images?url=/.netlify/functions/getSingleImage?key=${image.key}&w=50&h=50`;
    a.textContent = image.key;

    a.appendChild(img);
    node.appendChild(a);
    container.appendChild(node);
  }
})();
