describe('Voting Page Layout', () => {
	beforeEach(() => {
		cy.window().then((win) => {
			win.sessionStorage.setItem('jwt', 'mock-jwt-token');
		});

    cy.visit('/voting');
	});

	it('should correctly display the voting page', () => {
		cy.get('div .header > h1').should('have.text', 'Folketingsvalget 20xx');
	});

	it('should display the parties', () => {
		cy.visit('/voting');
		cy.get('div .party-container').should('have.length.above', 0).as('parties');
		cy.get('@parties').each((party) => {
			cy.wrap(party).children().eq(0).invoke('text').should('match', /.+/);
		});
	});

	it('should display the candidates for each party', () => {
		cy.visit('/voting');
		cy.get('div .candidate-list').as('candidates');
		cy.get('@candidates').should('have.length.above', 0);
	});

  it('should have the correct JWT token in sessionStorage', () => {
		cy.window().then((win) => {
			const jwt = win.sessionStorage.getItem('jwt');
			expect(jwt).to.equal('mock-jwt-token');
		});
	});
});