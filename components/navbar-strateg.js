Vue.component('navbar-strateg', {
    data: function () {
        return {
            data: {
                imageUrl: "assets/images/bmstu.png",
                title: "Strateg-21",
                items: [{
                        title: "Обработка стратегий",
                        url: "./index.html",
                    },
                    {
                        title: "Стратегии",
                        url: "./search.html",
                    },
                    {
                        title: "Классификаторы",
                        items: [{
                                title: "Тематический Классификатор",
                                url: "./classifier_theme_settings.html",
                            },
                            {
                                title: "Классификатор по политическим инструментам",
                                url: "./classifier_polit_settings.html",
                            },
                        ]
                    },
                    {
                        title: "Настройка полей карточек",
                        url: "./card_settings.html",
                    },
                    {
                        title: "Настройки",
                        url: "./settings.html",
                    },
                ]
            },
        }
    },
    template: `
<nav class="navbar navbar-light bg-light navbar-expand-lg">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <img :src="data.imageUrl" alt="" width="30" height="28" class="d-inline-block align-text-top">
            {{ data.title }}
        </a>
        <div class="navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <template v-for="item in data.items">
                    <li v-if="!item.items" class="nav-item">
                        <a :class="[isActive(item), 'nav-link']" :href="item.url">{{ item.title }}</a>
                    </li>

                    <li v-if="item.items" class="nav-item dropdown">
                        <a :class="[isActive(item), 'nav-link', 'dropdown-toggle']" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ item.title }}
                        </a>
                        <ul class="dropdown-menu">
                            <li v-for="subitem in item.items" class="nav-item">
                                <a :class="[isActive(item), 'nav-link']" :href="subitem.url">{{ subitem.title }}</a>
                            </li>
                        </ul>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</nav>
        `,
    props: {
        active: {}
    },
    methods: {
        isActive(item) {
            if (item.title == this.active) return "active";

            return "";
        },
    },
    computed: {

    },

    created() {
        document.title = this.active;
    }
});