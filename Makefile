DEBUG=

# Tell make to ignore existing folders and allow overwriting existing files
.PHONY: literal number-control select-control range-input rotary-input xy-input y-input modules

# Must format with tabs not spaces
literal:
	deno run --allow-read --allow-write --allow-net --allow-env --allow-run --no-lock --reload ../literal/deno/make-literal.js ./ debug

number-control:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./number-control/build/ ./number-control/element.js ./number-control/element.css ./number-control/shadow.css

select-control:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./select-control/build/ ./select-control/element.js ./select-control/element.css ./select-control/shadow.css

range-input:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./range-input/build/ ./range-input/element.js ./range-input/element.css ./range-input/shadow.css

rotary-input:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./rotary-input/build/ ./rotary-input/element.js ./rotary-input/element.css ./rotary-input/shadow.css

xy-input:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./xy-input/build/ ./xy-input/element.js ./xy-input/element.css ./xy-input/shadow.css

y-input:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./y-input/build/ ./y-input/element.js ./y-input/element.css ./y-input/shadow.css

modules:
	make number-control
	make select-control
	make range-input
	make rotary-input
	make xy-input
	make y-input
