DEBUG=

# Tell make to ignore existing folders and allow overwriting existing files
.PHONY: literal docs xy-input modules

# Must format with tabs not spaces
literal:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run --unstable --no-check ../literal/deno/make-literal.js ./ debug

docs:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js docs/docs.js ./docs/module.js
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js docs/docs.css ./docs/module.css
	make literal

range-input:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./range-input.js ./range-input/module.js
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./range-input.css ./range-input/module.css
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./range-input-shadow.css ./range-input/shadow.css

rotary-input:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./rotary-input.js ./rotary-input/module.js
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./rotary-input.css ./rotary-input/module.css
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./rotary-input-shadow.css ./rotary-input/shadow.css

xy-input:
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./xy-input.js ./xy-input/module.js
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./xy-input.css ./xy-input/module.css
	deno run --allow-read --allow-env --allow-net --allow-write --allow-run ../fn/deno/make-modules.js ./xy-input-shadow.css ./xy-input/shadow.css

modules:
	make xy-input
