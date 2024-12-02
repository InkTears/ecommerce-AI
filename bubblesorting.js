function bubbleSort(arr) {
    let n = arr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // Échange des éléments
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
        n--; // Réduire la plage de tri car le plus grand élément est déjà à la bonne place
    } while (swapped);
    return arr;
}

// Exemple d'utilisation
const array = [64, 34, 25, 12, 22, 11, 90];
console.log("Tableau trié:", bubbleSort(array));