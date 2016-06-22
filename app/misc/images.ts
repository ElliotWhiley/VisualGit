
let images = {};
let dogs = ["dog1.jpg", "dog2.jpg", "dog3.jpg", "dog4.jpg", "dog5.jpg"];
let dogCount = 0;

function imageForUser(email: string) {
  if (images[email] === undefined) {
    images[email] = "assets/img/" + dogs[dogCount];
    dogCount++;
    if (dogCount >= dogs.length) {
      dogCount = 0;
    }
  }
  return images[email];
}
