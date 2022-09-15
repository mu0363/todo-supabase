module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "google",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      parserOptions: { project: ["./tsconfig.json"] }, // Specify it only for TypeScript files
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 12,
    sourceType: "module",
  },
  settings: {
    react: { version: "detect" },
    "import/resolver": {
      typescript: {},
      node: { extensions: [".ts"] },
    },
  },
  plugins: ["react", "@typescript-eslint", "unused-imports", "import"],
  rules: {
    "require-jsdoc": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "import/named": "off",
    "@typescript-eslint/no-unused-vars": "off", // or "no-unused-vars"
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "import/order": [
      "error",
      {
        // グループごとの並び順
        groups: [
          "builtin", // 1. fsや path などの node "builtin" のモジュール
          "external", // 2. npm install したパッケージ
          "internal", // 3. webpack などでパス設定したモジュール
          ["parent", "sibling"], // 4. 親階層と小階層のファイル
          "object", // object"-imports
          "type", // 型だけをインポートする type imports
          "index", // 同階層のファイル
        ],
        // グループごとに改行を入れる
        // "newlines-between": "always", // "never" を指定すると改行なし
        // FIXME: ちょっとよく分かってない
        // This defines import types that are not handled by configured pathGroups. This is mostly needed when you want to handle path groups that look like external imports.
        pathGroupsExcludedImportTypes: ["builtin"],
        // アルファベット順・大文字小文字を区別しない
        alphabetize: { order: "asc", caseInsensitive: true },
        // パターンマッチしたものをグループにする
        // "newlines-between": "always" の場合は pathGroups  ごとに空行が入る
        pathGroups: [
          // react 関連を external より前にする
          // "pathGroupsExcludedImportTypes": ["react"], にしてみたが `react`, `react-dom` などが別グループになってしまったので pattern で無理やり同じグループにした
          {
            pattern: "react**",
            group: "external",
            position: "before",
          },
          // `@/app`, `@/features/`, `@/libs` の import をひとグループにして internal の前に
          {
            pattern: "{@/app/**,@/features/**,@/libs/**}",
            group: "internal",
            position: "before",
          },
          // `@/components`, `@/pages` の import をグルーピング
          {
            pattern: "{@/components/**,@/pages/**}",
            group: "internal",
            position: "before",
          },
          // CSS module を一番最後に
          {
            pattern: "./**.module.css",
            group: "index",
            position: "after",
          },
        ],
      },
    ],
  },
};
