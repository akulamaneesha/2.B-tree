const ORDER = 3;

let root = {
    leaf: true,
    keys: []
};

function insertKey() {

    let input = document.getElementById("keyInput");
    let key = Number(input.value);

    if (input.value === "") {
        alert("Enter a key");
        return;
    }

    insertIntoTree(root, key);

    input.value = "";

    document.getElementById("message").innerHTML =
        "Inserted key: " + key;

    displayTree();
}

function insertIntoTree(node, key) {

    if (node.leaf) {

        node.keys.push(key);

        node.keys.sort((a, b) => a - b);

        if (node.keys.length > ORDER) {
            splitLeaf(node);
        }

        return;
    }

    let index = 0;

    while (
        index < node.keys.length &&
        key >= node.keys[index]
    ) {
        index++;
    }

    insertIntoTree(node.children[index], key);

    if (node.children.length > ORDER) {
        splitInternal(node);
    }
}

function splitLeaf(node) {

    let middle = Math.ceil(node.keys.length / 2);

    let right = {
        leaf: true,
        keys: node.keys.splice(middle)
    };

    if (node === root) {

        root = {
            leaf: false,
            keys: [right.keys[0]],
            children: [node, right]
        };

    } else {

        // Leaf splitting for this simple visualization
        node.next = right;
    }
}

function splitInternal(node) {

    let middle = Math.floor(node.keys.length / 2);

    let right = {
        leaf: false,
        keys: node.keys.splice(middle + 1),
        children: node.children.splice(middle + 1)
    };

    let promoted = node.keys.pop();

    if (node === root) {

        root = {
            leaf: false,
            keys: [promoted],
            children: [node, right]
        };
    }
}

function displayTree() {

    let tree = document.getElementById("tree");

    tree.innerHTML = "";

    let level = [root];

    while (level.length > 0) {

        let levelDiv = document.createElement("div");
        levelDiv.className = "level";

        let nextLevel = [];

        level.forEach(node => {

            let nodeDiv = document.createElement("div");
            nodeDiv.className = "node";

            if (node.leaf) {
                nodeDiv.classList.add("leaf");
            }

            node.keys.forEach(key => {

                let keySpan = document.createElement("span");

                keySpan.className = "key";
                keySpan.innerText = key;

                nodeDiv.appendChild(keySpan);
            });

            levelDiv.appendChild(nodeDiv);

            if (!node.leaf && node.children) {
                nextLevel.push(...node.children);
            }
        });

        tree.appendChild(levelDiv);

        level = nextLevel;
    }
}

function resetTree() {

    root = {
        leaf: true,
        keys: []
    };

    document.getElementById("tree").innerHTML = "";

    document.getElementById("message").innerHTML =
        "Tree has been reset";
}

displayTree();