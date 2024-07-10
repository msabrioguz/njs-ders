const myModule = {
  add(s1, s2) {
    return s1 + s2;
  },
  logToConsole(text) {
    console.log(text);
  },
};

const myname = "mustafa";

const getData = () => {
  return new Date();
};

module.exports = { myModule, getData, myname };
