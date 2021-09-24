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
                <tr v-for="row in rows">
                    <td>{{ row.date }}</td>
                    <td>{{ row.filename }}</td>
                    <td v-html="statusHTML(row)" class="align-middle">
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
            statusHTML(row) {
                if (row.status == "NotProcessed") {
                    return `<button class="btn btn-sm btn-outline-primary" style="width: 100%;" type="button">Обработать</button>`;
                } else if (row.status == "Processed") {
                    return `<button disabled class="btn btn-sm btn-outline-secondary" style="width: 100%;" type="button">Обработано</button>`;
                } else   {
                    return `<div class="progress"><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${row.status}%">${row.status+'%'}</div></div>`;
                }
            }
        },
        computed: {

        },
    });