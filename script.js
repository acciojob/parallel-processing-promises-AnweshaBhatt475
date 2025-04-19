const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");
const btn = document.getElementById("download-images-button");

const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image
function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;

        img.onload = function () {
            resolve(img); // Resolves with the image element when successfully loaded
        };

        img.onerror = function () {
            reject(`Failed to load image at ${url}`); // Rejects with an error message if loading fails
        };
    });
}

// Function to download all images using Promise.all
function downloadImages() {
    // Show the loading spinner
    loadingDiv.style.display = "block";
    errorDiv.innerText = ""; // Clear previous error messages
    output.innerHTML = ""; // Clear the output div

    const imagePromises = images.map(image => downloadImage(image.url));

    Promise.all(imagePromises)
        .then(images => {
            // Hide the loading spinner
            loadingDiv.style.display = "none";

            // Append all successfully downloaded images to the output div
            images.forEach(img => {
                output.appendChild(img);
            });
        })
        .catch(error => {
            // Hide the loading spinner
            loadingDiv.style.display = "none";

            // Display the error message in the error div
            errorDiv.innerText = error;
        });
}

// Attach the click event listener to the button
btn.addEventListener("click", downloadImages);