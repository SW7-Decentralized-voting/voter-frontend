describe('Voting Page Layout', () => {
	const apiBaseUrl = Cypress.env('BACKEND_URL');
	beforeEach(() => {
		cy.intercept('GET', apiBaseUrl + '/voting', {});
		cy.intercept('GET', apiBaseUrl + '/parties', { fixture: 'parties.json' }).as('getParties');

		cy.intercept('GET', apiBaseUrl + '/candidates?party=1', { fixture: 'candidates.json' });
		cy.intercept('GET', apiBaseUrl + '/candidates?party=2', { fixture: 'candidates2.json' });
		cy.intercept('GET', apiBaseUrl + '/candidates?party=3', { fixture: 'candidates3.json' });
		cy.intercept('GET', apiBaseUrl + '/candidates?party=4', { fixture: 'candidates4.json' });
		cy.intercept('GET', apiBaseUrl + '/candidates?party=5', { fixture: 'candidates5.json' });
	});


	it('should correctly display the voting page', () => {
		cy.visit('/voting');
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

	it('should display the candidates for each party', async () => {
		const candidates = await cy.fixture('candidatesAll.json');

		cy.visit('/voting');
		cy.get('div .candidate-list').as('candidates');
		cy.get('@candidates').each((candidateList, index) => {
			cy.wrap(candidateList).children().should('have.length', candidates.filter((candidate) => candidate.party === index + 1).length);
		});
	});
});