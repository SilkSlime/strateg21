class Tree {
    constructor(tree_id, data) {
        let tree = document.querySelector(`#${tree_id}`);
        this.tree = tree;
        this.data = data;
        tree.classList.add("tree")
        this.build(tree, data, true);

        let hid = document.createElement("span");
    }

    build(tree, data, main=false) {
        if (!tree) {
            return;
        }
        let root = document.createElement('ul');
        tree.appendChild(root);
        if (!main) root.classList.add("tree-hidden");
        
        for (let node of data) {
            let node_element = document.createElement('li');
            root.appendChild(node_element);
    
            let node_inner = document.createElement('div');
            node_inner.classList.add("form-check");

            if (node.children.length != 0) {
                let mark = document.createElement("span");
                node_inner.appendChild(mark);
                mark.style = "position: relative; left: -45px; top: -2px; display: inline-block; width: 0; transition: 0.3s;";
                mark.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"></path></svg>';
                mark.addEventListener('click', function (e) {
                    e.currentTarget.parentElement.parentElement.nextElementSibling.classList.toggle("tree-hidden");
                    e.currentTarget.classList.toggle("tree-mark-rotate");
                });
            }

            let check = document.createElement("input");
            node_inner.appendChild(check);
            check.className = `form-check-input tree-check`;
            check.type = 'checkbox';
            check.dataset.tree_id = this.tree.id;
            check.addEventListener('click', function (e) {
                Tree.updateDescendants(e.currentTarget);
                Tree.update(e.currentTarget.dataset.tree_id);
            });

    
            let label = document.createElement("label");
            label.className = "form-check-label";
            label.innerHTML = node.text;
    
            node_inner.appendChild(label);
    
    
            node_element.appendChild(node_inner);
    
            if (node.children.length != 0 && node_element.parentElement) {
                this.build(node_element.parentElement, node.children);
            }
        }
    }

    static update(tree_id) {
        let tree = document.querySelector(`#${tree_id}`);
        for (let checkbox of tree.querySelectorAll('input.tree-check')) {
            // Tree.updateDescendants(checkbox);
            Tree.updateAncestors(checkbox);
        }
    }

    static updateDescendants(checkbox) {
        // Если есть элемент за текущем элементом списка
        if (checkbox.parentElement.parentElement.nextElementSibling != null) {
            // Если это список, то есть дети
            if (checkbox.parentElement.parentElement.nextElementSibling.tagName == 'UL') {
                let descendants = checkbox.parentElement.parentElement.nextElementSibling.querySelectorAll(`input.tree-check`);
                for (let descendant of descendants) {
                    descendant.checked = checkbox.checked;
                }
            }
        }
    }

    static updateAncestors(checkbox) {
        // Если есть родитель
        if (checkbox.parentElement.parentElement.parentElement.previousElementSibling != null) {
            let master = checkbox.parentElement.parentElement.parentElement.previousElementSibling.querySelector(`input.tree-check`);
            let descendants = master.parentElement.parentElement.nextElementSibling.querySelectorAll(`input.tree-check`);
            let checked_count = 0;
            for (let descendant of descendants) {
                if (descendant.checked) {
                    checked_count++;
                }
            }
            if (checked_count == descendants.length) {
                master.checked = true;
                master.indeterminate = false;
                Tree.updateAncestors(master);
            } else if (checked_count == 0) {
                master.checked = false;
                master.indeterminate = false;
                Tree.updateAncestors(master);
            } else {
                master.checked = false;
                master.indeterminate = true;
                Tree.updateAncestors(master);
            }
        }
    }

    getValues() {
        let data = [];
        for (let checkbox of this.tree.querySelectorAll('.tree-check')) {
            if (checkbox.checked) {
                data.push(checkbox.nextElementSibling.innerHTML);
            }
        }
        return data;
    }
}