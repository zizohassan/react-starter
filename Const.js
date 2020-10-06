module.exports = class Const {
  languages(){
    return [
      "Ar",
      "En",
      //PLOP_LANG_INJECT
    ]
  }
  languageAll(){
    return [...this.languages() , "All"]
  }
};



