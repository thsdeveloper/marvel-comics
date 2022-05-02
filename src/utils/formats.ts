import moment from 'moment'

export function formatData(data: Date | number) {
  moment.locale('pt-br')
  return moment(data).format('DD [de] MMMM [de] YYYY')
}
