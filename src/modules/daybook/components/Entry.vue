<template>
	<div 
		class="entry-container mb-3 pointer p-2"
		@click="$router.push({ name: 'entry', params: { id: 10 } })"
	>
		<!-- Titulo -->
		<div class="entry-title d-flex">
			<span class="text-success fs-5 f-bold">15</span>
			<span class="mx-1 fs-5">julio</span>
			<span class="mx-2 fw-light">2021, jueves</span>
		</div>
		<div class="entry-description">
			Non ullamco sunt fugiat duis deserunt tempor minim. Aliqua duis quis excepteur sit laborum ea ipsum Lorem duis magna ea. Ex voluptate adipisicing enim ea ipsum ex qui. Eiusmod incididunt et sit laborum amet non minim irure magna occaecat veniam commodo enim exercitation. Reprehenderit consequat enim consequat culpa irure laboris fugiat id pariatur laboris tempor. Aliqua et sit commodo laborum culpa anim consectetur anim ex reprehenderit. Ad sunt velit cupidatat ea officia commodo veniam sit sit sunt irure officia nisi.
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
	.entry-container {
		border-bottom: 1px solid #2c3e50;
		transition: 0.2s all ease-in;

		&:hover {
			background-color: lighten($color: grey, $amount: 45);
			transition: 0.2s all ease-in;
		}

		.entry-description {
			font-size: 12px;
		}
	}
</style>