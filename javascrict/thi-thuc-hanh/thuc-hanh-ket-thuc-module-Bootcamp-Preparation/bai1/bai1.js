let a = [1,2,3,4,5,6,7,8,9];
function finMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max){
            max = arr[i];
        }
    }
    return max;
}
alert("finMax là: " + finMax(a));
