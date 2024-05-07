function sanitizeName(name) {
  const splitName = name.split(".")[0];
  return splitName.toLowerCase().replace(/[\W_]+/g, "_");
}

async function upload(data) {
  const response = await fetch("/.netlify/functions/uploadImage", {
    method: "POST",
    body: data,
  });

  const result = await response.json();
}

const data = new FormData();

const uploadForm = document.getElementById("uploadForm");
const imagePreview = document.getElementById("imagePreview");
const fileUpload = document.getElementById("fileUpload");

fileUpload.addEventListener(
  "change",
  async (e) => {
    const files = e.target.files;

    if (files.length <= 0) {
      return;
    }

    const file = files[0];

    data.append("fileName", file.name);
    data.append("file", file, file.name);

    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      const dataURL = e.target.result;
      imagePreview.src = dataURL;
    });

    reader.readAsDataURL(file);
  },
  false,
);

uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const container = document.getElementById("images");

  const node = document.createElement("li");
  node.textContent = data.get("fileName");
  container.appendChild(node);

  upload(data);
});
