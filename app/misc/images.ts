let images = {};
// let imageFiles = ["dog1.jpg", "dog2.jpg", "dog3.jpg", "dog4.jpg", "dog5.jpg"];
let imageFiles = ["jarjar.jpg", "yoda.png", "obiwan.jpg"];
let imageCount = 0;

function imageForUser(email: string) {
  if (images[email] === undefined) {
    images[email] = "assets/img/starwars/" + imageFiles[imageCount];
    imageCount++;
    if (imageCount >= imageFiles.length) {
      imageCount = 0;
    }
  }
  return images[email];
}
