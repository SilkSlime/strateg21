    Vue.component('table-files', {
        data: function () {
            return {
                headers: ["Дата загрузки", "Имя файла", "Статус", "Подробнее"]
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
                    
                    <td v-if="row.status == 'NotProcessed'" class="align-middle">
                        <button @click="process" :data-id="id" class="btn btn-sm btn-outline-primary" style="width: 100%;" type="button">Обработать</button>
                    </td>
                    <td v-else-if="row.status == 'Processed'" class="align-middle">
                        <button disabled class="btn btn-sm btn-outline-secondary" style="width: 100%;" type="button">Обработано</button>
                    </td>
                    <td v-else class="align-middle">
                        <div class="progress">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" :style="{ width: row.status+'%' }">{{row.status+'%'}}</div>
                        </div>
                    </td>
                    <td>
                        {{ row.info }}
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
            process(e) {
                this.$emit('process', e.currentTarget.dataset.id)
            }
        },
        computed: {

        },
    });