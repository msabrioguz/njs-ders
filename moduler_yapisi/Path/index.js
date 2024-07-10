const path = require("path");

console.log(
  "Extension: ",
  path.extname(
    "C:\\Users\\mustafa.oguz\\Desktop\\Projeler\\Javascript\\njs-ders\\Path\\index.js"
  )
);

console.log(
  "Base name: ",
  path.basename(
    "C:\\Users\\mustafa.oguz\\Desktop\\Projeler\\Javascript\\njs-ders\\Path\\index.js",
    ".js"
  )
);

console.log(
  "dirname: ",
  path.dirname(
    "C:\\Users\\mustafa.oguz\\Desktop\\Projeler\\Javascript\\njs-ders\\Path\\index.js"
  )
);

const pathFormat = path.format({
  root: "/test/deneme/",
  name: "dosya",
  ext: ".txt",
});

console.log("format:", pathFormat);

console.log("join: ", path.join("/test/deneme/", "dosya", ".txt"));

console.log(
  "parse: ",
  path.parse(
    "C:\\Users\\mustafa.oguz\\Desktop\\Projeler\\Javascript\\njs-ders\\Path\\index.js"
  )
);

console.log(
  "resolve: ",
  path.resolve(
    "C:\\Users\\mustafa.oguz\\Desktop\\Projeler\\Javascript\\njs-ders\\Path\\"
  )
);

console.log("sep: ", path.sep);

console.log("delimiter: ", path.delimiter);

console.log("path.resolve: ", path.resolve("/a", "b", "c"));
console.log("path.resolve: ", path.resolve("/a", "/b", "c"));
console.log("path.resolve: ", path.resolve("/a", "/b", "/c"));