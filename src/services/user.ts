/* tslint:disable:no-magic-numbers */
export type Error = {ok: true, timestamp: Date} | {ok: false, error: 'InvalidBrand' | 'InvalidCpf' | 'InvalidValue' | 'InvalidStrange', debugMessage?: string}

export async function getUserData(){
    return {
        name: 'paulo'
    }
}

export async function getUserDependents() {
    return [
        {
            name: 'filipi',
            affinity: 'irmão'
        },
        {
            name: 'angelina',
            affinity: 'mãe'
        }
    ]
}

export async function getUserInvoices() {
    return [
        {
            name: 'luz',
            value: '105,20',
            payDate: '10/12/2018'
        },
        {
            name: 'agua',
            value: '60,15',
            payDate: '10/12/2018'
        },
        {
            name: 'telefone',
            value: '80,90',
            payDate: '10/12/2018'
        },
        {
            name: 'internet',
            value: '70,50',
            payDate: '10/12/2018'
        }
    ]
}