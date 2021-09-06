function tree_build(jstree, tree_data) {
    let root = document.createElement('ul');
    jstree.appendChild(root);
    for (let node of tree_data) {
        let node_element = document.createElement('li');
        root.appendChild(node_element);

        let node_inner = document.createElement('div');
        node_inner.className = "form-check";

        let check = document.createElement("input");
        check.className = `form-check-input tree-check`;
        check.type = 'checkbox';
        check.addEventListener('click', function (e) {
            updateDescendants(e.currentTarget);
            updateAncestors(e.currentTarget);
        });

        node_inner.appendChild(check);

        let label = document.createElement("label");
        label.className = "form-check-label";
        label.innerHTML = node.text;

        node_inner.appendChild(label);


        node_element.appendChild(node_inner);

        if (node.children.length != 0) {
            tree_build(node_element.parentElement, node.children);
        }
    }
}

function updateDescendants(element) {
    // Если есть элемент за текущем элементом списка
    if (element.parentElement.parentElement.nextElementSibling != null) {
        // Если это список, то есть дети
        if (element.parentElement.parentElement.nextElementSibling.tagName == 'UL') {
            let descendants = element.parentElement.parentElement.nextElementSibling.querySelectorAll(`input.tree-check`);
            for (let descendant of descendants) {
                descendant.checked = element.checked;
            }
        }
    }
}

function updateAncestors(element) {
    // Если есть родитель
    if (element.parentElement.parentElement.parentElement.previousElementSibling != null) {
        let master = element.parentElement.parentElement.parentElement.previousElementSibling.querySelector(`input.tree-check`);
        let descendants = master.parentElement.parentElement.nextElementSibling.querySelectorAll(`input.tree-check`);
        checked_count = 0;
        for (let descendant of descendants) {
            if (descendant.checked) {
                checked_count++;
            }
        }
        if (checked_count == descendants.length) {
            master.checked = true;
            master.indeterminate = false;
            updateAncestors(master);
        } else if (checked_count == 0) {
            master.checked = false;
            master.indeterminate = false;
            updateAncestors(master);
        } else {
            master.checked = false;
            master.indeterminate = true;
            updateAncestors(master);
        }
    }
}