var images = {};
var imageFiles = ["jarjar.jpg", "yoda.png", "obiwan.jpg"];
var imageCount = 0;
function getName(author) {
    var name = author.split("<")[0];
    console.log(name);
    return name;
}
function imageForUser(email) {
    var first = email.trim().charAt(0).toUpperCase();
    var pic = "node_modules/material-letter-icons/dist/png/" + first + ".png";
    console.log(pic);
    return pic;
}
