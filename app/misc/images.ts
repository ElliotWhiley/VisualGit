let images = {};
// let imageFiles = ["dog1.jpg", "dog2.jpg", "dog3.jpg", "dog4.jpg", "dog5.jpg"];
let imageFiles = ["jarjar.jpg", "yoda.png", "obiwan.jpg"];
let imageCount = 0;

function getName(author: string) {
  let name = author.split("<")[0];
  console.log(name);
  return name;
}

function imageForUser(email: string) {
  let first = email.trim().charAt(0).toUpperCase();
  let pic =  "node_modules/material-letter-icons/dist/png/" + first + ".png";
  console.log(pic);
  return pic;
  // if (images[email] === undefined) {
  //   images[email] = "assets/img/starwars/" + imageFiles[imageCount];
  //   imageCount++;
  //   if (imageCount >= imageFiles.length) {
  //     imageCount = 0;
  //   }
  // }
  // return images[email];
}
