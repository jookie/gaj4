    // ......................................................
    // ......................Handling CanvasRenderingContext2D/drawImage................
    // ......................................................
    // drawImage(image, dx, dy)
    // drawImage(image, dx, dy, dWidth, dHeight)
    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    const canvas = document.getElementById('canvasOutput');
    const ctx = canvas.getContext('2d');

    const image = new Image(60, 45); // Using optional size for image
    image.onload = drawImageActualSize2; // Draw when image has loaded

    // Load an image of intrinsic size 300x227 in CSS pixels
    image.src = "../imgs/download.png";

    function drawImageActualSize() {
        // Use the intrinsic size of image in CSS pixels for the canvas element
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;

        // Will draw the image as 300x227, ignoring the custom size of 60x45
        // given in the constructor
        ctx.drawImage(this, 0, 0);

        // To use the custom size we'll have to specify the scale parameters
        // using the element's width and height properties - lets draw one
        // on top in the corner:
        ctx.drawImage(this, 0, 0, this.width, this.height);
    }

    function drawImageActualSize2() {
        // Use the intrinsic size of image in CSS pixels for the canvas element
        canvas.width = this.naturalWidth;
        canvas.height = this.naturalHeight;

        // Will draw the image as 300x227, ignoring the custom size of 60x45
        // given in the constructor
        ctx.drawImage(this, 0, 0);

        // To use the custom size we'll have to specify the scale parameters
        // using the element's width and height properties - lets draw one
        // on top in the corner:
        // ctx.drawImage(this, 0, 0, this.width, this.height);
    }