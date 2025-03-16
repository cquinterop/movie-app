'use client';

import { scan } from 'react-scan';
import { useEffect } from 'react';

const ReactScan = () => {
	useEffect(() => {
		scan({
			enabled: process.env.NODE_ENV !== 'production',
		});
	}, []);

	return <></>;
};

export default ReactScan;
