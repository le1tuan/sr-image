import "./style.css";
import html2canvas from 'html2canvas';
console.log(html2canvas)

const app = document.getElementById('app')
function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  link.click();
  //after creating link you should delete dynamic link
  //clearDynamicLink(link); 
}


let contentText = ""
let contentBody =""
let contentFooter =""
class Image {
  constructor(src = null) {
    this.src = src
    this.image = null;
  }

  setSrc(src) {
    if (src) {
      this.src = src
    }
    
    this.image = new FileReader();
    this.image.onload = () => {
      const im = document.createElement('img')
      im.classList.add("main-img")
      im.src = this.image.result      
      console.log(this.src)
      document.getElementById("app").appendChild(im)


      const content= document.createElement('div');
      content.classList.add("content")
      const background = document.createElement('div');
      background.classList.add('background')
      const title= document.createElement('div');
      title.classList.add("title")
      title.innerHTML = contentText
      const body= document.createElement('div');
      body.classList.add("body")
      body.innerHTML = contentBody
      const footer = document.createElement('div');
      footer.classList.add("footer")
      footer.innerHTML = contentFooter
      content.appendChild(title)
      content.appendChild(body)
      content.appendChild(footer)
      document.getElementById("app").appendChild(background)
      document.getElementById("app").appendChild(content)
      window.scrollTo(0, 0)
      setTimeout(() => {
        document.getElementById('ok').click();
      }, 2000)
      
    }
    this.image.readAsDataURL(this.src)
  }
}

const newImage = new Image()
const input = document.getElementById("file")
input.onchange = (e)  => {
  newImage.setSrc(e.target.files[0])
}

const textarea = document.getElementById("textarea")
textarea.onchange = (e) => {
  contentText = e.target.value
}

const body = document.getElementById("body")
body.onchange = (e) => {
  contentBody = e.target.value
}

const footer = document.getElementById("footer")
footer.onchange = (e) => {
  contentFooter = e.target.value
}

const ok = document.getElementById('ok')
ok.onclick = (e) => {
  const i = document.querySelector(".main-img")
  html2canvas(app, {
    windowWidth: i.scrollWidth,
    windowHeight: i.scrollHeight
  }).then(canvas => {
    return new Promise(resolve=>canvas.toBlob(resolve));
  }).then((blob) => {
    let url = URL.createObjectURL(blob);
  // Won't work here, because
  // "the request was made in a sandboxed frame whose 'allow-popups' permission is not set."
    window.open(url);
    let a = document.createElement('a');
    a.href = url;
    a.download = '';
    a.click();
  });
}