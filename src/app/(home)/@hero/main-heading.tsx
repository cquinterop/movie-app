const MainHeading = () => {
	return (
		<div className="mx-auto flex max-w-screen-lg flex-col gap-6 text-center">
			<h1 className="text-3xl font-extrabold lg:text-6xl">
				Find your <span className="bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent">favorite</span> movies
			</h1>
			<p className="text-muted-foreground text-balance lg:text-lg">Or discover you next favorite one!</p>
		</div>
	);
};

export default MainHeading;
