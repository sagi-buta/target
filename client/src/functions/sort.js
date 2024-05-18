

function isDoneSort(array) {
   array.sort((a, b) => {
        if (a.isDone === b.isDone) return 0;
        if (a.isDone) return 1;
        return -1;
    })
    return array
}



export default {isDoneSort}