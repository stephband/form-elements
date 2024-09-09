DEBUG=

# Tell make to ignore existing folders and allow overwriting existing files
.PHONY: literal number-control select-control range-input rotary-input xy-input y-input modules

# Must format with tabs not spaces
literal:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run --unstable --no-check literal/deno/make-literal.js ./ debug

number-control:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./number-control/build/ ./number-control/module.js ./number-control/module.css ./number-control/shadow.css

select-control:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./select-control/build/ ./select-control/module.js ./select-control/module.css ./select-control/shadow.css

range-input:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./range-input/build/ ./range-input/module.js ./range-input/module.css ./range-input/shadow.css

rotary-input:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./rotary-input/build/ ./rotary-input/module.js ./rotary-input/module.css ./rotary-input/shadow.css

xy-input:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./xy-input/build/ ./xy-input/module.js ./xy-input/module.css ./xy-input/shadow.css

y-input:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./y-input/build/ ./y-input/module.js ./y-input/module.css ./y-input/shadow.css

modules:
	make number-control
	make select-control
	make range-input
	make rotary-input
	make xy-input
	make y-input
