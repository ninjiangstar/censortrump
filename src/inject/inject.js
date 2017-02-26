(function() {

inject();

document.addEventListener('DOMSubtreeModified', inject);

function inject() {
	chrome.storage.local.get('textReplacement', function (response) {
		var textReplacementSetting = response['textReplacement'] || 1;
		textReplacementSetting = parseInt(textReplacementSetting);

		switch(textReplacementSetting) {
		case 1:
			walk(document.body, function(textNode) {
				replaceWith(textNode, 'Turd')
			});
			break;
		case 2:
			walk(document.body, function(textNode) {
				replaceWith(textNode, '💩💩💩💩')
			});
			break;
		default: break;
		}

	});
}

function replaceWith(textNode, replacementText) {
	var text = textNode.nodeValue;
	if (text.indexOf('Trump') > -1) {
		text = text.replace('Trump', replacementText);
		console.log(text);
	}
	textNode.nodeValue = text;
}

// Full credit to: http://is.gd/mwZp7E
function walk(node, callback)
{
	var child, next;
	switch (node.nodeType)
	{
		case Node.ELEMENT_NODE:
		case Node.DOCUMENT_NODE:
		case Node.DOCUMENT_FRAGMENT_NODE:
			child = node.firstChild;
			while (child)
			{
				next = child.nextSibling;
				walk(child, callback);
				child = next;
			}
			break;

		case Node.TEXT_NODE:
			callback(node);
			break;
	}
}


})();
