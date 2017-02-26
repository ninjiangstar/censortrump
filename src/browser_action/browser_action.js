function documentIsReady() {
	restoreSettings();

	var textReplacementElements = document.forms['form'].elements['text-replacement'];
	textReplacementElements.forEach(function (radio) {
		radio.addEventListener('change', function (event) {
			if (radio.checked) {
				var settingIndex = parseInt(radio.value);
				updateTextReplacementSetting(settingIndex);
			}
		});
	})

}

function restoreSettings() {
	chrome.storage.local.get('textReplacement', function dataRetrieved(response) {
		var value = response['textReplacement'] || 1;
		document.forms['form'].elements['text-replacement-' + value].checked = true;
	});
}

function updateTextReplacementSetting(settingIndex) {
	console.log("setting....", settingIndex);
	chrome.storage.local.set({
		'textReplacement': settingIndex
	}, function () {
		// todo: inject into website to reflect change
		console.log("setted", settingIndex);
	})
}

// Restore settings when the DOM loads
document.addEventListener('DOMContentLoaded', documentIsReady);
