import React, {Component} from 'react';
import update from "immutability-helper";

import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import getMockText from './text.service';
import { getSynonyms } from "./helpers"

import './App.css';

let idCreator = 0;

const getTokenMap = content => content.split(' ').reduce((acc, cur) => {
    const id = idCreator++;
    acc[id] = {
        text: cur,
        style: {
            bold: false,
            italic: false,
            underline: false
        }
    };
    return acc;
}, {});

class App extends Component {
    state = {
        activeTokenId: null,
        tokenMap: {},
        activeSynonyms: null
    };

    async componentDidMount() {
        const content = await getMockText();
        this.setState({ tokenMap: getTokenMap(content) })
    }

    handleClickOnWord = tokenId => {
        this.setState(state => ({ activeTokenId: tokenId === state.activeTokenId ? null : tokenId, activeSynonyms: null }));
    };

    handleTabClick = tab => {
        if (this.state.activeTokenId) {
            this.setState(state => ({
                tokenMap: update(state.tokenMap, {
                    [state.activeTokenId]: { style: { [tab]: { $set: !state.tokenMap[state.activeTokenId].style[tab] } }  }
                })
            }))
        }
    };

    getActiveTabs = () => {
        const { tokenMap, activeTokenId } = this.state;
        return activeTokenId ? tokenMap[activeTokenId].style : {};
    };

    handleGetSynonyms = async () => {
        const { tokenMap, activeTokenId } = this.state;
        if (activeTokenId) {
            const synonyms  = await getSynonyms(tokenMap[activeTokenId].text);
            this.setState({ activeSynonyms: synonyms })
        }
    };

    handleChangeToSynonym = (word) => {
        const { tokenMap, activeTokenId } = this.state;
        if (activeTokenId) {
            let replacedWord = tokenMap[activeTokenId].text.replace(/[A-Za-z-]*/, word);
            this.setState({ tokenMap: update(tokenMap, {
                    [activeTokenId]: { text : { $set: replacedWord } }
                })
            })
        }
    };

    render() {
        const { tokenMap, activeTokenId } = this.state;
        return (
            <div className="App">
                <header>
                    <span>Simple Text Editor</span>
                </header>
                <main>
                    <ControlPanel onTabClick={this.handleTabClick}
                                  getActiveTabs={this.getActiveTabs}
                                  onGetSynonyms={this.handleGetSynonyms}
                                  synonyms={this.state.activeSynonyms}
                                  onChangeToSynonym={this.handleChangeToSynonym}
                    />
                    <FileZone tokenMap={tokenMap}
                              activeTokenId={activeTokenId}
                              onWordClick={this.handleClickOnWord}
                    />
                </main>
            </div>
        );
    }
}

export default App;
