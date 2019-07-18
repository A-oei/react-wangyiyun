import React from 'react';
import './warningLayer.scss';

function WarningLayer(params) {
    if (params.status) {
        return (
            <div className={'warning-layer ' + params.type}>
                {params.content}
            </div>
        )
    }
    else {
        return null;
    }
}

export default WarningLayer;
