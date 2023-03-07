import * as React from "react"

export interface TabViewProps {
    selectedId: string  | null
    tabStateArray: TabState[]
    tabFunctions: TabFunctions
}

export interface TabState {
    id: string
    label: string
    status: string
    //iconSrc: string
    getTabElement: (tabState: TabState, isShowing: boolean) => React.ReactNode
}

export interface TabFunctions {
    selectTab: (tabId: string) => void
    closeTab: (tabId: string) => void
}


export interface TabFrameProps {
    tabState: TabState
    showing: boolean
}

export interface TabTabProps {
    tabState: TabState
    isSelected: boolean
    tabFunctions: TabFunctions
}


export function TabView({tabStateArray,selectedId,tabFunctions}: TabViewProps) {

    return (
        <div className="tabView">
            <div className="tabView_head">
                {tabStateArray.map(tabState => {
                    return <TabTab 
                        key={tabState.id} 
                        tabState={tabState}
                        isSelected={selectedId == tabState.id}
                        tabFunctions={tabFunctions}
                    />
                })}
            </div>
            <div className="tabView_body">
                {tabStateArray.map(tabState => {
                    return <TabFrame
                        key={tabState.id} 
                        tabState={tabState}
                        showing={selectedId == tabState.id}
                    />
                })}
            </div>
        </div>
    )
}

/** The argument tabObject is the component or other workspace object that is displayed in the tab. */
function TabTab({tabState, isSelected, tabFunctions}: TabTabProps) {
    function closeClicked(event: React.FormEvent) {
        tabFunctions.closeTab(tabState.id)
        event.stopPropagation() //prevent click from going to tab
    }

    function tabClicked(event: React.FormEvent) {
        tabFunctions.selectTab(tabState.id)
        event.stopPropagation()
    }

    let className = "tabView_tab " + (isSelected ? "tabView_selected" : "tabView_deselected")
    //let closeImage = apogeeui.uiutil.getResourcePath("/close_gray.png","ui-lib");

    return (
        <div onClick={tabClicked} className={className}>
            {/*<img src={tabState.iconSrc}/>*/}
            <span>{tabState.label}</span>
            {/*<input type="image" onClick={closeClicked} src={closeImage}/>*/}  
            <button onClick={closeClicked}>Close</button>  
        </div>
    )
}

function TabFrame({tabState, showing}: TabFrameProps) {
    return (
        <div style={{display: showing ? '' : "none"}} className="tabView_frame">
            {tabState.getTabElement(tabState,showing)}
        </div>
    )
}