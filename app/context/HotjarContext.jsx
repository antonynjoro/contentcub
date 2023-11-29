import { useEffect } from 'react';
import Hotjar from '@hotjar/browser';

const HotjarContext = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Hotjar only on the client side
            const siteId = 3759149; // Your site ID
            const hotjarVersion = 6; // Hotjar version
            Hotjar.init(siteId, hotjarVersion);
        }
    }, []);

    return null; // Since we don't need to render anything
};

export default HotjarContext;
