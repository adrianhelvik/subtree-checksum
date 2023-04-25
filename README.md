# subtree-checksum

Creates a SHA256 checksum of a subtree, either as a cli command:

```bash
# Create a hash of the files foo.txt and bar.txt
npx subtree-checksum foo.txt bar.txt

# Create a hash of all files in the current directory
npx subtree-checksum .

# or
npx subtree-checksum

# Skip node_modules and .git
npx subtree-checksum --skip=.git,node_modules
```

or in code:

```javascript
import subtreeChecksum from "subtree-checksum";

console.log(subtreeChecksum("."));
```
