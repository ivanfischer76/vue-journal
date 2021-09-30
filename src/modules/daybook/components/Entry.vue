<template>
	<div 
		class="entry-container mb-3 pointer p-2"
		@click="$router.push({ name: 'entry', params: { id: entry.id } })"
	>
		<!-- Titulo -->
		<div class="entry-title d-flex">
			<span class="mx-1 fs-5">{{ dayString }},</span>
			<span class="text-success fs-5 fw-bold">{{ day }}</span>
			<span class="mx-1  fs-5"> de {{ month }} de</span>
			<span class="mx-1 fs-5">{{ year }}</span>
		</div>
		<div class="entry-description">
			{{ shortText }}
		</div>
	</div>
</template>

<script>
import getDayMonthYear from '../helpers/getDayMonthYear'

export default {
	props: {
		entry: {
			type: Object,
			required: true,
		}
	},
	computed: {
		shortText(){
			return (this.entry.text.length > 130)
				? this.entry.text.substring(0, 130) + '...'
				: this.entry.text
		},
		dayString() {
			const { dayString } = getDayMonthYear(this.entry.date)
			return dayString
		},
		day() {
			const { day } = getDayMonthYear(this.entry.date)
			return day
		},
		month() {
			const { month } = getDayMonthYear(this.entry.date)
			return month
		},
		year() {
			const { year } = getDayMonthYear(this.entry.date)
			return year
		}
	},
	methods: {
		getDay(){
			let day = this.entry.date.toLocaleString('es-ar', {weekday: 'long'})
			return day.charAt(0).toUpperCase() + day.substr(1).toLowerCase()
		}
	}
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