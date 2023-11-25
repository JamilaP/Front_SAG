import React, { useState } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';

const MyOverlay = ({ target, show, placement, text }) => {
    return (
        <Overlay target={target} show={show} placement={placement}>
            {(props) => (
                <Tooltip id="custom-overlay" {...props}>
                    {text}
                </Tooltip>
            )}
        </Overlay>
    );
};

export default MyOverlay;
