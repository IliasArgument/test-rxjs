import React, {
    useEffect,
    useState,
    useCallback,
    useMemo
} from 'react';
import { Observable, Subject } from 'rxjs';
import {
    map,
    buffer,
    debounceTime,
    filter,
    takeUntil,
} from 'rxjs/operators';

import DisplayComponent from '../Display';

const ControlComponent = () => {

    const [state, setState] = useState('stop');
    const [time, setTime] = useState(0);

    const stop$ = useMemo(() => new Subject(), []);
    const click$ = useMemo(() => new Subject(), []);

    const start = useCallback(() => {
        setState('start');
    }, []);

    const stop = useCallback(() => {
        setTime(0);
        setState('stop');
    }, [])

    const reset = useCallback(() => {
        setTime(0);
        setState('start');
    }, [])

    const wait = useCallback(() => {
        click$.next();
        setState('wait');
        click$.next();
    }, [click$])

    useEffect(() => {
        const doubleClick$ = click$.pipe(
            buffer(click$.pipe(debounceTime(300))),
            map((list) => list.length),
            filter((value) => value >= 2),
        );
        const timer$ = new Observable((observer) => {
            let count = 0;
            const intervalId = setInterval(() => {
                observer.next(count += 1);
            }, 1000);

            return () => {
                clearInterval(intervalId);
            };
        });

        const subscribtion$ = timer$
            .pipe(takeUntil(doubleClick$))
            .pipe(takeUntil(stop$))
            .subscribe({
                next: () => {
                    if (state === 'start') {
                        setTime((prev) => prev + 1);
                    }
                },
            });
        return (() => {
            subscribtion$.unsubscribe();
        });
    }, [state, click$, stop$]);
    return (
        <section className="stopwatch">
            <DisplayComponent
                time={time}
                start={start}
                stop={stop}
                reset={reset}
                wait={wait}
            />
        </section>
    );
};
export default ControlComponent;
