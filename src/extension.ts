import * as vscode from "vscode";
import { parseSearchInput } from "./utils";

const GLOBAL_STATE_INPUT_HISTORY = "input-history";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "weemacs.searchProject",
    async () => {
      const history =
        context.globalState.get<string[]>(GLOBAL_STATE_INPUT_HISTORY) ?? [];

      const quickPick = vscode.window.createQuickPick();
      quickPick.title = "Search project";
      quickPick.onDidChangeValue((input) => {
        quickPick.items = [
          { label: input },
          ...history.map((s) => ({ label: s })),
        ].filter((s) => !!s);
      });
      quickPick.show();

      let selectedItem = "";
      quickPick.onDidChangeSelection(([input]) => (selectedItem = input.label));

      const rawSearchInput = await new Promise<string>((resolve) =>
        quickPick.onDidAccept(() => resolve(selectedItem)),
      );
      if (!rawSearchInput) return;

      const parsedSearchInput = parseSearchInput(rawSearchInput);
      await vscode.commands.executeCommand(
        "workbench.action.findInFiles",
        parsedSearchInput,
      );

      await context.globalState.update(GLOBAL_STATE_INPUT_HISTORY, [
        rawSearchInput,
        ...history,
      ]);
    },
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
