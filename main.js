function processFile() {
    var file = document.querySelector('#file').files[0];
    var reader = new FileReader();
    var validCols = [1, 3, 5, 19];
    var validRows = [["Date", "Amount", "Payee", "Description"]];
    reader.readAsText(file);
    reader.onload = function (event) {

        var csv = event.target.result;
        var rows = csv.split('\n');

        for (var i = 1; i < rows.length; i++) {
            cols = rows[i].split(';');

            var row = [];
            for (var j = 0; j < cols.length; j++) {
                if (validCols.includes(j)) {
                    row.push(cols[j]);
                }
            }
            move(row, 3, 1);
            row[0] = dateFormat(row[0]);
            validRows.push(row);
        }

        let csvContent = "data:text/csv;charset=utf-8," + validRows.map(e => e.join(";")).join("\n");
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        var d = Date.now();
        link.innerHTML = "Download " + d + ".csv";
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", d + ".csv");
        document.body.appendChild(link);
    }
}

function dateFormat (date) {
    if(date) return date.toString().replace(/\./g,'/');

    return date;
}

function move(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }
     arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);  
   return arr;
}
