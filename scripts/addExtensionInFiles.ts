function addExtensionInFiles(path: string, target?: string): void {
	let file = Deno.readTextFileSync(path);

	const lookup = "from './"
	if (!file.includes(lookup)) return;

	const lines = file.split("\n");

	for (const line of lines) {
		let l = line;

		if (line.includes(lookup) && !line.endsWith(".d.ts';")) {
			l = l.replace("';", ".d.ts';")
		}

		if (
			line.startsWith("import ")
			&& !line.startsWith("import * ")
			&& !line.startsWith("import type ")
		) {
			l = l.replace("import ", "import type ");
		}

		if (
			line.startsWith("export ")
			&& !line.startsWith("export * ")
			&& !line.startsWith("export type ")
			&& !line.startsWith("export interface ")
		) {
			l = l.replace("export ", "export type ");
		}

		file = file.replace(line, l);
	}

	Deno.writeTextFileSync(target ?? path, file);
}

// index.d.ts
addExtensionInFiles("./index.d.ts", "./mod.ts");
// addExtensionInFiles("./index.d.ts");

const src = Deno.readDirSync("./source");
for (const srcFile of src) {
	if (srcFile.isFile) {
		const path = `./source/${srcFile.name}`;
		addExtensionInFiles(path);
	}
}
