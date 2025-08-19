# Build and run from source

## Prerequisites

- [Node.js](https://nodejs.org/) >= 22
- [pnpm](https://pnpm.io/) >= 9
- [Rust](https://www.rust-lang.org/tools/install)

## Install dependencies

From the repository root:

```bash
pnpm install
```

## Build

Compile the TypeScript packages:

```bash
pnpm -r build
```

Build the Rust workspace (from the `codex-rs` directory):

```bash
cd codex-rs
cargo build
```

## Run the CLI

Launch the CLI:

```bash
cargo run -p codex-cli
```

The compiled binary will be available at `codex-rs/target/debug/codex`.

## Run the web UI

Start the web interface from the repository root:

```bash
pnpm --filter codex-web start
```

Then open <http://localhost:3000> to chat with Codex in your browser.
