const MOUNTAINS = [{
        name: "Kilimanjaro",
        height: 5895,
        country: "Tanzania"
    },
    {
        name: "Everest",
        height: 8848,
        country: "Nepal"
    },
    {
        name: "Mount Fuji",
        height: 3776,
        country: "Japan"
    },
    {
        name: "Mont Blanc",
        height: 4808,
        country: "Italy/France"
    },
    {
        name: "Vaalserberg",
        height: 323,
        country: "Netherlands"
    },
    {
        name: "Denali",
        height: 6168,
        country: "United States"
    },
    {
        name: "Popocatepetl",
        height: 5465,
        country: "Mexico"
    }
];

class PrintTableInConsole {
    constructor(arr) {
        this.base = arr;
        this.titles = Object.keys(arr[0]);
        this.tableColumnWidths = this._colWidthCreation();
        this.columnWidth();
        this.drawTable();
    }

    _colWidthCreation() {
        let obj = {};
        this.titles.forEach(item => obj[`${item}`] = 0);
        return obj;
    }

    _cellWidth(str) {
        if (typeof str === 'number') str = String(str);
        let words = str.split(' ');

        if (words.length > 1) {
            words.reduce((result, currentItem) => result.length > currentItem.length ? result : currentItem);
            return words[0].length;
        }
        return words[0].length;
    }

    columnWidth() {
        this.base.forEach(item => {
            for (let key in item) {
                let objKeyVal = this._cellWidth(item[`${key}`]);

                if (objKeyVal > this.tableColumnWidths[`${key}`]) {
                    this.tableColumnWidths[`${key}`] = objKeyVal;
                } else continue;
            }
        });

        this.titles.forEach(item => {
            for (let key in this.tableColumnWidths) {
                if (item.length > this.tableColumnWidths[`${key}`]) {
                    this.tableColumnWidths[`${key}`] = item.length;
                }
                continue;
            }
        });
        return this.tableColumnWidths;
    }

    _rowHeight(obj) {
        let arr = [];
        for (let key in obj) {

            let value = obj[`${key}`];

            if (typeof value !== 'string') value = String(value);

            const widthOfCurrentColumn = this.tableColumnWidths[`${key}`];

            arr.push((value.length < widthOfCurrentColumn) ? [value] : value.split(' '));
        }
        let result = arr.reduce((prev, current) => prev.length > current.length ? prev : current);
        return result.length;
    }

    createTitle() {
        let titleStr = '';

        this.titles.forEach(item => {
            
            let spaces = (this.tableColumnWidths[`${item}`] - item.length) > 0 ?
                this.tableColumnWidths[`${item}`] - item.length : 0;
            titleStr += `${item}`;
            while (spaces >= 0) {
                titleStr += ' ';
                --spaces;
            }
        });

        titleStr += '\n';

        titleStr += this.createLine();

        return titleStr;
    }

    createLine() {
        let colWidthsArr = [];
        for (let key in this.tableColumnWidths) {
            colWidthsArr.push(this.tableColumnWidths[`${key}`]);
        }
        let lineStr = '';
        colWidthsArr.forEach(item => {
            while (item > 0) {
                lineStr += '-';
                item--;
            }
            lineStr += ' ';
        });

        lineStr += '\n';

        return lineStr;
    }

    createRow(obj) {
        let utilityObj = {};

        for (let key in obj) {
            let value = obj[`${key}`];

            if (typeof value !== 'string') value = String(value);

            const widthOfCurrentColumn = this.tableColumnWidths[`${key}`];

            if (value.length <= widthOfCurrentColumn) {
                let spaces = (widthOfCurrentColumn - value.length) > 0 ?
                    widthOfCurrentColumn - value.length : 0;

                while (spaces >= 0) {
                    value += ' ';
                    --spaces;
                }
                utilityObj[`${key}`] = [value];

            } else {

                utilityObj[`${key}`] = value.split(' ');

                let cellWithSpaces = [];

                utilityObj[`${key}`].forEach(item => {

                    let spaces = (widthOfCurrentColumn - item.length) > 0 ?
                        widthOfCurrentColumn - item.length : 0;

                    let wordNSpaces = item;

                    while (spaces > 0) {
                        wordNSpaces += ' ';
                        --spaces;
                    }
                    cellWithSpaces.push(wordNSpaces)
                });
                utilityObj[`${key}`] = cellWithSpaces;
            }

        }

        let resultStr = '';

        const rowHeight = this._rowHeight(obj);

        for (let i = 0; i <= rowHeight; i++) {
            for (let key in utilityObj) {
                if (!utilityObj[`${key}`][i]) continue;

                resultStr += `${utilityObj[`${key}`][i]} `;
            }
            resultStr += '\n';
        }

        return resultStr;
    }

    drawTable() {
        let table = '';
        table += this.createTitle();

        this.base.forEach(item => {
            table += this.createRow(item);
        });

        return console.log(table);
    }
}

let table = new PrintTableInConsole(MOUNTAINS);