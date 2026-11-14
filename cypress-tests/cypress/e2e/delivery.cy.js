const tid = (id) => `[data-testid="${id}"]`;

describe('Dashboard - create delivery', () => {
  beforeEach(() => {
    cy.request('POST', '/api/v1/reset');
    cy.login();
  });

  it('business successfully creates a delivery', () => {
    const dropoffAddress = `12 Admiralty Way, Lekki ${Date.now()}`;

    cy.get(tid('pickup-name')).type('Ada Store');
    cy.get(tid('pickup-phone')).type('08031234567');
    cy.get(tid('pickup-address')).type('5 Allen Avenue, Ikeja');
    cy.get(tid('dropoff-name')).type('Chidi Okafor');
    cy.get(tid('dropoff-phone')).type('08037654321');
    cy.get(tid('dropoff-address')).type(dropoffAddress);
    cy.get(tid('package-description')).type('Box of books');
    cy.get(tid('package-weight')).type('2');
    cy.get(tid('delivery-submit')).click();

    // Fee = 1500 + 200 x 2kg = 1900
    cy.get(tid('delivery-success'))
      .should('contain.text', 'created')
      .and('contain.text', '1,900.00');
    cy.get(tid('delivery-error')).should('be.empty');
    cy.contains(`${tid('delivery-row')}`, dropoffAddress).should('exist');
  });

  it('shows validation errors when required fields are missing', () => {
    cy.get(tid('delivery-submit')).click();

    const expected = {
      'pickup-name-error': 'Pickup name is required',
      'pickup-phone-error': 'Pickup phone is required',
      'pickup-address-error': 'Pickup address is required',
      'dropoff-name-error': 'Drop-off name is required',
      'dropoff-phone-error': 'Drop-off phone is required',
      'dropoff-address-error': 'Drop-off address is required',
      'package-description-error': 'Package description is required',
      'package-weight-error': 'Weight is required',
    };
    Object.entries(expected).forEach(([id, msg]) => {
      cy.get(tid(id)).should('have.text', msg);
    });
    cy.get(tid('delivery-success')).should('be.empty');
  });
});
