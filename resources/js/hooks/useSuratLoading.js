import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

let _loading = false;
const _cbs = new Set();

function broadcast(val) {
    _loading = val;
    _cbs.forEach((fn) => fn(val));
}

export function useSuratLoading() {
    const [loading, setLoading] = useState(_loading);

    useEffect(() => {
        _cbs.add(setLoading);
        return () => _cbs.delete(setLoading);
    }, []);

    useEffect(() => {
        const start = () => broadcast(true);
        const finish = () => broadcast(false);
        const unsubStart = router.on('start', start);
        const unsubFinish = router.on('finish', finish);
        return () => {
            unsubStart();
            unsubFinish();
        };
    }, []);

    return loading;
}
