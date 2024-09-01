class Script {
    constructor() {
        this.bc = new window.BroadcastChannel("BBBUserscriptManager");
        this.listener();
    }

    listener() {
        this.bc.onmessage = (event) => {
            console.log("Message received", event.data);
            const { type, script, data } = event.data;
            console.log("Message received", type, script, data);
            
            if (script !== "all") {
                if (script.namespace !== info().namespace) return;
                if (script.name !== info().name) return;
            }
            
            switch (type) {
                case "requestUserscriptDetails":
                    console.log("Request for userscript details received");
                    this.sendInfo();
                    break;
                default:
                    break;
            }
        };
    }

    sendInfo() {
        const msg = buildMsg("userscriptDetails", info());
        this.bc.postMessage(msg);
    }

    close() {
        this.bc.close();
    }
}


class Manager {
    constructor() {
        this.bc = new window.BroadcastChannel("BBBUserscriptManager");
        this.listener();
    }


    fetchInstalledUserscripts() {
        return new Promise((resolve) => {
            const userscripts = [];
    
            this.bc.onmessage = (event) => {
                if (event.data && event.data.type === 'userscriptDetails') {
                    console.log("Received userscript details");
                    userscripts.push(event.data.data);
                }
            };

            const msg = this.buildMsgManager("requestUserscriptDetails", "all", "all");
            console.log("Requesting userscript details", msg);
            this.bc.postMessage(msg);
    
            setTimeout(() => {
                // this.bc.removeEventListener('message', listener);
                resolve(userscripts);
            }, 1000);
        });
    }


    listener () {
        this.bc.onmessage = (event) => {
            console.log(event.data);
        };
    }


    buildMsgManager (type, data, target) {
        if (target === undefined) { target = "all" }
        return { type, script: target, data };
    }

    close() {
        this.bc.close();
    }
}


function buildMsg(type, data) {
    let scriptID = { name: info().name, namespace: info().namespace };
    return { type, script: scriptID, data };
}

function info() {
    const GMinfo = GM_info ?? GM?.info ?? (() => {});  // Get GM_info from either GM.info or GM_info or return an empty object
    const ScriptInfo  = {
        name: GMinfo?.script?.name || undefined,
        namespace: GMinfo?.script?.namespace || undefined,
        description: GMinfo?.script?.description || undefined,
        version: GMinfo?.script?.version || undefined,
        permissions: GMinfo?.script?.grant || undefined,
        run_at: GMinfo?.script?.runAt || GMinfo?.script?.options?.run_at || undefined,
        scriptWillUpdate: GMinfo?.scriptWillUpdate || GMinfo?.script?.options?.check_for_updates || undefined,
    };

    return ScriptInfo;
}