Vue.component('table-strategies', {
    data: function () {
        return {
            headers: ["Дата создания", "Имя файла", "Название стратегии", "Страна", "Год", "Посмотреть", "Выбрать"]
        }
    },
    template: `
<div class="table-responsive">
    <table class="table table-sm table-striped table-hover">
        <thead>
            <tr>
                <th v-for="title in headers" scope="col">{{ title }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in rows">
                <td>{{ row.date }}</td>
                <td>{{ row.filename }}</td>
                <td>{{ row.strategyName }}</td>
                <td>{{ row.country }}</td>
                <td>{{ row.year }}</td>
                <td class="align-middle" style="text-align: center;">
                    <svg @click="show" :data-row="JSON.stringify(row)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M15.5 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"></path><path fill-rule="evenodd" d="M12 3.5c-3.432 0-6.125 1.534-8.054 3.24C2.02 8.445.814 10.352.33 11.202a1.6 1.6 0 000 1.598c.484.85 1.69 2.758 3.616 4.46C5.876 18.966 8.568 20.5 12 20.5c3.432 0 6.125-1.534 8.054-3.24 1.926-1.704 3.132-3.611 3.616-4.461a1.6 1.6 0 000-1.598c-.484-.85-1.69-2.757-3.616-4.46C18.124 5.034 15.432 3.5 12 3.5zM1.633 11.945c.441-.774 1.551-2.528 3.307-4.08C6.69 6.314 9.045 5 12 5c2.955 0 5.309 1.315 7.06 2.864 1.756 1.553 2.866 3.307 3.307 4.08a.111.111 0 01.017.056.111.111 0 01-.017.056c-.441.774-1.551 2.527-3.307 4.08C17.31 17.685 14.955 19 12 19c-2.955 0-5.309-1.315-7.06-2.864-1.756-1.553-2.866-3.306-3.307-4.08A.11.11 0 011.616 12a.11.11 0 01.017-.055z"></path></svg>
                </td>
                <td class="align-middle" style="text-align: center;">
                    <svg @click="pick" :data-row="JSON.stringify(row)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12.75 7.75a.75.75 0 00-1.5 0v3.5h-3.5a.75.75 0 000 1.5h3.5v3.5a.75.75 0 001.5 0v-3.5h3.5a.75.75 0 000-1.5h-3.5v-3.5z"></path><path fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"></path></svg>
                </td>
            </tr>
        </tbody>
    </table>
</div>
        `,
    props: {
        rows: {},
    },
    methods: {
        show(e) {
            this.$emit('show', JSON.parse(e.currentTarget.dataset.row))
        },
        pick(e) {
            this.$emit('pick', JSON.parse(e.currentTarget.dataset.row))
        },

    },
});