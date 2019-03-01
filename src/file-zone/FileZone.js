import React from 'react';
import cn from "classnames";

import { getMemoizedKeys } from "../helpers"

import './FileZone.scss';

function FileZone (props) {
    const { tokenMap, activeTokenId, onWordClick } = props;
    return (
        <div id="file-zone">
            <div id="file">
                {
                    getMemoizedKeys(tokenMap).map(id => {
                        const { text, style } = tokenMap[id];
                        return (
                            <span key={id}
                                  className={cn('word', style, { selected: activeTokenId === id })}
                                  onClick={() => onWordClick(id)}>
                                {text}
                            </span>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default FileZone;
