Vue.component('tree-menu', {
    data: function () {
        return {
            showChildren: false,
        }
    },
    template: `
        <div class="tree-menu" @change="checkBoxChange"  :style="[indent]">
            <div>
                <svg @click="toggleChildren" v-if="!showChildren && hasNodes()" style="position: relative; top: -2.5px; left: 3px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"></path></svg>
                <svg @click="toggleChildren" v-else-if="showChildren && hasNodes()" style="position: relative; top: -2.5px; left: 3px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M12.78 6.22a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06 0L3.22 7.28a.75.75 0 011.06-1.06L8 9.94l3.72-3.72a.75.75 0 011.06 0z"></path></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" style="opacity: 0" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4 8a4 4 0 118 0 4 4 0 01-8 0z"></path></svg>
                <input type="checkbox" :value="tree.label">
                <span :style="inlineblock" @click="toggleChildren">{{ tree.label }} </span>
            </div>
            <transition-group name="list">
                <tree-menu v-show="showChildren" v-for="node in tree.nodes" :key="node.label" :depth="depth+1" :selected="selected" :tree="node"></tree-menu>
            </transition-group>
        </div>`,
    props: {
        tree: {},
        depth: {
            default: 0
        },
        selected: {}
    },
    computed: {
        indent() {
            return {
                transform: `translate(${this.depth * 10}px)`,
            }
        },

        inlineblock() {
            return {
                display: "inline-block",
            }
        },
    },
    methods: {
        updateSelected(checkboxes) {
            this.selected.length=0;
            for (let checkbox of checkboxes) {
                if (checkbox.checked) {
                    this.selected.push(checkbox.value)
                }
            }
        },
        toggleChildren() {
            this.showChildren = !this.showChildren;
        },

        hasNodes() {
            return this.tree.nodes.length != 0;
        },

        checkBoxChange(event) {
            if (this.depth == 0) {
                this.updateDescendants(event.target);
                for (let checkbox of event.currentTarget.querySelectorAll('input')) {
                    this.updateAncestors(checkbox);
                }
                this.updateSelected(event.currentTarget.querySelectorAll('input'));
            } else {
                this.$emit('myEvent', event)
            }
        },

        updateDescendants(checkbox) {
            // Если есть элемент за текущем элементом списка
            if (checkbox.parentElement.nextElementSibling.children.length != 0) {
                let descendants = checkbox.parentElement.nextElementSibling.querySelectorAll(`input`);
                for (let descendant of descendants) {
                    descendant.checked = checkbox.checked;
                }
            }
        },

        updateAncestors(checkbox) {
            // Если есть родитель
            if (checkbox.parentElement.parentElement.parentElement.parentElement != null) {
                // Если это корень дерева
                if (checkbox.parentElement.parentElement.parentElement.parentElement.classList.contains('tree-menu')) {
                    let root = checkbox.parentElement.parentElement.parentElement.parentElement;
                    let root_checkbox = root.firstElementChild.firstElementChild.nextElementSibling;
                    let descendants = root.firstElementChild.nextElementSibling.querySelectorAll("input");

                    let checked_count = 0;
                    for (let descendant of descendants) {
                        if (descendant.checked) {
                            checked_count++;
                        }
                    }

                    if (checked_count == descendants.length) {
                        root_checkbox.checked = true;
                        root_checkbox.indeterminate = false;
                        this.updateAncestors(root_checkbox);
                    } else if (checked_count == 0) {
                        root_checkbox.checked = false;
                        root_checkbox.indeterminate = false;
                        this.updateAncestors(root_checkbox);
                    } else {
                        root_checkbox.checked = false;
                        root_checkbox.indeterminate = true;
                        this.updateAncestors(root_checkbox);
                    }

                }
            }
        },
    },

});