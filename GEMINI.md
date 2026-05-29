{
  "context": {
    "fileName": [
      "GEMINI.md",
      "CLAUDE.md"
    ]
  },
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup|resume",
        "hooks": [
          {
            "type": "command",
            "command": "node --disable-warning=ExperimentalWarning --experimental-strip-types \"${GEMINI_PROJECT_DIR:-.}/.claude/scripts/session-start.ts\"",
            "timeout": 30000
          }
        ]
      }
    ],
    "BeforeAgent": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node --disable-warning=ExperimentalWarning --experimental-strip-types \"${GEMINI_PROJECT_DIR:-.}/.claude/scripts/classify-message.ts\"",
            "timeout": 15000
          }
        ]
      }
    ],
    "AfterTool": [
      {
        "matcher": "write_file|replace",
        "hooks": [
          {
            "type": "command",
            "command": "node --disable-warning=ExperimentalWarning --experimental-strip-types \"${GEMINI_PROJECT_DIR:-.}/.claude/scripts/validate-write.ts\"",
            "timeout": 15000
          },
          {
            "type": "command",
            "command": "node --disable-warning=ExperimentalWarning --experimental-strip-types \"${GEMINI_PROJECT_DIR:-.}/.claude/scripts/qmd-refresh.ts\"",
            "timeout": 15000
          }
        ]
      }
    ],
    "PreCompress": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node --disable-warning=ExperimentalWarning --experimental-strip-types \"${GEMINI_PROJECT_DIR:-.}/.claude/scripts/pre-compact.ts\"",
            "timeout": 30000
          }
        ]
      }
    ],
    "SessionEnd": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node --disable-warning=ExperimentalWarning --experimental-strip-types \"${GEMINI_PROJECT_DIR:-.}/.claude/scripts/stop-checklist.ts\"",
            "timeout": 5000
          }
        ]
      }
    ],
    "BeforeTool": [
      {
        "matcher": "read_file|list_directory",
        "hooks": [
          {
            "type": "command",
            "command": "node --disable-warning=ExperimentalWarning --experimental-strip-types \"${GEMINI_PROJECT_DIR:-.}/.claude/scripts/graphify-hint.ts\""
          }
        ]
      }
    ]
  },
  "mcpServers": {
    "graphify": {
      "command": "graphify",
      "args": [
        "C:/Users/DELL-IN/my-vault/graphify-out/graph.json",
        "--mcp"
      ],
      "description": "Queryable knowledge graph for project codebase"
    },
    "qmd": {
      "command": "qmd",
      "args": [
        "--index",
        "obsidian-mind",
        "mcp"
      ],
      "description": "Semantic search over vault notes — fallback when graph query returns nothing"
    }
  }
}