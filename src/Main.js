var md = window.markdownit();

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
		for (const i of el) {
			if (!i.dataset.formatted) {
				setTimeout(() => {
					var result = md.render(i.innerText);

					i.style.width = "100%";
					i.dataset.formatted = true;
					i.innerHTML = result;
					i.classList.add("markdown-body");

					i.querySelectorAll("p").forEach((p) => {
						p.style.margin = "0";
						// create a new span element and replace the p
						// const newSpan = document.createElement('span');
						// newSpan.innerHTML = p.innerHTML;
						// p.parentNode.replaceChild(newSpan, p);
						//
						p.style.display = "inline-block";

						// reset style of p
					});
				}, 1000);
			}
		}
	});
}, 1000);

