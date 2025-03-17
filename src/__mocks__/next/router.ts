const useRouter = jest.fn().mockReturnValue({
	push: jest.fn(),
	replace: jest.fn(),
	pathname: '/',
	query: {},
	asPath: '/',
});

export { useRouter };
