// intellisense
/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {

    // Garante que a primeira coisa a fazer é visitar o url
    beforeEach(() => {
        // Ação: url
        cy.visit('./src/index.html')
    }) 

    //Cada it é um teste
    it('verifica o título da aplicação', function() {
                
        // Verificacao: Procurar pelo titulo do navegador. Se nao colocar a verificaçao nao é um teste
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
              
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('#firstName')
        .should('be.visible')
        .type('Quim',)
        .should('have.value', 'Quim')

        cy.get('#lastName')
        .should('be.visible')
        .type('Barreiros')
        .should('have.value', 'Barreiros')

        cy.get('#email')
        .should('be.visible')
        .type('QuimBarreiros@cypress.pt')
        .should('have.value', 'QuimBarreiros@cypress.pt')

        cy.get('#open-text-area')
        .should('be.visible')
        .type('Garagem da vizinha', {delay: 0})
        .should('have.value', 'Garagem da vizinha')

        cy.get('.button') //ou cy.get('button[type="submit"]')
        .click()

        cy.get('.success')
        .should('be.visible')
    }) 

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){

        cy.get('#firstName')
        .should('be.visible')
        .type('Quim',)
        .should('have.value', 'Quim')

        cy.get('#lastName')
        .should('be.visible')
        .type('Barreiros')
        .should('have.value', 'Barreiros')

        cy.get('#email')
        .should('be.visible')
        .type('QuimBarreiros@cypress,pt')
        .should('have.value', 'QuimBarreiros@cypress,pt')

        cy.get('#open-text-area')
        .should('be.visible')
        .type('Garagem da vizinha')
        .should('have.value', 'Garagem da vizinha')

        cy.get('.button') //ou cy.get('button[type="submit"]')
        .click()

        cy.get('.error')
        .should('be.visible')
    })

    it('Verifica campo numérico do telefone', function(){
        // make an assertion on the value
        cy.get('#phone')
        .type('tttttt')
        .should('have.value', '')
    })
    
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){

        cy.get('#firstName').should('be.visible').type('Quim')
        cy.get('#lastName').should('be.visible').type('Barreiros')
        cy.get('#email').should('be.visible').type('QuimBarreiros@cypress.pt')
        cy.get('#phone-checkbox').should('be.visible').click() // torna o campo telefone obrigatório
        cy.get('#open-text-area').should('be.visible').type('Garagem da vizinha')
        
        cy.get('button[type="submit"]').click()
    
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').type('Quim').should('have.value', 'Quim')    
        cy.get('#lastName').type('Barreiros').should('have.value', 'Barreiros')
        cy.get('#email').type('QuimBarreiros@cypress.pt').should('have.value', 'QuimBarreiros@cypress.pt')
        cy.get('#phone').type('93333333').should('have.value', '93333333')

        //Apaga
        cy.get('#firstName').clear().should('have.value', '')
        cy.get('#lastName').type('Barreiros').clear().should('have.value', '')
        cy.get('#email').type('QuimBarreiros@cypress.pt').clear().should('have.value', '')
        cy.get('#phone').type('93333333').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        
        cy.get('button[type="submit"]').click()    
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        // commando customizado, para evitar repetiçao de codigo
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    // Dropdowns
    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    // Radio Buttom
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value = "feedback"]').check()
    })
    
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]').check()
        .should('have.length', 3).each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')                    
        })
    })

    // Marcar e desmarcar checkbox
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check() // Marca todos
        .should('be.checked') // confirma se estão marcados
        .last()  // Identifica o ultimo
        .uncheck() // desmarca o ultimo
        .should('not.be.checked') // confirma se está desmarcado
        
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário v2', function(){

        cy.get('#firstName').should('be.visible').type('Quim')
        cy.get('#lastName').should('be.visible').type('Barreiros')
        cy.get('#email').should('be.visible').type('QuimBarreiros@cypress.pt')
        cy.get('#phone-checkbox').should('be.visible').check().should('be.checked') 
        cy.get('#open-text-area').should('be.visible').type('Garagem da vizinha')
        
        cy.get('button[type="submit"]').click()
    
        cy.get('.error').should('be.visible')
    })

    // Upload de arquivos
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[id="file-upload"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json') // verifica o nome do ficheiro
        })        
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[id="file-upload"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }) // por trás ele faz drag-drop
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })        
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        // Em vez que passar o path todo usar cy.fixture("ficheiro")
        cy.fixture("example.json").as("sampleFile")
        
        cy.get('input[type="file"]').selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })   
    })

    // Links que abrem noutra aba do navegador
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        // Vai ao id privacy elemento <a>. Quando um elemento tem um atributo target = "_blank" ,
        // abre uma nova aba no navegador (padrão)
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
        
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        
        cy.get('#privacy a') //link do botao
        .invoke("removeAttr","target") // remove o target = '_blank' para nao abrir num novo separador
        .click() // abre no separador atual ao clicar
        
        cy.contains("Talking About Testing").should("be.visible") // Verifica se tem este texto
        
    })

    

  })
  