var md = window.markdownit();
//var hljs = window.hljs;

//window.hljs.initHighlighting();

const checkElement = async (selector) => {
	//console.log(`Checking if element ${selector} exists`);
	while (document.querySelector(selector) === null) {
		await new Promise((resolve) => requestAnimationFrame(resolve));
	}

	const arr = document.querySelectorAll('[data-testid="message-container"]');
	return Array.from(arr)
		.map((item) => item.querySelectorAll('[dir="auto"]'))
		.filter((i) => i.length)
		.map((e) => e[0]);
};

setInterval(() => {
	// Selector to check if first child was rendered
	const selector = `[data-testid=\"message-container\"] > div:first-child`;

	checkElement(selector).then((el) => {
		console.log(el);
		//el.innerHTML = "<p>Hello World!</p>";
		//
		for (const i of el) {
			console.log(i.dataset.formatted);
			if (!i.dataset.formatted) {
				setTimeout(() => {
					var result = md.render(i.innerText);

					i.style.width = "100%";
					i.dataset.formatted = true;
					i.innerHTML = result;
					i.classList.add('markdown-body');
					
					
					//i.querySelectorAll("img").forEach((img) => {
						//img.style.maxWidth = "50%";
					//});

					i.querySelectorAll("p").forEach((p) => {
						p.style.margin = "0";
					});

					// i.querySelectorAll("pre").forEach((pre) => {
					// 	pre.innerHTML = hljs.highlightAuto(pre.querySelector("code").innerText).value
					// });

					// hljs.initHighlighting();
				}, 2000);
			}
		}
	});

	
}, 5000);

setTimeout(() => {
	// append style
	const style = document.createElement("style");
	style.innerHTML = `
	h1 {
	font-size: 2em!important;
	}
`;
	document.body.appendChild(style);
}, 2000);

// inject cdn script at the bottom of body
// setTimeout(() => {
// 	const script1 = document.createElement("script");
// 	script1.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js";
// 	script1.onload = () => {
// 		console.log("highlight.js loaded");
// 	};
// 	document.body.appendChild(script1);

// 	// inject style sheet
// 	const style2 = document.createElement("link");
// 	style2.rel = "stylesheet";
// 	style2.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/default.min.css";
// 	document.body.appendChild(style2);

// }, 2000);
