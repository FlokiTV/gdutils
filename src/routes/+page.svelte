<script lang="ts">
	import Logo from '$components/logo.svelte';
	import IImage from '$icons/iImage.svelte';
	import type { Properties } from '$lib/GD.types';
	import GD from '$lib/GDExplorer';

	let result = {} as any;
	let settings: Properties;
	let resources:any;
	function onChange(event: any) {
		let reader = new FileReader();
		reader.onload = onReaderLoad;
		reader.readAsText(event.target.files[0]);
	}

	function onReaderLoad(event: any) {
		GD.readGameFile(event.target.result).then((res) => {
			result = res;
			settings = GD.getProperties()
			resources = GD.getData().resources.resources
		});
	}
</script>

<div class="flex w-full h-screen justify-center items-center">
	<div class="flex flex-col min-w-[250px]">
		<Logo />
		<div class="mt-4">
			<label
				for="loadProject"
				class="border border-zinc-700 w-full block text-center hover:cursor-pointer hover:bg-white hover:bg-opacity-20 transition-all"
				>load project</label
			>
			<input
				type="file"
				on:change={onChange}
				class="hidden"
				id="loadProject"
				accept="application/JSON"
			/>
		</div>
		{#if result.success}
			<div class="mt-4 min-w-[250px]">
				<span class="font-thin uppercase text-xs text-zinc-500">project info</span>
				<div class="flex">
					<span class="text-lg font-thin w-[100px]">name</span>
					{settings.name}
				</div>
				<div class="flex">
					<span class="text-lg font-thin w-[100px]">package</span>
					{settings.packageName}
				</div>
				<div class="flex">
					<span class="text-lg font-thin w-[100px]">version</span>
					{settings.version}
				</div>
				<div class="flex">
					<span class="text-lg font-thin w-[100px]">folder</span>
					{settings.folderProject}
				</div>
				<div class="flex">
					<span class="text-lg font-thin w-[100px]">resources</span>
					{resources.length}
				</div>
			</div>
			<div class="mt-4">
				<span class="font-thin uppercase text-xs text-zinc-500 mb-2 block">tools</span>
				<a
					href="/slicer"
					class="border font-thin block text-center border-zinc-700 relative w-full hover:cursor-pointer hover:bg-white hover:bg-opacity-20 transition-all"
				>
					<div class="w-4 absolute left-2 top-0 bottom-0 flex items-center justify-center">
						<IImage />
					</div>
					<span>tileset slicer</span>
				</a>
			</div>
		{/if}
	</div>
</div>
