var images = {};
var imageFiles = ["jarjar.jpg", "yoda.png", "obiwan.jpg"];
var imageCount = 0;
function imageForUser(email) {
    if (images[email] === undefined) {
        images[email] = "assets/img/starwars/" + imageFiles[imageCount];
        imageCount++;
        if (imageCount >= imageFiles.length) {
            imageCount = 0;
        }
    }
    return images[email];
}
