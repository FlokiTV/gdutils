<script lang="ts">
	import Link from '$components/link.svelte';
	import Logo from '$components/logo.svelte';
	import IchevronLeft from '$icons/ichevronLeft.svelte';
	import JSZip from 'jszip';

	let fileInput: HTMLInputElement;
	let fileRader: FileReader;
	let divResult: HTMLElement;
	let imgResult: HTMLImageElement;

	let gridSize = 250;
	let tileSize = 16;
	let name: any;

	function onChange(event: any) {
		fileRader = new FileReader();
		divResult.innerHTML = '';
		fileRader.onload = onReaderLoad;
		if (!fileInput.files?.length) return;
		let file = fileInput.files[0];
		name = file.name.split('.');
		delete name[name.length - 1];
		name = name.filter((e: any) => e != false);
		name = name.join('.');
		fileRader.readAsDataURL(file);
	}

	function onReaderLoad(event: any) {
		let img = new Image();
		imgResult = img;
		img.src = event.target.result;
		img.onload = function () {
			let xTiles = Math.floor(img.width / tileSize);
			let yTiles = Math.floor(img.height / tileSize);
			gridSize = img.width + xTiles;
			for (let y = 0; y < yTiles; y++) {
				for (let x = 0; x < xTiles; x++) {
					let canvas = document.createElement('canvas');
					canvas.width = tileSize;
					canvas.height = tileSize;
					let ctx = canvas.getContext('2d');
					if (!ctx) return;
					ctx.drawImage(
						img,
						x * tileSize,
						y * tileSize,
						tileSize,
						tileSize,
						0,
						0,
						tileSize,
						tileSize
					);
					let tileImg = document.createElement('img');
					tileImg.src = canvas.toDataURL();
					tileImg.title = `${x}-${y}`;
					divResult.appendChild(tileImg);
				}
			}
		};
	}

	const download = () => {
		let zip = new JSZip();
		let folder = zip.folder(name) as any;
		let images = divResult.getElementsByTagName('img');
		for (let i = 0; i < images.length; i++) {
			folder.file(`${name}-${images[i].title}.png`, images[i].src.split(',')[1], { base64: true });
		}
		zip.generateAsync({ type: 'blob' }).then(function (blob) {
			let link = document.createElement('a');
			link.href = URL.createObjectURL(blob);
			link.download = `${name.split('.')[0]}.zip`;
			link.click();
		});
	};
</script>

<div class="flex w-full h-screen justify-center items-center">
	<div class="flex flex-col min-w-[250px]">
		<Logo />
		<div class="mt-4 flex items-center justify-center space-x-2">
			<div class="w-5">
				<Link href="/">
					<IchevronLeft />
				</Link>
			</div>
			<span class="uppercase">tileset slicer</span>
		</div>
		<div class="mt-4 flex">
			<span class="font-thin uppercase text-xs text-zinc-500 mb-2 block">size</span>
		</div>
		<div class="flex space-x-1">
			<input type="number" bind:value={tileSize} class="input w-14" />
			<label for="loadProject" class="btn">load tileset</label>
			<input
				type="file"
				on:change={onChange}
				on:click={() => {
					fileInput.value = '';
				}}
				class="hidden"
				bind:this={fileInput}
				id="loadProject"
				accept="image/*"
			/>
		</div>
		<div class="mt-4 overflow-auto max-w-[600px] max-h-[600px]">
			{#if name}
				<span class="font-thin uppercase text-xs text-zinc-500 mb-2 block">result</span>
			{/if}
			<div
				id="slicer-preview"
				class="flex flex-wrap"
				bind:this={divResult}
				style="width:{gridSize}px"
			>
				<!--  -->
			</div>
		</div>
		{#if name}
			<div class="mt-4">
				<span class="font-thin uppercase text-xs text-zinc-500 mb-2 block">tileset name</span>
				<input type="text" class="input w-full" bind:value={name} />
				<button class="btn mt-2" on:click={download}>save</button>
			</div>
		{/if}
	</div>
</div>
