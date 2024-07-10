const fs = require("fs");

fs.writeFileSync("hello.txt", "Hello World!", (err) => {
  //   console.log("Hata: ", err);
});

fs.writeFileSync("index.txt", "Merhaba \nNodejs", (err) => {
  //   console.log("Hata: ", err);
});

for (let index = 0; index < 3; index++) {
  fs.appendFileSync("hello.txt", "\nSelam", (err) => {
    // console.log("Hata: ", err);
  });

  fs.appendFileSync("index.txt", "\nMerhaba", (err) => {
    // console.log("Hata: ", err);
  });
}

// fs.open("index.txt", "w", (err) => {
//   console.log("dosya açıldı.");
// });

fs.readFile("index.txt", (err, data) => {
  console.log("index:\n", data.toString());
});

fs.unlink("index.txt", (err) => {
  console.log("dosya silindi.");
});

// fs.copyFile("hello.txt", "hello2.txt", (err) => {
//   console.log("dosya kopyalandı.");
// });

fs.copyFileSync("hello.txt", "hello2.txt");

fs.rename("hello2.txt", "yasin.txt", (err) => {
  console.log("dosya yeniden adlandırıldı.");
});

fs.mkdir("a/b/c", { recursive: true }, (err) => {
  console.log("dosya klasoru olusturuldu.");
});

fs.opendir("./", async (err, dir) => {
  for await (const dirent of dir) {
    console.log(
      "name: ",
      dirent.name,
      "isFile:",
      dirent.isFile(),
      "isDirectory:",
      dirent.isDirectory()
    );
  }
});

fs.readdir("./", (err, files) => {
  console.log("files: ", files);
});

console.log("Dosya var mı?: ", fs.existsSync("a/b/c"));

fs.stat("yasin.txt", (err, stats) => {
  console.log("stats: ", stats);
});

fs.watchFile("yasin.txt", (curr, prev) => {
  console.log("watchFile: ", curr, prev);
});
