var cs = require('color-scheme');
function changeColor(color) {
    console.log(color + '   ' + (color === 'white'));
    var head = document.getElementsByClassName('navbar');
    var headButton = document.getElementsByClassName('navbar-btn');
    var fa = document.getElementsByClassName('fa');
    var fp = document.getElementById('file-panel');
    var p = document.getElementsByTagName('p');
    var h1 = document.getElementsByTagName('h1');
    var diffp = document.getElementById('diff-panel-body');
    var network = document.getElementById('my-network');
    var footer = document.getElementById('footer');
    var arp = document.getElementById('add-repository-panel');
    var auth = document.getElementById('authenticate');
    if (color === 'white') {
        for (var i = 0; i < head.length; i++) {
            console.log(head[i]);
            head[i].className = 'navbar navbar-white';
        }
        for (var i = 0; i < headButton.length; i++) {
            headButton[i].classList.remove('btn-inverse');
            headButton[i].classList.add('btn-default');
        }
        for (var i = 0; i < fa.length; i++) {
            fa[i].setAttribute('style', 'color:black');
        }
        fp.setAttribute('style', 'background-color:#D1D1D1');
        for (var i = 0; i < p.length; i++) {
            p[i].style.color = 'black';
        }
        for (var i = 0; i < h1.length; i++) {
            h1[i].style.color = '#5E5E5E';
        }
        diffp.style.color = '#D2D3D4';
        diffp.style.backgroundColor = '#616161';
        network.style.backgroundColor = '#D6D6D6';
        footer.style.backgroundColor = '#EDEDED';
        arp.style.backgroundColor = '#D1D1D1';
        auth.style.backgroundColor = '#D6D6D6';
    }
}
