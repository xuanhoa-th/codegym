let num = +prompt("nhập vào số lượng phần tử của mảng: ");
let mang = [];
for (let i = 0; i < num; i++) {
   mang.push(+prompt("Nhập vào phần tử thứ " + (i + 1)));
}

let x = +prompt("nhập số muốn xóa");
function tryRemoveFromArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === x){
            let arrout = arr.splice(i, 1);
            arr = arrout;
        }
    }
    return arr;
}
// console.log(mang); // mang da xoa;
// console.log(tryRemoveFromArray(mang));
document.getElementById("mang2").innerHTML = tryRemoveFromArray(mang);
document.getElementById("mang1").innerHTML = tryRemoveFromArray(mang);