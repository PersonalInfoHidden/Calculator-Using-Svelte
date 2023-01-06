<script lang="ts">
	import { to_number } from 'svelte/internal';
	import Calculator from './calculator';

	let calc = new Calculator();
	const inputs = [
		['CE', 'C', 'DEL', '='],
		['1', '2', '3', '/'],
		['4', '5', '6', '*'],
		['7', '8', '9', '-'],
		['+/-', '0', '.', '+']
	];
	const inputMethod = (post: string) => {
		if (Number(post) % 1 === 0) {
			calc.addNumber(post);
			calc = calc;
		}
		if (post === '+' || post === '-' || post === '*' || post === '/') {
			calc.addOpparation(post);
			calc = calc;
		}
		if (post === '=') {
			calc.equals();
			calc = calc;
		}
		if (post === 'CE' || post === 'C' || post === 'DEL') {
			calc.manipulateOutput(post);
			calc = calc;
		}
		if (post === '+/-') {
			calc.plusMinus();
			calc = calc;
		}
		if (post === '.') {
			calc.addDecimal();
			calc = calc;
		}
	};
</script>

<svelte:head>
	<title>Calculator</title>
	<meta name="description" content="A fkn calculator" />
</svelte:head>

<div class="container">
	<div class="calculator">
		<div class="outputs">
			{#if calc.expandedOut}
				<h3>{calc.expandedOut}</h3>
			{/if}
			<h2>{calc.simpleOut === '69' ? '🤭' : calc.simpleOut}</h2>
		</div>
		<div class="inputs">
			{#each inputs as column}
				<section>
					{#each column as val}
						<button
							style={Number(val) || val === '0' || val === '.' || val === '+/-'
								? 'background-color:var(--color-bg-2);'
								: ''}
							on:click={() => inputMethod(val)}>{val}</button
						>
					{/each}
				</section>
			{/each}
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 800px;
	}

	.calculator {
		display: grid;
		grid-template-rows: minmax(0, 1fr) minmax(0, 2fr);
		height: 720px;
		width: 90%;
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		background: var(--color-theme-2);
		padding: 2rem;
		/* border: solid var(--color-theme-1) 0.5rem; */
		border-radius: 3rem;
	}

	.outputs {
		background-color: rgba(255, 255, 255, 0.5);
		color: rgba(0, 0, 0, 0.7);
		border-radius: 3rem;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		flex-direction: column;
		padding: 2rem;
		font-size: larger;
	}

	.outputs h2 {
		font-size: larger;
		padding-right: 3rem;
		margin: 0;
	}
	.outputs h3 {
		font-size: smaller;
		padding: 1rem;
		padding-bottom: 1rem;
		margin: 0;
	}

	.inputs {
		display: grid;
		gap: 1rem;
		background: none;
		margin: 1rem;
	}

	.inputs section {
		gap: 1rem;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		grid-auto-rows: minmax(0, 1fr);
	}

	.inputs button {
		background-color: var(--color-bg-1);
		border: solid 0.25rem;
		border-color: rgba(0, 0, 0, 0);
		color: rgba(0, 0, 0, 0.7);
		border-radius: 4px;
		transition: all 0.2s ease-in-out;
	}
	.inputs button:hover,
	.inputs button:focus {
		border-color: #ff3e00;
		filter: drop-shadow(0 0.25rem 0.25rem #ff3e00);
		transform: scale(1.025);
	}
</style>
