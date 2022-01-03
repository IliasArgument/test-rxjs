import React from 'react';
import setTimeFormat from '../../utils';
import ButtonsGroup from '../ButtonsGroup';

const DisplayComponent = ({
    time,
    start,
    stop,
    reset,
    wait,
}) => (
    <>
        <header className="header">
            <h1 className="stopwatch headline">
                stopwatch
            </h1>
            <h2 className="stopwatch indicator">
                {setTimeFormat(time)}
            </h2>
        </header>
        <section className="main">
            <div className="container">
                <ButtonsGroup
                    start={start}
                    stop={stop}
                    reset={reset}
                    wait={wait}
                />
            </div>
        </section>
    </>
);

export default DisplayComponent;

