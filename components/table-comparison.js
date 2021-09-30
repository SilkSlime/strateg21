Vue.component('table-comparison', {
    data: function () {
        return {
            headers: ["Дата создания", "Имя файла", "Название стратегии", "Страна", "Год", "Убрать"]
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
            <tr v-for="(row, id) in rows">
                <td>{{ row.date }}</td>
                <td>{{ row.filename }}</td>
                <td>{{ row.strategyName }}</td>
                <td>{{ row.country }}</td>
                <td>{{ row.year }}</td>
                <td class="align-middle" style="text-align: center;">
                    <svg @click="remove" :data-id="id" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M9.036 7.976a.75.75 0 00-1.06 1.06L10.939 12l-2.963 2.963a.75.75 0 101.06 1.06L12 13.06l2.963 2.964a.75.75 0 001.061-1.06L13.061 12l2.963-2.964a.75.75 0 10-1.06-1.06L12 10.939 9.036 7.976z"></path><path fill-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zM2.5 12a9.5 9.5 0 1119 0 9.5 9.5 0 01-19 0z"></path></svg>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="d-grid mb-3">
        <button @click="compare" id="compare" class="btn btn-outline-primary" type="button">Сравнить</button>
    </div>
</div>
        `,
    props: {
        rows: {},
    },
    methods: {
        remove(e) {
            this.$emit('remove', e.currentTarget.dataset.id)
        },
        compare() {
            this.$emit('compare');
        }
    },
});