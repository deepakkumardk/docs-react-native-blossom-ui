const ts = require("typescript");

function extractTypeMetadata(symbol, checker) {
  if (!symbol) return null;

  const metadata = {};
  const type = checker.getDeclaredTypeOfSymbol(symbol);
  const declaration = symbol.declarations?.[0];

  if (!declaration) return null;

  const properties = [];
  if (
    ts.isInterfaceDeclaration(declaration) ||
    ts.isTypeLiteralNode(declaration)
  ) {
    const members = checker.getPropertiesOfType(type);

    members.forEach((member) => {
      const memberDeclaration = member.valueDeclaration;

      if (member.parent?.parent?.escapedName?.includes("/react-native/")) {
        return;
      }

      if (!memberDeclaration) return;

      const memberType = checker.getTypeOfSymbolAtLocation(
        member,
        memberDeclaration
      );

      const jsDocTags = ts.getJSDocTags(memberDeclaration);

      const description =
        jsDocTags.find((tag) => tag.tagName.text === "description")?.comment ||
        null;

      const propertiesObj = {
        name: member.getName(),
        dataType: checker.typeToString(memberType),
        defaultValue: jsDocTags.find((tag) => tag.tagName.text === "default")
          ?.comment,
        description,
        comment: ts
          .displayPartsToString(member.getDocumentationComment(checker))
          ?.replace("\n", ""),
      };
      properties.push(propertiesObj);
    });

    metadata.properties = properties;
  }

  if (ts.isInterfaceDeclaration(declaration)) {
    metadata.parent = declaration.heritageClauses
      ? declaration.heritageClauses.map((hc) =>
          hc.types.map((t) => t.getText())
        )
      : [];
    metadata.parent = metadata.parent?.flat?.();
  } else {
    metadata.parent = [];
  }

  return metadata;
}

function processTypesFile(filePath) {
  const program = ts.createProgram([filePath], {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.CommonJS,
  });

  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(filePath);

  if (!sourceFile) throw new Error("Source file not found!");

  const results = {};

  const visitNode = (node) => {
    try {
      if (
        ts.isInterfaceDeclaration(node) ||
        ts.isTypeAliasDeclaration(node) ||
        ts.isClassDeclaration(node)
      ) {
        const symbol = checker.getSymbolAtLocation(node.name);
        if (symbol) {
          results[symbol.getName()] = extractTypeMetadata(symbol, checker);
        }
      }
    } catch (error) {
      console.error("Error processing node:", error.message);
    }

    ts.forEachChild(node, visitNode);
  };

  visitNode(sourceFile);

  return results;
}

try {
  const resultComponents = processTypesFile(
    "node_modules/@react-native-blossom-ui/components/dist/index.d.ts"
  );
  const resultDates = processTypesFile(
    "node_modules/@react-native-blossom-ui/dates/dist/index.d.ts"
  );
  const result = { ...resultComponents, ...resultDates };
  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  // console.error("Error processing file:", error.message);
  console.log(JSON.stringify({}, null, 2));
}
