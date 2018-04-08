/**
 * Created by ycj on 2017/4/6.
 */
import React from 'react';

import LogMonitor from "redux-devtools-log-monitor";
import {createDevTools} from "redux-devtools";
import DockMonitor from "redux-devtools-dock-monitor";

export const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible={true}>
        <LogMonitor theme='tomorrow'/>
    </DockMonitor>
);
