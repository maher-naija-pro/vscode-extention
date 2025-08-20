import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Outscale Agent extension is now active!');

    // Register the open view command
    let openViewDisposable = vscode.commands.registerCommand('outscale-agent.openView', () => {
        OutscaleAgentPanel.createOrShow(context.extensionUri);
    });

    // Register the create agent command
    let createAgentDisposable = vscode.commands.registerCommand('outscale-agent.createAgent', () => {
        vscode.window.showInformationMessage('Create New Agent functionality coming soon!');
    });

    // Register the search agents command
    let searchAgentsDisposable = vscode.commands.registerCommand('outscale-agent.searchAgents', () => {
        vscode.window.showInformationMessage('Search Agents functionality coming soon!');
    });

    context.subscriptions.push(openViewDisposable, createAgentDisposable, searchAgentsDisposable);
}

export function deactivate() { }

class OutscaleAgentPanel {
    public static currentPanel: OutscaleAgentPanel | undefined;
    public static readonly viewType = 'outscale-agent-view';

    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionUri: vscode.Uri;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(extensionUri: vscode.Uri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        // If we already have a panel, show it.
        if (OutscaleAgentPanel.currentPanel) {
            OutscaleAgentPanel.currentPanel._panel.reveal(column);
            return;
        }

        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(
            OutscaleAgentPanel.viewType,
            'Outscale Agent',
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [extensionUri]
            }
        );

        OutscaleAgentPanel.currentPanel = new OutscaleAgentPanel(panel, extensionUri);
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;
        this._extensionUri = extensionUri;

        // Set the webview's initial html content
        this._update();

        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programmatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // Update the content based on view changes
        this._panel.onDidChangeViewState(
            () => {
                if (this._panel.visible) {
                    this._update();
                }
            },
            null,
            this._disposables
        );

        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'createAgent':
                        vscode.commands.executeCommand('outscale-agent.createAgent');
                        return;
                    case 'searchAgents':
                        vscode.commands.executeCommand('outscale-agent.searchAgents');
                        return;
                }
            },
            null,
            this._disposables
        );
    }

    public dispose() {
        OutscaleAgentPanel.currentPanel = undefined;

        // Clean up our resources
        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private _update() {
        this._panel.title = 'Outscale Agent';
        this._panel.webview.html = this._getHtmlForWebview();
    }

    private _getHtmlForWebview() {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Outscale Agent</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            background-color: var(--vscode-editor-background);
            color: var(--vscode-editor-foreground);
            margin: 0;
            padding: 20px;
            height: 100vh;
            overflow: hidden;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 1px solid var(--vscode-panel-border);
        }
        
        .title {
            font-size: 24px;
            font-weight: 600;
            color: var(--vscode-textLink-foreground);
        }
        
        .search-container {
            margin-bottom: 20px;
        }
        
        .search-input {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--vscode-input-border);
            border-radius: 4px;
            background-color: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            font-size: 14px;
        }
        
        .new-agent-btn {
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            margin-bottom: 20px;
        }
        
        .new-agent-btn:hover {
            background-color: var(--vscode-button-hoverBackground);
        }
        
        .section {
            margin-bottom: 25px;
        }
        
        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            color: var(--vscode-textLink-foreground);
            font-weight: 500;
        }
        
        .section-title {
            font-size: 16px;
        }
        
        .add-icon {
            cursor: pointer;
            font-size: 18px;
            color: var(--vscode-textLink-foreground);
        }
        
        .agent-item {
            background-color: var(--vscode-list-activeSelectionBackground);
            border: 1px solid var(--vscode-list-activeSelectionBorder);
            border-radius: 6px;
            padding: 15px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .status-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #4CAF50;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 8px;
            font-weight: bold;
        }
        
        .agent-info {
            flex: 1;
        }
        
        .agent-name {
            font-weight: 500;
            margin-bottom: 4px;
        }
        
        .agent-status {
            font-size: 12px;
            color: var(--vscode-descriptionForeground);
        }
        
        .empty-state {
            text-align: center;
            padding: 40px 20px;
            color: var(--vscode-descriptionForeground);
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">ALL AGENTS</div>
        <div class="add-icon" onclick="createAgent()">+</div>
    </div>
    
    <div class="search-container">
        <input type="text" class="search-input" placeholder="Search Agents" oninput="searchAgents(this.value)">
    </div>
    
    <button class="new-agent-btn" onclick="createAgent()">+ New Agent</button>
    
    <div class="section">
        <div class="section-header">
            <div class="section-title">On This Computer 1</div>
        </div>
        <div class="agent-item">
            <div class="status-indicator">✓</div>
            <div class="agent-info">
                <div class="agent-name">Get context for discussion</div>
                <div class="agent-status">Now</div>
            </div>
        </div>
    </div>
    
    <div class="section">
        <div class="section-header">
            <div class="section-title">In Background 0</div>
            <div class="add-icon" onclick="createAgent()">+</div>
        </div>
        <div class="empty-state">
            No background agents running
        </div>
    </div>
    
    <script>
        function createAgent() {
            vscode.postMessage({
                command: 'createAgent'
            });
        }
        
        function searchAgents(query) {
            vscode.postMessage({
                command: 'searchAgents',
                query: query
            });
        }
        
        // Get VS Code webview API
        const vscode = acquireVsCodeApi();
    </script>
</body>
</html>`;
    }
}
