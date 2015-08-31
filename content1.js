var   wrapper = document.body.getElementsByClassName('aui-page-panel-inner')[0],
        listItems = wrapper ? wrapper.getElementsByTagName("li"),
        notes = "",
        row = "",
        pre = document.createElement('pre'),
        rangeToSelect = document.createRange(),
        selection = window.getSelection(),
        mdColCount = 3,
        mdNumberCol = 1,
        mdNameCol = 2;

        pre.style.position = "absolute";
        pre.style.left = "-10000px";
        pre.style.top = "-10000px";


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    row = "|";
    notes = "";
    mdColCount = request.scriptOptions.colCount ? request.scriptOptions.colCount  : mdColCount;
    mdNumberCol = request.scriptOptions.numberCol ? request.scriptOptions.numberCol : mdNumberCol;
    mdNameCol = request.scriptOptions.nameCol ? request.scriptOptions.nameCol : mdNameCol;

    for (var j = 0; j < mdColCount; j++) {
        row += "|"
    }

    for (var i=0; i < listItems.length; i++) {
        if (i !== 0) {
            var   theItem = listItems[i],
            storyId = theItem.getElementsByTagName('a')[0].innerHTML,
            storyName = JSON.stringify(theItem.innerHTML),
            cleanedName = storyName.replace(/\[(.*?)\] - / , ''),
            strippedName = cleanedName.replace(/^"(.+(?="$))"$/, '$1');

            var nameRow= [row.slice(0, mdNumberCol), storyId.trim(), row.slice(mdNumberCol)].join('');
            var colArr = nameRow.split("|");

            for (var k = 0; k < colArr.length; k++) {
                if (k == mdNameCol) {
                    colArr[k] = "  " + strippedName + "  ";
                }
            }

            var storyRow = colArr.join('  |  ');
            notes += storyRow + " \n" ;
        }
    }
    pre.innerHTML = notes;
    document.getElementsByTagName('body')[0].appendChild(pre);

    rangeToSelect.selectNodeContents(pre);
    selection.removeAllRanges ();
    selection.addRange (rangeToSelect);

    //copy them notes to the clipboard!
    document.execCommand ("copy", false, null);

    sendResponse({message: 'copied'});
  });