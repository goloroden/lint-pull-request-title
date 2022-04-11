# Lint pull request title

Lints pull request titles and makes sure they follow the conventional commit rules

### Input options

- `allowed-pull-request-types`
  - Description: Comma separated list of allowed pull request types
  - Required: true
  - Example: `chore,feat,fix`

### Example usage

```yml
name: Lint pull request title

on:
  pull_request_target:
    types:
      - opened
      - edited
      - synchronize

jobs:
  lint-pull-request-title:
    runs-on: ubuntu-latest
    steps:
      - name: Lint pull request title
        uses: matthiashermsen/lint-pull-request-title@v1.0.0
        with:
          allowed-pull-request-types: chore,feat,fix
```
