describe('Navigation', () => {
  it('should navigate to the admin page', () => {
    cy.visit('/admin/agenda')

    cy.contains('Adicionar').click()

    cy.get('input[name="title"]').type('Evento de teste com Cypress')
    cy.get('input[name="subtitle"]').type('Subtitulo de teste com Cypress')
    cy.get('input[name="shortDescription"]').type(
      'shortDescription de teste com Cypress'
    )
    cy.get('textarea[name="longDescription"]').type(
      'longDescription de teste com Cypress'
    )
    cy.get('input[name="image"]').type(
      'https://firebasestorage.googleapis.com/v0/b/unaadeb-a6c93.appspot.com/o/blog%2FCaptura%20de%20tela%20de%202021-11-22%2010-50-31.png?alt=media&token=7f8009d1-e622-4967-b9e4-6c1abc6772bc'
    )
    cy.get('input[name="address"]').type(
      'Qn 312 Conjunto 6 Lote 8 Apartamento 104'
    )

    cy.get('input[name="geolocation.latitude"]').type('-501326544')
    cy.get('input[name="geolocation.longitude"]').type('-205487777')

    cy.contains('Cadastrar Agenda').click()
  })
})

const asModule = {}
export default asModule
