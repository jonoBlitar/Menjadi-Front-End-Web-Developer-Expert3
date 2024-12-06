const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'dist/images/heros');

// Cek apakah folder tujuan ada, jika tidak buat
if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

// Fungsi untuk resize gambar
const resizeImage = (inputPath, outputPath, width) => {
  sharp(inputPath)
    .resize(width)
    .jpeg({ quality: 80 }) // Output format JPEG dengan kualitas 80
    .toFile(outputPath)
    .then(() => console.log(`Image resized: ${outputPath}`))
    .catch((err) => console.error(`Error resizing image: ${err}`));
};

// Proses setiap gambar di folder target
fs.readdirSync(target).forEach((file) => {
  const filePath = path.join(target, file);

  // Filter hanya file gambar (jpg, jpeg, png)
  if (/\.(jpe?g|png)$/i.test(file)) {
    const fileName = file.split('.').slice(0, -1).join('.');

    // Resize untuk Hero (besar)
    resizeImage(filePath, `${destination}/${fileName}-1200.jpg`, 1200);
    resizeImage(filePath, `${destination}/${fileName}-1000.jpg`, 1000);
    resizeImage(filePath, `${destination}/${fileName}-600.jpg`, 600);

    // Resize untuk Loading (kecil)
    resizeImage(filePath, `${destination}/${fileName}-400.jpg`, 400);
    resizeImage(filePath, `${destination}/${fileName}-300.jpg`, 300);
    resizeImage(filePath, `${destination}/${fileName}-200.jpg`, 200);
  } else {
    console.log(`Skipping non-image file: ${file}`);
  }
});
/* 
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'dist/images/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target).forEach((image) => {
  const ext = image.match(/\.(jpg|png)/i)?.[0];

  if (!ext) {
    // convert hero image lebar 1200px
    sharp(`${target}/${image}`)
      .resize(1200)
      .toFile(
        path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-1200.jpg`,
        ),
      );

    // convert hero image lebar 1000px
    sharp(`${target}/${image}`)
      .resize(1000)
      .toFile(
        path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-1000.jpg`,
        ),
      );

    // convert hero image lebar 600px
    sharp(`${target}/${image}`)
      .resize(600)
      .toFile(
        path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-600.jpg`,
        ),
      );
  } else {
    // convert loading image lebar 400px
    sharp(`${target}/${image}`)
      .resize(400)
      .toFile(
        path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-400.jpg`,
        ),
      );

    // convert loading image lebar 300px
    sharp(`${target}/${image}`)
      .resize(300)
      .toFile(
        path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-300.jpg`,
        ),
      );

    // convert loading image lebar 200px
    sharp(`${target}/${image}`)
      .resize(200)
      .toFile(
        path.resolve(
          __dirname,
          `${destination}/${image.split('.').slice(0, -1).join('.')}-200.jpg`,
        ),
      );
  }
});
 */