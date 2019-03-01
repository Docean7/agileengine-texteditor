import React from 'react';
import cn from "classnames";

import './ControlPanel.scss';

let id = 0;

function ControlPanel (props) {
    const activeTabs = props.getActiveTabs();
    const { onTabClick, onGetSynonyms, synonyms, onChangeToSynonym } = props;
    return (
        <div id="control-panel">
            <div id="format-actions">
                <button className={cn('format-action', { active: activeTabs.bold })} type="button" onClick={() => onTabClick('bold')}><b>B</b></button>
                <button className={cn('format-action', { active: activeTabs.italic })} type="button" onClick={() => onTabClick('italic')}><i>I</i></button>
                <button className={cn('format-action', { active: activeTabs.underline })} type="button" onClick={() => onTabClick('underline')}><u>U</u></button>
                <button onClick={onGetSynonyms}>Get Synonyms</button>
                {
                    synonyms &&
                    <div className={'synonyms'}>
                        <b>Synonyms:</b> {synonyms.length ? synonyms.map(({word}) => <span key={id++} onClick={() => onChangeToSynonym(word)}>{word}</span>) : 'No results'}
                    </div>
                }

            </div>
        </div>
    );
}

export default ControlPanel;
