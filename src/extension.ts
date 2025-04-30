import * as vscode from "vscode";
import { parseSearchInput } from "./utils";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "weemacs.searchProject",
    async () => {
      const rawSearchInput = await vscode.window.showInputBox({
        title: "Weemacs: Search project",
      });
      if (!rawSearchInput) return;

      const parsedSearchInput = parseSearchInput(rawSearchInput);
      await vscode.commands.executeCommand(
        "workbench.action.findInFiles",
        parsedSearchInput,
      );
    },
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
