<script>
	let finalFunction;
	function getMinterms() {
		if (this.value.length < 1) return (finalFunction.textContent = '');
		const minterms = this.value
			.split(',')
			.map(Number)
			.filter(Boolean)
			.map((n) => Math.floor(n));
		fetch('http://localhost:5000/api/v1/table', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ minterms })
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res.function);
				finalFunction.textContent = res.function;
			});
	}
</script>

<main
	class="flex flex-col items-center p-[10px] h-[100vh] w-full bg-gradient-to-t from-cyan-500 to-blue-500"
>
	<section class="container flex flex-col items-center  w-full h-2/3 gap-5">
		<header class="m-2 w-full h-24">
			<nav class="container flex font-semibold">
				<ul class="flex text-lg">
					<li>
						<span class="inline-flex gap-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-file-binary h-auto w-7"
								viewBox="0 0 16 16"
							>
								<path
									d="M5.526 13.09c.976 0 1.524-.79 1.524-2.205 0-1.412-.548-2.203-1.524-2.203-.978 0-1.526.79-1.526 2.203 0 1.415.548 2.206 1.526 2.206zm-.832-2.205c0-1.05.29-1.612.832-1.612.358 0 .607.247.733.721L4.7 11.137a6.749 6.749 0 0 1-.006-.252zm.832 1.614c-.36 0-.606-.246-.732-.718l1.556-1.145c.003.079.005.164.005.249 0 1.052-.29 1.614-.829 1.614zm5.329.501v-.595H9.73V8.772h-.69l-1.19.786v.688L8.986 9.5h.05v2.906h-1.18V13h3z"
								/>
								<path
									d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"
								/>
							</svg>
							Digital electronic
						</span>
					</li>
				</ul>
				<ul class="ml-auto ">
					<li>
						<span class="inline-flex gap-1">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
								><path
									d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
								/></svg
							>
							Github
						</span>
					</li>
				</ul>
			</nav>
		</header>
		<h1 class="text-4xl font-bold  font-['Lato',sans-serif] my-4">McCluskey algorithm</h1>
		<input
			class="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-72 font-['Fira_Code',monospace]"
			on:keyup={getMinterms}
			type="text"
			placeholder="Enter minterms"
		/>
		<!-- svelte-ignore a11y-missing-content -->
		<h3 bind:this={finalFunction} class="text-3xl font-bold text-center mt-10" />
	</section>
</main>

<style>
	:global(body) {
		margin: 0;
		font-family: 'Titillium Web', sans-serif;
	}
</style>
