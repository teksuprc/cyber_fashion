/**
 * App
 * Description: This app generates web pages to visually see Cyberpunk 2077 Fashion.
*/

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const fsp = fs.promises;

const FemaleFashionDir = './fashion/female';
const MaleFashionDir = './fashion/male';
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
      <link rel="stylesheet" href="../css/styles.css">
      <script src="../js/local_modal.js"></script>
      <title>${dirName}</title>
    </head>
    <body onload="init()">
      <div class="w3-container">
        <h2>${dirName.toUpperCase()}</h2>
        <ul class="w3-ul">
          <li><a href="../../index.html">Home</a></li>
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
              <img class="card-img" src="../${smallImgPath.replace('\\', '/')}" onclick="handleClick('../${largeImgPath.replace('\\', '/')}', '${f.name.replace('.jpg', '')}')">
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
        <table>
          <tr>
            <td class="header-col">Boots</td>
            <td class="item-col"><a href="pages/female/boots.html">female</a></td>
            <td class="item-col"><a href="pages/male/boots.html">male</a></td>
          </tr>
          <tr>
            <td class="header-col">Coats</td>
            <td class="item-col"><a href="pages/female/coats.html">female</a></td>
            <td class="item-col"><a href="pages/male/coats.html">male</a></td>
          </tr>
          <tr>
            <td class="header-col">Dresses</td>
            <td class="item-col"><a href="pages/female/dresses.html">female</a></td>
            <td class="item-col"><a href="pages/male/dresses.html">male</a></td>
          </tr>
          <tr>
            <td class="header-col">Eyewear</td>
            <td class="item-col"><a href="pages/female/eyewear.html">female</a></td>
            <td class="item-col"><a href="pages/male/eyewear.html">male</a></td>
          </tr>
          <tr>
            <td class="header-col">Formal Jackets</td>
            <td class="item-col"><a href="pages/female/formal_jackets.html">female</a></td>
            <td class="item-col"><a href="pages/male/formal_jackets.html">male</a></td>
          </tr>
          <tr>
            <td class="header-col">Formal Pants</td>
            <td class="item-col"><a href="pages/female/formal_pants.html">female</a></td>
            <td class="item-col"><a href="pages/male/formal_pants.html">male</a></td>
          </tr>
          <tr>
            <td class="header-col">Formal Shoes</td>
            <td class="item-col"><a href="pages/female/formal_shoes.html">female</a></td>
            <td class="item-col"><a href="pages/male/formal_shoes.html">male</a></td>
          </tr>
          <tr>
            <td class="header-col">Head Gear</td>
            <td class="item-col"><a href="pages/female/headgear.html">female</a></td>
            <td class="item-col"><a href="pages/male/headgear.html">male</a></td>
          </tr>
          <tr>
            <td class="header-col">Jackets</td>
            <td class="item-col"><a href="pages/female/jackets.html">female</a></td>
            <td class="item-col"><a href="pages/male/jackets.html">male</a></td>
          </tr>
          <tr>
            <td class="header-col">Jumpsuits</td>
            <td class="item-col"><a href="pages/female/jumpsuits.html">female</a></td>
            <td class="item-col"><a href="pages/male/jumpsuits.html">male</a></td>
          </tr>
          <tr>
            <td class="header-col">Masks</td>
            <td class="item-col"><a href="pages/female/masks.html">female</a></td>
            <td class="item-col"><a href="pages/male/masks.html">male</a></td>
          </tr>
          <tr>
            <td class="header-col">Pants</td>
            <td class="item-col"><a href="pages/female/pants.html">female</a></td>
            <td class="item-col"><a href="pages/male/pants.html">male</a></td>
          </tr>
          <tr>
            <td class="header-col">Shirts</td>
            <td class="item-col"><a href="pages/female/shirts.html">female</a></td>
            <td class="item-col"><a href="pages/male/shirts.html">male</a></td>
          </tr>
          <tr>
            <td class="header-col">Shoes</td>
            <td class="item-col"><a href="pages/female/shoes.html">female</a></td>
            <td class="item-col"><a href="pages/male/shoes.html">male</a></td>
          </tr>
          <tr>
            <td class="header-col">Skirts</td>
            <td class="item-col"><a href="pages/female/skirts.html">female</a></td>
            <td class="item-col"><a href="pages/male/skirts.html">male</a></td>
          </tr>
          <tr>
            <td class="header-col">Tops</td>
            <td class="item-col"><a href="pages/female/tops.html">female</a></td>
            <td class="item-col"><a href="pages/male/tops.html">male</a></td>
          </tr>
          <tr>
            <td class="header-col">T-Shirts</td>
            <td class="item-col"><a href="pages/female/tshirts.html">female</a></td>
            <td class="item-col"><a href="pages/male/tshirts.html">male</a></td>
          </tr>
          <tr>
            <td class="header-col">Vests</td>
            <td class="item-col"><a href="pages/female/vests.html">female</a></td>
            <td class="item-col"><a href="pages/male/vests.html">male</a></td>
          </tr>
        </table>
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
      const fullPath = path.join(dirPath, f.name);
      recurseReadDirs(fullPath);
    });

    files.map((f) => resizeImage(dirPath, f));
    writeToHtml(dirPath, files);
  }
};

recurseReadDirs(FemaleFashionDir);
recurseReadDirs(MaleFashionDir);
createIndex();
