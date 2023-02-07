<script lang="ts">
    export let href:string
</script>
<a {href} class="border font-thin block text-center border-zinc-700 relative w-full hover:cursor-pointer hover:bg-white hover:bg-opacity-20 transition-all">
    <slot />
</a>