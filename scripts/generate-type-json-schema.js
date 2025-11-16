const ts = require("typescript");

/* -------------------------------------------------------------
 * SMALL NEW HELPERS (Modular + Minimal)
 * ------------------------------------------------------------- */

// Extract `'a' | 'b'` from type arguments of Omit<T, 'a' | 'b'>
function extractLiteralKeysFromTypeNode(typeNode) {
  if (!typeNode) return [];

  // single literal
  if (ts.isLiteralTypeNode(typeNode) && ts.isStringLiteral(typeNode.literal)) {
    return [typeNode.literal.text];
  }

  // union of literals
  if (ts.isUnionTypeNode(typeNode)) {
    return typeNode.types
      .filter((t) => ts.isLiteralTypeNode(t) && ts.isStringLiteral(t.literal))
      .map((t) => t.literal.text);
  }

  return [];
}

// Handle Omit<BaseUIProps, 'size'> → return BaseUIProps minus "size"
function resolveUtilityType(declaration, checker) {
  if (!ts.isTypeAliasDeclaration(declaration)) return null;

  const typeNode = declaration.type;

  if (!ts.isTypeReferenceNode(typeNode)) return null;

  const utilName = typeNode.typeName.getText();
  const args = typeNode.typeArguments || [];

  if (utilName !== "Omit" || args.length !== 2) {
    return null; // only implement Omit for now (per your request)
  }

  const baseTypeNode = args[0];
  const keysToOmit = extractLiteralKeysFromTypeNode(args[1]);

  if (!baseTypeNode) return null;

  const baseType = checker.getTypeFromTypeNode(baseTypeNode);
  const allProps = baseType.getProperties();

  const included = allProps.filter((p) => !keysToOmit.includes(p.getName()));

  // Build same shape as your interface-style metadata
  const properties = included
    .map((member) => {
      const memberDecl = member.valueDeclaration;
      if (!memberDecl) return null;

      const memberType = checker.getTypeOfSymbolAtLocation(member, memberDecl);

      return {
        name: member.getName(),
        dataType: checker.typeToString(memberType),
        // dataTypeValues: null,
        defaultValue: null,
        description: null,
        comment: ts
          .displayPartsToString(member.getDocumentationComment(checker))
          ?.replace("\n", ""),
      };
    })
    .filter(Boolean);

  return {
    parents: [],
    properties,
  };
}

/* -------------------------------------------------------------
 * EXISTING CODE (only tiny modification)
 * ------------------------------------------------------------- */

function extractUnionStringLiterals(type) {
  if (!type.isUnion()) return null;

  const values = type.types
    .filter((t) => t.isStringLiteral?.() || t.isNumberLiteral?.())
    .map((t) => t.value);

  return values.length ? values : null;
}

function extractTypeMetadata(symbol, checker) {
  if (!symbol) return null;

  const metadata = {};
  const type = checker.getDeclaredTypeOfSymbol(symbol);
  const declaration = symbol.declarations?.[0];

  if (!declaration) return null;

  // NEW: Handle utility types here (e.g., Omit<BaseUIProps, 'size'>)
  const resolvedUtility = resolveUtilityType(declaration, checker);
  if (resolvedUtility) {
    return resolvedUtility; // return early like union-type handling
  }

  // Existing union-type handling
  if (ts.isTypeAliasDeclaration(declaration)) {
    const unionValues = extractUnionStringLiterals(type);

    if (unionValues) {
      return {
        dataType: checker.typeToString(type),
        dataTypeValues: unionValues,
        parents: [],
      };
    }
  }

  // ---- Interface or type literal ----
  const properties = [];
  if (
    ts.isInterfaceDeclaration(declaration) ||
    ts.isTypeLiteralNode(declaration)
  ) {
    const members = checker.getPropertiesOfType(type);

    members.forEach((member) => {
      const memberDeclaration = member.valueDeclaration;
      if (!memberDeclaration) return;

      // Skip RN internal inherited props
      if (member.parent?.parent?.escapedName?.includes("/react-native/")) {
        return;
      }

      const memberType = checker.getTypeOfSymbolAtLocation(
        member,
        memberDeclaration
      );

      const unionValues = extractUnionStringLiterals(memberType);

      const jsDocTags = ts.getJSDocTags(memberDeclaration);
      const description =
        jsDocTags.find((t) => t.tagName.text === "description")?.comment ||
        null;

      properties.push({
        name: member.getName(),
        dataType: checker.typeToString(memberType),
        ...(unionValues ? { dataTypeValues: unionValues } : {}),
        defaultValue: jsDocTags.find((t) => t.tagName.text === "default")
          ?.comment,
        description,
        comment: ts
          .displayPartsToString(member.getDocumentationComment(checker))
          ?.replace("\n", ""),
      });
    });

    metadata.properties = properties;
  }

  // ---- Parents (extends)
  if (ts.isInterfaceDeclaration(declaration)) {
    const metadataParents = declaration.heritageClauses
      ? declaration.heritageClauses.map((hc) =>
          hc.types.map((t) => t.getText())
        )
      : [];

    metadata.parents = metadataParents.flat();

    const getFormattedParentName = (parent) => {
      const match = parent.match(/<([^>]+)>/);
      const inside = match ? match[1].split(",")[0] : null;

      if (inside?.includes("$1")) {
        return "RN" + inside.replace("$1", "");
      } else if (parent.includes("$1")) {
        return "RN" + parent.replace("$1", "");
      }

      return inside || parent;
    };

    metadata.parentsDisplay = metadata.parents.map(getFormattedParentName);
  } else {
    metadata.parents = [];
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
  console.log(JSON.stringify({}, null, 2));
}
