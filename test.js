let r = /^[a-z][a-z]\w*\d$/i;
let username = "Data23"
let username_two = "12Data23";
let username_three = "d12";
console.log(r.test(username));
console.log(username.match(r));
console.log(r.test(username_two));
console.log(username_two.match(r));
console.log(r.test(username_three));
console.log(username_three.match(r));