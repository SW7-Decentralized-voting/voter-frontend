function enterKey() {
	cy.get('.key-input').type('password');
	cy.get('.key-input').type('{enter}');
	cy.visit('/voting');
}

describe('Voting Page Layout', () => {
	const apiBaseUrl = Cypress.env('BACKEND_URL');
	beforeEach(() => {
		cy.visit('/login');
		enterKey();
	});


	it('should correctly display the voting page', () => {
		cy.get('div .header > h1').should('have.text', 'Folketingsvalget 20xx');
	});

	it('should display the parties', () => {
		const parties = ['Nordlisten', 'Sydlisten', 'Østpartiet', 'Vestpartiet', 'Uden for partierne'];
		cy.visit('/voting');
		cy.get('div .party-container').should('have.length', 5).as('parties');
		cy.get('@parties').each((party, index) => {
			cy.wrap(party).children().eq(0).should('have.text', parties[index]);
		});
	});

	it('should display the candidates for each party', () => {
		cy.visit('/voting');
		cy.get('div .candidate-list').as('candidates');
		cy.get('@candidates').should('have.length.above', 0);
	});
});