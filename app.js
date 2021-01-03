/**
 * App
 * Description: This app generates web pages to visually see Cyberpunk 2077 Fashion.
*/

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const fsp = fs.promises;

const FashionDir = './fashion';
const ImageSize = 128;

const resizeImage = async (dirPath, file) => {
  const filePath = path.join(dirPath, file.name);

  const thumbsPath = dirPath.replace('fashion', 'thumbs');
  await fsp.mkdir(thumbsPath, { recursive: true}).catch((err) => console.log(err));

  const buffer = await sharp(filePath).resize(ImageSize, ImageSize).toBuffer();

  const savePath = path.join(thumbsPath, file.name);
  await fsp.writeFile(savePath, buffer).catch((err) => console.log(err));
};

const writeToHtml = async (dirPath, files) => {
  if(files.length == 0) 
    return;

  const dirName = dirPath.replace('fashion\\', '').toLowerCase();
  const savePath = path.join('./pages', `${dirName.replace(' ', '_')}.html`);

  let html = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
      <link rel="stylesheet" href="css/styles.css">
      <script src="js/local_modal.js"></script>
      <title>${dirName}</title>
    </head>
    <body onload="init()">
      <div class="w3-container">
        <h2>${dirName.toUpperCase()}</h2>
        <ul class="w3-ul">
          <li><a href="../index.html">Home</a></li>
        </ul>

        <!-- The Modal -->
        <div id="myModal" class="modal">
        
          <!-- Modal content -->
          <div class="modal-content">
            <span id="close" class="close">&times;</span>
            <div>
              <h2 id="card-title" class="w3-center"></h2>
              <img id="imgModal" src="" width="100%" height="100%">
            </div>
          </div>
        
        </div>
        <!-- End Modal -->

        <div class="w3-row-padding">
  `;

  files.map((f) => {
    const outputPath = dirPath.replace('\\', '/');
    const largeImgPath = `../${outputPath}/${f.name}`;
    const imgPath = outputPath.replace('fashion', 'thumbs');
    const smallImgPath = `../${imgPath}/${f.name}`;

    html += `
            <div class="w3-col s3 w3-card w3-center display-card">
              <div class="card-header">${f.name.replace('.jpg', '')}</div>
              <img class="card-img" src="${smallImgPath.replace('\\', '/')}" onclick="handleClick('${largeImgPath.replace('\\', '/')}', '${f.name.replace('.jpg', '')}')">
            </div>
    `
  });

  html += `
        </div>
      </div>
    </body>
  </html>
  `;

  await fsp.writeFile(savePath, html);
};

const createIndex = async () => {
  const html = `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
      <link rel="stylesheet" href="pages/css/styles.css">
      <title>Index</title>
    </head>
    <body>
      <div class="w3-container">
        <h2>Home</h2></br>
        <ul class="w3-ul">
          <li><a href="pages/boots.html">Boots</a></li>
          <li><a href="pages/coats.html">Coats</a></li>
          <li><a href="pages/dresses.html">Dresses</a></li>
          <li><a href="pages/eyewear.html">Eyewear</a></li>
          <li><a href="pages/formal_jackets.html">Formal Jackets</a></li>
          <li><a href="pages/formal_pants.html">Formal Pants</a></li>
          <li><a href="pages/formal_shoes.html">Formal Shoes</a></li>
          <li><a href="pages/headgear.html">Head Gear</a></li>
          <li><a href="pages/jackets.html">Jackets</a></li>
          <li><a href="pages/jumpsuits.html">Jumpsuits</a></li>
          <li><a href="pages/masks.html">Masks</a></li>
          <li><a href="pages/pants.html">Pants</a></li>
          <li><a href="pages/shirts.html">Shirts</a></li>
          <li><a href="pages/shoes.html">Shoes</a></li>
          <li><a href="pages/skirts.html">Skirts</a></li>
          <li><a href="pages/tops.html">Tops</a></li>
          <li><a href="pages/tshirts.html">T-Shirts</a></li>
          <li><a href="pages/vests.html">Vests</a></li>
        </ul>
      </div>
    </body>
  </html>
  `;

  const savePath = path.join('./index.html');
  await fsp.writeFile(savePath, html);
};

const recurseReadDirs = async (dirPath) => {
  const entries = await fsp.readdir(dirPath, { withFileTypes: true }).catch((err) => console.log(err));

  if(entries) {
    const folders = entries.filter((f) => f.isDirectory());
    const files = entries.filter((f) => !f.isDirectory());

    folders.map((f) => {
      const fullPath = path.join(FashionDir, f.name);
      recurseReadDirs(fullPath);
    });

    //files.map((f) => resizeImage(dirPath, f));
    writeToHtml(dirPath, files);
    createIndex();
  }
};

recurseReadDirs(FashionDir);
