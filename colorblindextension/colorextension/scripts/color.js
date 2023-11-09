/*
 * CS360 Group Project
 * @author: Kerry Wang, Jayden Fedoroff, Ryan Crist, Kien Tran
 * @date:   October 27, 2023
 * @desc:  This file contains the code for the colorblind extension.
 */
let rSliderValue = 0;
let gSliderValue = 0;
let bSliderValue = 0;
let filterName = 0;

function createTypeButton(typeName) {
	return `<button type="button" class="versionButton">${typeName}</button>`;
}

function createButtonWithFunction(buttonName, func) {
	return `<button type="button" class="versionButton" func="${func.name}">${buttonName}</button>`;
}

function createButton0WithFunction(buttonName) {
	filterName = 0;
	console.log("change filter name to 0");
	return `<button type="button" id="revertColor">${buttonName}</button>`;
}

function createButton1WithFunction(buttonName) {
	filterName = 1;
	console.log("change filter name to 1");
	return `<button type="button" id="invertGreen">${buttonName}</button>`;
}

function createRGBSlider(colorValue) {
	return `
	<input type="range" min="0" max="255" value = "0" class="rbgslider" id="${colorValue}">
	<p style="color:black;"> ${colorValue} <span id="${colorValue}Value">0</span></p>
	`;
}

// Anything that appears between the curly braces will not be run until the whole web page has loaded
// $(document).ready(function () {

// BETA:
// Func 1 -- color-blind mode Func: tritan1: first method to deal with colorblind contrast using tritanopia as example: increase contrast using ranges of average rgb values and manipulate green
const tritanRoughOne = (
	topCoordImage,
	leftCoordImage,
	canvasContent,
	thisCanvas
) => {
	console.log("tritanopia method 1");
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	// HELP: We learned how to get RGBA values of pixels of images into a list.
	// Syntax: .getImageData(sx, sy, sw, sh)
	const imageInfoList = canvasContent.getImageData(
		0,
		0,
		thisCanvas.width,
		thisCanvas.height
	); // a list of R,G,B,A of all pixels on images
	const imageInfoLength = imageInfoList.data.length;
	const thisData = imageInfoList.data;
	for (let index = 0; index < imageInfoLength; index += 4) {
		// G is at [index + 1]

		var largestValue = 0;
		var smallestValue = 0;
		// TASK: Make bright brighter and dark darker
		// When (r+g+b)/ 3 > 100 -- upper 1 (bright) case -- biggest value add to 255 and the other two change by same amount
		if (
			(thisData[index] + thisData[index + 1] + thisData[index + 2]) / 3 >=
			224
		) {
			// (256 / 9) * 7
			// find max from R, G, B
			if (thisData[index] > thisData[index + 1]) {
				largestValue = thisData[index];
			} else {
				largestValue = thisData[index + 1];
			}

			if (thisData[index + 2] > largestValue) {
				largestValue = thisData[index + 2];
			}

			// add the var to R, G, B to make brighter
			var addVar = 255 - largestValue; // value to add to all R G B

			thisData[index] += addVar;
			thisData[index + 1] += addVar;
			thisData[index + 2] += addVar;
			largestValue = 0;
		}
		// When (r+g+b)/ 3 > 100 -- upper 2 (bright) case -- biggest value add to 224 and the other two change by same amount
		else if (
			(thisData[index] + thisData[index + 1] + thisData[index + 2]) / 3 >=
			196
		) {
			// (256 / 9) * 8 = 224
			// find max from R, G, B
			if (thisData[index] > thisData[index + 1]) {
				largestValue = thisData[index];
			} else {
				largestValue = thisData[index + 1];
			}

			if (thisData[index + 2] > largestValue) {
				largestValue = thisData[index + 2];
			}

			// add the var to R, G, B to make brighter
			var addVar = 224 - largestValue; // value to add to all R G B

			thisData[index] += addVar;
			thisData[index + 1] += addVar;
			thisData[index + 2] += addVar;
			largestValue = 0;
		}
		// When (r+g+b)/ 3 > 100 -- upper 3 (bright) case -- biggest value add to 196 and the other two change by same amount
		else if (
			(thisData[index] + thisData[index + 1] + thisData[index + 2]) / 3 >=
			168
		) {
			// (256 / 9) * 6
			// find max from R, G, B
			if (thisData[index] > thisData[index + 1]) {
				largestValue = thisData[index];
			} else {
				largestValue = thisData[index + 1];
			}

			if (thisData[index + 2] > largestValue) {
				largestValue = thisData[index + 2];
			}

			// add the var to R, G, B to make brighter
			var addVar = 196 - largestValue; // value to add to all R G B

			thisData[index] += addVar;
			thisData[index + 1] += addVar;
			thisData[index + 2] += addVar;
			largestValue = 0;
		}
		// When (r+g+b)/ 3 > 100 -- upper 4 (bright) case -- biggest value add to 168 and the other two change by same amount
		else if (
			(thisData[index] + thisData[index + 1] + thisData[index + 2]) / 3 >=
			140
		) {
			// (256 / 9) * 5
			// find max from R, G, B
			if (thisData[index] > thisData[index + 1]) {
				largestValue = thisData[index];
			} else {
				largestValue = thisData[index + 1];
			}

			if (thisData[index + 2] > largestValue) {
				largestValue = thisData[index + 2];
			}

			// add the var to R, G, B to make brighter
			var addVar = 168 - largestValue; // value to add to all R G B

			thisData[index] += addVar;
			thisData[index + 1] += addVar;
			thisData[index + 2] += addVar;
			largestValue = 0;
		}
		// middle range -- not change color
		else if (
			(thisData[index] + thisData[index + 1] + thisData[index + 2]) / 3 >=
			112
		) {
			// (256 / 9) * 4
			// Do nothing
		}
		// lower 1 range -- smallest value dec down to 56 and the other two change by same value
		else if (
			(thisData[index] + thisData[index + 1] + thisData[index + 2]) / 3 >=
			64
		) {
			// (256 / 9) * 3
			// find min from R, G, B
			if (thisData[index] < thisData[index + 1]) {
				smallestValue = thisData[index];
			} else {
				smallestValue = thisData[index + 1];
			}

			if (thisData[index + 2] < largestValue) {
				smallestValue = thisData[index + 2];
			}

			// dec the var to R, G, B to make darker
			var decVar = smallestValue - 56; // value to dec to all R G B

			thisData[index] -= decVar;
			thisData[index + 1] -= decVar;
			thisData[index + 2] -= decVar;
			smallestValue = 0;
		}
		// lower 2 range -- smallest value dec down to 28 and the other two change by same value
		else if (
			(thisData[index] + thisData[index + 1] + thisData[index + 2]) / 3 >=
			56
		) {
			// (256 / 9) * 2
			// find min from R, G, B
			if (thisData[index] < thisData[index + 1]) {
				smallestValue = thisData[index];
			} else {
				smallestValue = thisData[index + 1];
			}

			if (thisData[index + 2] < largestValue) {
				smallestValue = thisData[index + 2];
			}

			// dec the var to R, G, B to make darker
			var decVar = smallestValue - 28; // value to dec to all R G B

			thisData[index] -= decVar;
			thisData[index + 1] -= decVar;
			thisData[index + 2] -= decVar;
			smallestValue = 0;
		}
		// lower 3 range -- smallest value dec down to 0 and the other two change by same value
		else {
			// (256 / 9) * 1
			// find min from R, G, B
			if (thisData[index] < thisData[index + 1]) {
				smallestValue = thisData[index];
			} else {
				smallestValue = thisData[index + 1];
			}

			if (thisData[index + 2] < largestValue) {
				smallestValue = thisData[index + 2];
			}

			// dec the var to R, G, B to make darker
			var decVar = smallestValue - 0; // value to dec to all R G B

			thisData[index] -= decVar;
			thisData[index + 1] -= decVar;
			thisData[index + 2] -= decVar;
			smallestValue = 0;
		}
	}
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
	// HELP: We learned how to paint altered images onto canvas.
	// Syntax: .putImageData(imageData, dx, dy)
	canvasContent.putImageData(imageInfoList, 0, 0);
};

// BETA:
// Func 2 -- color-blind mode Func: changeContrast: change the contrast of image
const changeContrast = (contrast, thisData, index) => {
	// CITE: Oseiskai; Francis G. Loch
	// URL: https://www.dfstudios.co.uk/articles/programming/image-programming-algorithms/image-processing-algorithms-part-5-contrast-adjustment/
	// URL2: https://math.stackexchange.com/questions/906240/algorithms-to-increase-or-decrease-the-contrast-of-an-image
	// HELP: find a math model to increase contrast
	var factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
	thisData[index] = factor * (thisData[index] - 128) + 128;
	thisData[index + 1] = factor * (thisData[index + 1] - 128) + 128;
	thisData[index + 2] = factor * (thisData[index + 2] - 128) + 128;
};

// BETA:
// Func 3 -- color-blind mode Func: tritan: second method to deal with colorblind contrast for tritanopia: add mathmatically calculated contrast to increase color contrast for all pixels and also dynamically apply more contrast to R and G value
const tritan = (topCoordImage, leftCoordImage, canvasContent, thisCanvas) => {
	console.log("tritanopia method 2");
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	// HELP: We learned how to get RGBA values of pixels of images into a list.
	// Syntax: .getImageData(sx, sy, sw, sh)
	const imageInfoList = canvasContent.getImageData(
		0,
		0,
		thisCanvas.width,
		thisCanvas.height
	); // a list of R,G,B,A of all pixels on images
	const imageInfoLength = imageInfoList.data.length;
	const thisData = imageInfoList.data;
	for (let index = 0; index < imageInfoLength; index += 4) {
		// TASK: increase contrast
		changeContrast(64, thisData, index); // contrast we can use from [0, 255]

		// don't do absolute value, there are four cases
		var factor = (259 * (48 + 255)) / (255 * (259 - 48));
		var factor2 = (259 * (80 + 255)) / (255 * (259 - 80));
		if (index != 0) {
			// ex. #FAA0A0 to #CAA000 (C-F: contrast able to see) 0FAh - 0CAh = 48d = 30h
			if (thisData[index - 4] - thisData[index] <= 48) {
				// compare R
				// thisData[index - 4] += 48;

				thisData[index - 4] =
					factor * (thisData[index - 4] - 128) + 128;
				// thisData[index] = factor2 * (thisData[index] - 128) + 128;
			} else if (thisData[index] - thisData[index - 4] <= 48) {
				// compare R
				// thisData[index] += 48;
				// thisData[index - 4] = factor2 * (thisData[index - 4] - 128) + 128;
				thisData[index] = factor * (thisData[index] - 128) + 128;
			}
			// ex. #FAA0A0 TO FAD000 (A-D: contrast able to see) 0D0h - 0A0h = 48d = 30h
			if (thisData[index - 4 + 1] - thisData[index + 1] <= 48) {
				// compare G
				// thisData[index - 4 + 1] += 48;
				// thisData[index + 1] = factor2 * (thisData[index + 1] - 128) + 128;
				thisData[index - 4 + 1] =
					factor * (thisData[index - 4 + 1] - 128) + 128;
			} else if (thisData[index] - thisData[index - 4 + 1] <= 48) {
				// compare G
				// thisData[index + 1] += 48;

				thisData[index + 1] =
					factor * (thisData[index + 1] - 128) + 128;
				// thisData[index - 4 + 1] = factor2 * (thisData[index - 4 + 1] - 128) + 128;
			}
		}
	}
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
	// HELP: We learned how to paint altered images onto canvas.
	// Syntax: .putImageData(imageData, dx, dy)
	canvasContent.putImageData(imageInfoList, 0, 0);
};

// BETA:
// Func 4 -- color-blind mode Func: deutan: using the second method deal with colorblind contrast for deuteranopia: add mathmatically calculated contrast to increase color contrast for all pixels and also dynamically apply more contrast to R and B value
const deutan = (topCoordImage, leftCoordImage, canvasContent, thisCanvas) => {
	console.log("deuteranopia method 2");
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	// HELP: We learned how to get RGBA values of pixels of images into a list.
	// Syntax: .getImageData(sx, sy, sw, sh)
	const imageInfoList = canvasContent.getImageData(
		0,
		0,
		thisCanvas.width,
		thisCanvas.height
	); // a list of R,G,B,A of all pixels on images
	const imageInfoLength = imageInfoList.data.length;
	const thisData = imageInfoList.data;
	for (let index = 0; index < imageInfoLength; index += 4) {
		// TASK: increase contrast
		changeContrast(64, thisData, index); // contrast we can use from [0, 255]

		// don't do absolute value, there are four cases
		var factor = (259 * (48 + 255)) / (255 * (259 - 48));
		var factor2 = (259 * (80 + 255)) / (255 * (259 - 80));
		if (index != 0) {
			// ex. #FAA0A0 to #CAA000 (C-F: contrast able to see) 0FAh - 0CAh = 48d = 30h
			if (thisData[index - 4] - thisData[index] <= 48) {
				// compare R
				// thisData[index - 4] += 48;

				thisData[index - 4] =
					factor * (thisData[index - 4] - 128) + 128;
				// thisData[index] = factor2 * (thisData[index] - 128) + 128;
			} else if (thisData[index] - thisData[index - 4] <= 48) {
				// compare R
				// thisData[index] += 48;
				// thisData[index - 4] = factor2 * (thisData[index - 4] - 128) + 128;
				thisData[index] = factor * (thisData[index] - 128) + 128;
			}
			// ex. #FAA0A0 TO FAD000 (A-D: contrast able to see) 0D0h - 0A0h = 48d = 30h
			if (thisData[index - 4 + 2] - thisData[index + 2] <= 48) {
				// compare B
				// thisData[index - 4 + 1] += 48;
				// thisData[index + 2] = factor2 * (thisData[index + 2] - 128) + 128;
				thisData[index - 4 + 2] =
					factor * (thisData[index - 4 + 2] - 128) + 128;
			} else if (thisData[index] - thisData[index - 4 + 2] <= 48) {
				// compare B
				// thisData[index + 1] += 48;

				thisData[index + 2] =
					factor * (thisData[index + 2] - 128) + 128;
				// thisData[index - 4 + 2] = factor2 * (thisData[index - 4 + 2] - 128) + 128;
			}
		}
	}
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
	// HELP: We learned how to paint altered images onto canvas.
	// Syntax: .putImageData(imageData, dx, dy)
	canvasContent.putImageData(imageInfoList, 0, 0);
};

// BETA:
// Func 5 -- color-blind mode Func: protan: using the second method deal with colorblind contrast for deuteranopia: add mathmatically calculated contrast to increase color contrast for all pixels and also dynamically apply more contrast to G and B value
const protan = (topCoordImage, leftCoordImage, canvasContent, thisCanvas) => {
	console.log("protanopia method 2");
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	// HELP: We learned how to get RGBA values of pixels of images into a list.
	// Syntax: .getImageData(sx, sy, sw, sh)
	const imageInfoList = canvasContent.getImageData(
		0,
		0,
		thisCanvas.width,
		thisCanvas.height
	); // a list of R,G,B,A of all pixels on images
	const imageInfoLength = imageInfoList.data.length;
	const thisData = imageInfoList.data;
	for (let index = 0; index < imageInfoLength; index += 4) {
		// TASK: increase contrast
		changeContrast(64, thisData, index); // contrast we can use from [0, 255]

		// don't do absolute value, there are four cases
		var factor = (259 * (48 + 255)) / (255 * (259 - 48));
		var factor2 = (259 * (80 + 255)) / (255 * (259 - 80));
		if (index != 0) {
			// ex. #FAA0A0 to #CAA000 (C-F: contrast able to see) 0FAh - 0CAh = 48d = 30h
			if (thisData[index - 4 + 1] - thisData[index + 1] <= 48) {
				// compare G
				// thisData[index - 4] += 48;

				thisData[index - 4 + 1] =
					factor * (thisData[index - 4 + 1] - 128) + 128;
				// thisData[index + 1] = factor2 * (thisData[index + 1] - 128) + 128;
			} else if (thisData[index + 1] - thisData[index - 4 + 1] <= 48) {
				// compare G
				// thisData[index] += 48;
				// thisData[index - 4 + 1] = factor2 * (thisData[index - 4 + 1] - 128) + 128;
				thisData[index + 1] =
					factor * (thisData[index + 1] - 128) + 128;
			}
			// ex. #FAA0A0 TO FAD000 (A-D: contrast able to see) 0D0h - 0A0h = 48d = 30h
			if (thisData[index - 4 + 2] - thisData[index + 2] <= 48) {
				// compare B
				// thisData[index - 4 + 1] += 48;
				// thisData[index + 2] = factor2 * (thisData[index + 2] - 128) + 128;
				thisData[index - 4 + 2] =
					factor * (thisData[index - 4 + 2] - 128) + 128;
			} else if (thisData[index] - thisData[index - 4 + 2] <= 48) {
				// compare B
				// thisData[index + 1] += 48;

				thisData[index + 2] =
					factor * (thisData[index + 2] - 128) + 128;
				// thisData[index - 4 + 2] = factor2 * (thisData[index - 4 + 2] - 128) + 128;
			}
		}
	}
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
	// HELP: We learned how to paint altered images onto canvas.
	// Syntax: .putImageData(imageData, dx, dy)
	canvasContent.putImageData(imageInfoList, 0, 0);
};

// BETA:
// Func 4 -- color-blind mode Func: archrom: using the second method deal with colorblind contrast for archromatopsia: add mathmatically calculated contrast to increase color contrast for all pixels
const archrom = (topCoordImage, leftCoordImage, canvasContent, thisCanvas) => {
	console.log("deuteranopia method 2");
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	// HELP: We learned how to get RGBA values of pixels of images into a list.
	// Syntax: .getImageData(sx, sy, sw, sh)
	const imageInfoList = canvasContent.getImageData(
		0,
		0,
		thisCanvas.width,
		thisCanvas.height
	); // a list of R,G,B,A of all pixels on images
	const imageInfoLength = imageInfoList.data.length;
	const thisData = imageInfoList.data;
	for (let index = 0; index < imageInfoLength; index += 4) {
		// TASK: increase contrast
		changeContrast(128, thisData, index); // contrast we can use from [0, 255]
	}
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
	// HELP: We learned how to paint altered images onto canvas.
	// Syntax: .putImageData(imageData, dx, dy)
	canvasContent.putImageData(imageInfoList, 0, 0);
};

// -------------------------------------------------
// ----------Image Filter Overall Function:---------
// Overall Func 1: Loop through images to apply filter
const loopThroughImgs = () => {
	const imageList = document.getElementsByTagName("img"); // get a list of images
	const imageListLength = imageList.length;

	// Create a list of different ids for multiple canvas creation according to the numbers of images on web page
	const nameID = "canvas";
	const nameIDList = [];
	for (let imgIndex = 0; imgIndex < imageListLength; imgIndex += 1) {
		nameIDList.push(`${nameID}${imgIndex}`);
	}
	for (let imgIndex = 0; imgIndex < imageListLength; imgIndex += 1) {
		console.log("Image index ", imgIndex); // testing
		thisNameID = nameIDList[imgIndex];
		applyFilterToImage(imgIndex, imageList, thisNameID);
	}
};

// Overall Func 2: Apply filter to one image
const applyFilterToImage = (imgIndex, imageList, nameID) => {
	// 1 getting and setting up manipulable image from the image list
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image
	// HELP: We learned how to create an image type object in Javascript.
	let thisImage = new Image(); // this is the current image from the imageList
	thisImage = imageList[imgIndex]; // copy the image from webpage

	console.log("This image is " + thisImage);

	//let oriSourceImage = new Image() // this is the source image the web page use
	//oriSourceImage.src = thisImage.src;

	// CITE: matt burns (Stack Overflow)
	// URL: https://stackoverflow.com/questions/22097747/how-to-fix-getimagedata-error-the-canvas-has-been-tainted-by-cross-origin-data
	// HELP: We learned how to circumvent error caused by cross-origin-data.
	thisImage.crossOrigin = "Anonymous";

	// Getting image's left and top coords on webpage
	// CITE: W3 Schools
	// URL:
	// HELP: We learned how to get left, top attributes (coord) of contents
	// RETURN: a DOMRect object with 8 properties: left, top, right, bottom, x, y, width, height.
	//let imagePositionAttributes = thisImage.getBoundingClientRect();
	let topCoordImage = thisImage.offsetTop;
	let leftCoordImage = thisImage.offsetLeft;

	// 2. Append canvas to html
	// CITE: W3 Schools
	// URL: https://www.w3schools.com/html/html5_canvas.asp
	// HELP: We learned about how canvas allow us to manipulate image on others' webpage.
	let canvasImg = document.createElement("canvas");
	//canvasImg.style.display = 'none'; // if only get pixel to figure our color pallete then activate this, so canvas not display
	canvasImg.id = `${nameID}`;
	canvasImg.style.position = "absolute"; // position relative to document body
	canvasImg.style.top = topCoordImage + "px";
	canvasImg.style.left = leftCoordImage + "px";
	canvasImg.style.zIndex = "1000"; // high z-index so canvas can always stay on top of original image on web page

	const parent = thisImage.parentNode; // BETA
	parent.appendChild(canvasImg); // BETA
	//document.body.append(canvasImg); // ALPHA

	// 3. Manipulate image
	// 3.1 setting up canvas
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
	// HELP: We learned how to use images on webpage on canvas.
	let thisCanvas = document.getElementById(`${nameID}`); // get access to the canvas we create
	let canvasContent = thisCanvas.getContext("2d");

	// 3.2 loading images to screen
	// Draw the image on the canvas
	// CITE: Adassko (Stack Overflow)
	// URL: https://stackoverflow.com/questions/19396390/load-image-from-javascript
	// We learned how to load image into html from Javascript.
	thisImage.onload = () => {
		if (filterName == 0) {
			console.log("filter name is :", filterName);
			RevertImageToOri();
		} else if (filterName == 1) {
			// Setting canvas dimension to that of image
			thisCanvas.width = thisImage.width;
			thisCanvas.height = thisImage.height;

			console.log("topCoordImage: ", topCoordImage); // testing
			console.log("leftCoordImage: ", leftCoordImage); // testing

			// Draw image on canvas
			// CITE: Mozilla
			// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
			// HELP: We learned how to draw images on webpage on canvas.
			// Syntax: .drawImage(image, dx, dy, dWidth, dHeight)
			canvasContent.drawImage(
				thisImage,
				0,
				0,
				thisCanvas.width,
				thisCanvas.height
			); // use original image size
			console.log("filter name is :", filterName);
			// tritan(topCoordImage, leftCoordImage, canvasContent, thisCanvas);  // BETA: assign accordingly to Jayden's four color-blind buttons (3 of them are new)
			deutan(topCoordImage, leftCoordImage, canvasContent, thisCanvas); // BETA: assign accordingly to Jayden's four color-blind buttons (3 of them are new)
			// protan(topCoordImage, leftCoordImage, canvasContent, thisCanvas);	// BETA: assign accordingly to Jayden's four color-blind buttons (3 of them are new)
			// archrom(topCoordImage, leftCoordImage, canvasContent, thisCanvas) // BETA: assign accordingly to Jayden's four color-blind buttons (3 of them are new)
		} else if (filterName == 2) {
			// Setting canvas dimension to that of image
			thisCanvas.width = thisImage.width;
			thisCanvas.height = thisImage.height;

			console.log("topCoordImage: ", topCoordImage); // testing
			console.log("leftCoordImage: ", leftCoordImage); // testing

			// Draw image on canvas
			// CITE: Mozilla
			// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
			// HELP: We learned how to draw images on webpage on canvas.
			// Syntax: .drawImage(image, dx, dy, dWidth, dHeight)
			canvasContent.drawImage(
				thisImage,
				0,
				0,
				thisCanvas.width,
				thisCanvas.height
			); // use original image size
			console.log("filter name is :", filterName);
			sliderChangeRed(
				topCoordImage,
				leftCoordImage,
				canvasContent,
				thisCanvas,
				rSliderValue
			);
		} else if (filterName == 3) {
			// Setting canvas dimension to that of image
			thisCanvas.width = thisImage.width;
			thisCanvas.height = thisImage.height;

			console.log("topCoordImage: ", topCoordImage); // testing
			console.log("leftCoordImage: ", leftCoordImage); // testing

			// Draw image on canvas
			// CITE: Mozilla
			// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
			// HELP: We learned how to draw images on webpage on canvas.
			// Syntax: .drawImage(image, dx, dy, dWidth, dHeight)
			canvasContent.drawImage(
				thisImage,
				0,
				0,
				thisCanvas.width,
				thisCanvas.height
			); // use original image size
			console.log("filter name is :", filterName);
			sliderChangeGreen(
				topCoordImage,
				leftCoordImage,
				canvasContent,
				thisCanvas,
				rSliderValue
			);
		} else if (filterName == 4) {
			// Setting canvas dimension to that of image
			thisCanvas.width = thisImage.width;
			thisCanvas.height = thisImage.height;

			console.log("topCoordImage: ", topCoordImage); // testing
			console.log("leftCoordImage: ", leftCoordImage); // testing

			// Draw image on canvas
			// CITE: Mozilla
			// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
			// HELP: We learned how to draw images on webpage on canvas.
			// Syntax: .drawImage(image, dx, dy, dWidth, dHeight)
			canvasContent.drawImage(
				thisImage,
				0,
				0,
				thisCanvas.width,
				thisCanvas.height
			); // use original image size
			console.log("filter name is :", filterName);
			sliderChangeBlue(
				topCoordImage,
				leftCoordImage,
				canvasContent,
				thisCanvas,
				rSliderValue
			);
		} else if (filterName == 5) {
			// Setting canvas dimension to that of image
			thisCanvas.width = thisImage.width;
			thisCanvas.height = thisImage.height;

			console.log("topCoordImage: ", topCoordImage); // testing
			console.log("leftCoordImage: ", leftCoordImage); // testing

			// Draw image on canvas
			// CITE: Mozilla
			// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
			// HELP: We learned how to draw images on webpage on canvas.
			// Syntax: .drawImage(image, dx, dy, dWidth, dHeight)
			canvasContent.drawImage(
				thisImage,
				0,
				0,
				thisCanvas.width,
				thisCanvas.height
			); // use original image size
			console.log("filter name is :", filterName);
			deutan(topCoordImage, leftCoordImage, canvasContent, thisCanvas); // BETA: assign accordingly to Jayden's four color-blind buttons (3 of them are new)
		} else if (filterName == 6) {
			// Setting canvas dimension to that of image
			thisCanvas.width = thisImage.width;
			thisCanvas.height = thisImage.height;

			console.log("topCoordImage: ", topCoordImage); // testing
			console.log("leftCoordImage: ", leftCoordImage); // testing

			// Draw image on canvas
			// CITE: Mozilla
			// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
			// HELP: We learned how to draw images on webpage on canvas.
			// Syntax: .drawImage(image, dx, dy, dWidth, dHeight)
			canvasContent.drawImage(
				thisImage,
				0,
				0,
				thisCanvas.width,
				thisCanvas.height
			); // use original image size
			console.log("filter name is :", filterName);
			protan(topCoordImage, leftCoordImage, canvasContent, thisCanvas); // BETA: assign accordingly to Jayden's four color-blind buttons (3 of them are new)
		} else if (filterName == 7) {
			// Setting canvas dimension to that of image
			thisCanvas.width = thisImage.width;
			thisCanvas.height = thisImage.height;

			console.log("topCoordImage: ", topCoordImage); // testing
			console.log("leftCoordImage: ", leftCoordImage); // testing

			// Draw image on canvas
			// CITE: Mozilla
			// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
			// HELP: We learned how to draw images on webpage on canvas.
			// Syntax: .drawImage(image, dx, dy, dWidth, dHeight)
			canvasContent.drawImage(
				thisImage,
				0,
				0,
				thisCanvas.width,
				thisCanvas.height
			); // use original image size
			console.log("filter name is :", filterName);
			tritan(topCoordImage, leftCoordImage, canvasContent, thisCanvas); // BETA: assign accordingly to Jayden's four color-blind buttons (3 of them are new)
		} else if (filterName == 8) {
			// Setting canvas dimension to that of image
			thisCanvas.width = thisImage.width;
			thisCanvas.height = thisImage.height;

			console.log("topCoordImage: ", topCoordImage); // testing
			console.log("leftCoordImage: ", leftCoordImage); // testing

			// Draw image on canvas
			// CITE: Mozilla
			// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
			// HELP: We learned how to draw images on webpage on canvas.
			// Syntax: .drawImage(image, dx, dy, dWidth, dHeight)
			canvasContent.drawImage(
				thisImage,
				0,
				0,
				thisCanvas.width,
				thisCanvas.height
			); // use original image size
			console.log("filter name is :", filterName);
			archrom(topCoordImage, leftCoordImage, canvasContent, thisCanvas); // BETA: assign accordingly to Jayden's four color-blind buttons (3 of them are new)
		}
	};
};

// ---------------------------------------------------------
// ---------------Image Filter Helper Functions:------------
// Func 1 invertGreen: inverted colors by inverting G values.
const invertGreen = (
	topCoordImage,
	leftCoordImage,
	canvasContent,
	thisCanvas
) => {
	console.log("invert green"); // testing
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	// HELP: We learned how to get RGBA values of pixels of images into a list.
	// Syntax: .getImageData(sx, sy, sw, sh)
	const imageInfoList = canvasContent.getImageData(
		0,
		0,
		thisCanvas.width,
		thisCanvas.height
	); // a list of R,G,B,A of all pixels on images
	const imageInfoLength = imageInfoList.data.length;
	for (let index = 0; index < imageInfoLength; index += 4) {
		// R is at [index]

		// G is at [index + 1]
		let oriGreenValue = imageInfoList.data[index + 1];
		imageInfoList.data[index + 1] = 255 - oriGreenValue; // invert color

		// B is at [index + 2]

		// A is at [index + 3]
	}
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
	// HELP: We learned how to paint altered images onto canvas.
	// Syntax: .putImageData(imageData, dx, dy)
	canvasContent.putImageData(imageInfoList, 0, 0);
};

// Func 2 invertRed: inverted colors by inverting R values.
const invertRed = (
	topCoordImage,
	leftCoordImage,
	canvasContent,
	thisCanvas
) => {
	console.log("invert red"); // testing
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	// HELP: We learned how to get RGBA values of pixels of images into a list.
	// Syntax: .getImageData(sx, sy, sw, sh)
	const imageInfoList = canvasContent.getImageData(
		0,
		0,
		thisCanvas.width,
		thisCanvas.height
	); // a list of R,G,B,A of all pixels on images
	const imageInfoLength = imageInfoList.data.length;
	for (let index = 0; index < imageInfoLength; index += 4) {
		// R is at [index]
		let oriRedValue = imageInfoList.data[index];
		imageInfoList.data[index] = 255 - oriRedValue; // invert color

		// G is at [index + 1]

		// B is at [index + 2]

		// A is at [index + 3]
	}
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
	// HELP: We learned how to paint altered images onto canvas.
	// Syntax: .putImageData(imageData, dx, dy)
	canvasContent.putImageData(imageInfoList, 0, 0);
};

// Func 3 invertBlue: inverted colors by inverting B values.
const invertBlue = (
	topCoordImage,
	leftCoordImage,
	canvasContent,
	thisCanvas
) => {
	console.log("invert blue"); // testing
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	// HELP: We learned how to get RGBA values of pixels of images into a list.
	// Syntax: .getImageData(sx, sy, sw, sh)
	const imageInfoList = canvasContent.getImageData(
		0,
		0,
		thisCanvas.width,
		thisCanvas.height
	); // a list of R,G,B,A of all pixels on images
	const imageInfoLength = imageInfoList.data.length;
	for (let index = 0; index < imageInfoLength; index += 4) {
		// R is at [index]

		// G is at [index + 1]

		// B is at [index + 2]
		let oriBlueValue = imageInfoList.data[index + 2];
		imageInfoList.data[index + 2] = 255 - oriBlueValue; // invert color

		// A is at [index + 3]
	}
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
	// HELP: We learned how to paint altered images onto canvas.
	// Syntax: .putImageData(imageData, dx, dy)
	canvasContent.putImageData(imageInfoList, 0, 0);
};

// Func 4 deleteGreen: delete G value from pixels.
const deleteGreen = (
	topCoordImage,
	leftCoordImage,
	canvasContent,
	thisCanvas
) => {
	console.log("delete green"); // testing
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	// HELP: We learned how to get RGBA values of pixels of images into a list.
	// Syntax: .getImageData(sx, sy, sw, sh)
	const imageInfoList = canvasContent.getImageData(
		0,
		0,
		thisCanvas.width,
		thisCanvas.height
	); // a list of R,G,B,A of all pixels on images
	const imageInfoLength = imageInfoList.data.length;
	const thisData = imageInfoList.data;
	for (let index = 0; index < imageInfoLength; index += 4) {
		// G is at [index + 1]
		thisData[index + 1] = 0; // delete G values
	}
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
	// HELP: We learned how to paint altered images onto canvas.
	// Syntax: .putImageData(imageData, dx, dy)
	canvasContent.putImageData(imageInfoList, 0, 0);
};

// Func 5 deleteRed: delete R value from pixels.
const deleteRed = (
	topCoordImage,
	leftCoordImage,
	canvasContent,
	thisCanvas
) => {
	console.log("delete red"); // testing
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	// HELP: We learned how to get RGBA values of pixels of images into a list.
	// Syntax: .getImageData(sx, sy, sw, sh)
	const imageInfoList = canvasContent.getImageData(
		0,
		0,
		thisCanvas.width,
		thisCanvas.height
	); // a list of R,G,B,A of all pixels on images
	const imageInfoLength = imageInfoList.data.length;
	console.log(imageInfoLength);
	for (let index = 0; index < imageInfoLength; index += 4) {
		// R is at [index]
		imageInfoList.data[index] = 0; // delete R values
	}
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
	// HELP: We learned how to paint altered images onto canvas.
	// Syntax: .putImageData(imageData, dx, dy)
	canvasContent.putImageData(imageInfoList, 0, 0);
};

// Func 6 deleteBlue: delete B value from pixels.
const deleteBlue = (
	topCoordImage,
	leftCoordImage,
	canvasContent,
	thisCanvas
) => {
	console.log("delete blue"); // testing
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	// HELP: We learned how to get RGBA values of pixels of images into a list.
	// Syntax: .getImageData(sx, sy, sw, sh)
	const imageInfoList = canvasContent.getImageData(
		0,
		0,
		thisCanvas.width,
		thisCanvas.height
	); // a list of R,G,B,A of all pixels on images
	const imageInfoLength = imageInfoList.data.length;
	const thisData = imageInfoList.data;
	for (let index = 0; index < imageInfoLength; index += 4) {
		// B is at [index + 2]
		thisData[index + 2] = 0; // delete G values
	}
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
	// HELP: We learned how to paint altered images onto canvas.
	// Syntax: .putImageData(imageData, dx, dy)
	canvasContent.putImageData(imageInfoList, 0, 0);
};

// Func 7 -- Slider Func: sliderChangeGreen: change the G value according to slider's value
// Arguments: valueG is the value from slider G
const sliderChangeGreen = (
	topCoordImage,
	leftCoordImage,
	canvasContent,
	thisCanvas,
	valueG
) => {
	console.log("Slider changed Green");
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	// HELP: We learned how to get RGBA values of pixels of images into a list.
	// Syntax: .getImageData(sx, sy, sw, sh)
	const imageInfoList = canvasContent.getImageData(
		0,
		0,
		thisCanvas.width,
		thisCanvas.height
	); // a list of R,G,B,A of all pixels on images
	const imageInfoLength = imageInfoList.data.length;
	const thisData = imageInfoList.data;
	for (let index = 0; index < imageInfoLength; index += 4) {
		// G is at [index + 1]
		thisData[index + 1] = valueG; // delete G values
	}
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
	// HELP: We learned how to paint altered images onto canvas.
	// Syntax: .putImageData(imageData, dx, dy)
	canvasContent.putImageData(imageInfoList, 0, 0);
};

// Func 8 -- Slider Func: sliderChangeRed: change the R value according to slider's value
// Arguments: valueR is the value from slider R
const sliderChangeRed = (
	topCoordImage,
	leftCoordImage,
	canvasContent,
	thisCanvas,
	valueR
) => {
	console.log("Slider changed Red");
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	// HELP: We learned how to get RGBA values of pixels of images into a list.
	// Syntax: .getImageData(sx, sy, sw, sh)
	const imageInfoList = canvasContent.getImageData(
		0,
		0,
		thisCanvas.width,
		thisCanvas.height
	); // a list of R,G,B,A of all pixels on images
	const imageInfoLength = imageInfoList.data.length;
	const thisData = imageInfoList.data;
	for (let index = 0; index < imageInfoLength; index += 4) {
		// R is at [index]
		thisData[index] = valueR; // delete G values
	}
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
	// HELP: We learned how to paint altered images onto canvas.
	// Syntax: .putImageData(imageData, dx, dy)
	canvasContent.putImageData(imageInfoList, 0, 0);
};

// Func 8 -- Slider Func: sliderChangeBlue: change the B value according to slider's value
// Arguments: valueB is the value from slider B
const sliderChangeBlue = (
	topCoordImage,
	leftCoordImage,
	canvasContent,
	thisCanvas,
	valueB
) => {
	console.log("Slider changed Red");
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData
	// HELP: We learned how to get RGBA values of pixels of images into a list.
	// Syntax: .getImageData(sx, sy, sw, sh)
	const imageInfoList = canvasContent.getImageData(
		0,
		0,
		thisCanvas.width,
		thisCanvas.height
	); // a list of R,G,B,A of all pixels on images
	const imageInfoLength = imageInfoList.data.length;
	const thisData = imageInfoList.data;
	for (let index = 0; index < imageInfoLength; index += 4) {
		// B is at [index + 2]
		thisData[index + 2] = valueB; // delete G values
	}
	// CITE: Mozilla
	// URL: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/putImageData
	// HELP: We learned how to paint altered images onto canvas.
	// Syntax: .putImageData(imageData, dx, dy)
	canvasContent.putImageData(imageInfoList, 0, 0);
};

// Func 9 -- Revert image color to original by deleting canvas
const RevertImageToOri = () => {
	const allCanvas = document.querySelectorAll("canvas");
	const listLen = allCanvas.length;
	for (let index = 0; index < listLen; index++) {
		allCanvas[index].parentNode.removeChild(allCanvas[index]);
	}
};

// function to toggle black text on white background theme
const linksList = document.getElementsByTagName("a");
let linksColorList = [];
for (var i = 0; i < linksList.length; i++) {
	if (linksList[i].href) {
		linksColorList.push(linksList[i].style.color);
	}
}
function toggleWhiteOnBlackTheme() {
	console.log("toggle white on black theme");

	if (document.body.classList.contains("whiteOnBlack")) {
		document.body.classList.remove("whiteOnBlack");
		for (var i = 0; i < linksList.length; i++) {
			if (linksList[i].href) {
				linksList[i].style.color = linksColorList[i];
			}
		}
	} else {
		document.body.classList.add("whiteOnBlack");
		for (var i = 0; i < linksList.length; i++) {
			if (linksList[i].href) {
				linksList[i].style.color = "#3cabee";
			}
		}
	}
}

// Create a mapping object
const funcMap = {
	toggleWhiteOnBlackTheme: toggleWhiteOnBlackTheme,
	loopThroughImgs: loopThroughImgs,
};

const versionButton1 = createButton1WithFunction("Invert Green");
const versionButton2 = createButton0WithFunction("Revert Images to Normal");
const whiteOnBlackTheme = createButtonWithFunction(
	"White on Black",
	toggleWhiteOnBlackTheme
);

//CITE: https://www.w3schools.com/css/css_grid.asp
//DESC: Used to learn how to create a grid layout menu.
let menu = `
	<div id="colorBlindMenu">
	<div class="choiceItem">${versionButton1}</div>
	<div class="choiceItem">${versionButton2}</div>
	<div class="choiceItem">${whiteOnBlackTheme}</div>
	<div class="choiceItem"></div>
	<div class="choiceItem"></div>
	<div class="choiceItem"></div>
	<div class="choiceItem">${createRGBSlider("Red")}</div>
	<div class="choiceItem"></div>
	<div class="choiceItem"></div>
	<div class="choiceItem">${createRGBSlider("Green")}</div>
	<div class="choiceItem"></div>
	<div class="choiceItem"></div>
	<div class="choiceItem">${createRGBSlider("Blue")}</div>
	</div>
	`;
$("body").prepend(menu);
$("body").prepend(
	`<button type="button" id="optionsButton">Color Blind Options</button>`
);

document
	.querySelector("#colorBlindMenu")
	.addEventListener("click", function (event) {
		if (event.target.matches(".versionButton")) {
			const func = event.target.getAttribute("func");
			console.log("BUTTON CLICKED");
			console.log(func);
			if (funcMap[func]) {
				console.log("YES");
				funcMap[func]();
			}
		}
	});

const revertColorBut = document.getElementById("revertColor");
const invertGreenBut = document.getElementById("invertGreen");
document.addEventListener("click", function (event) {
	if (event.target.id == "revertColor") {
		filterName = 0;
		RevertImageToOri();
	} else if (event.target.id == "invertGreen") {
		filterName = 1;
		loopThroughImgs();
	}
});

//CITE: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_rangeslider
//DESC: Used to learn how to create a slider and store its value.
const redSlider = document.getElementById("Red");
const greenSlider = document.getElementById("Green");
const blueSlider = document.getElementById("Blue");

function onSliderRChange() {
	let redValue = redSlider.value;
	let redOutput = document.getElementById("RedValue");
	redOutput.innerHTML = this.value;
	rSliderValue = this.value;
	filterName = 2;
	loopThroughImgs();
}

function onSliderGChange() {
	let greenValue = greenSlider.value;
	let greenOutput = document.getElementById("GreenValue");
	greenOutput.innerHTML = this.value;
	gSliderValue = this.value;
	filterName = 3;
	loopThroughImgs();
}

function onSliderBChange() {
	let blueValue = blueSlider.value;
	let blueOutput = document.getElementById("BlueValue");
	blueOutput.innerHTML = this.value;
	bSliderValue = this.value;
	filterName = 4;
	loopThroughImgs();
}

redSlider.addEventListener("change", onSliderRChange);
greenSlider.addEventListener("change", onSliderGChange);
blueSlider.addEventListener("change", onSliderBChange);

const colorBlindButton = document.getElementById("optionsButton");
const colorBlindMenu = document.getElementById("colorBlindMenu");
colorBlindButton.addEventListener("click", function () {
	if (colorBlindMenu.style.visibility == "hidden") {
		colorBlindMenu.style.visibility = "visible";
	} else {
		colorBlindMenu.style.visibility = "hidden";
	}
});

// ---------------------------------------------------
// Call Function
// Loop through all the images and apply filters
// loopThroughImgs();

// Toggle black text on white background theme
// toggleWhiteOnBlackTheme();
// });