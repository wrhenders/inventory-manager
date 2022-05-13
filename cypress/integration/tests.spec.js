describe("Startup Tests", () => {
  it("Visits the Home Page", () => {
    cy.visit("http://localhost:3000");
  });
  it("Visits the New Page", () => {
    cy.visit("http://localhost:3000/items/new");
  });
  it("Visits the List Page", () => {
    cy.visit("http://localhost:3000/items/list");
  });
  it("Visits the Cities Pages", () => {
    cy.visit("http://localhost:3000/city/Chicago");
    cy.visit("http://localhost:3000/city/Seattle");
    cy.visit("http://localhost:3000/city/New_York_City");
    cy.visit("http://localhost:3000/city/Atlanta");
    cy.visit("http://localhost:3000/city/Los_Angeles");
  });
});

describe("Create New Item", () => {
  it("Visits the Home Page", () => {
    cy.visit("http://localhost:3000");
  });
  it("Clicks New Item", () => {
    cy.contains("New Item").click();
  });
  it("Fills out the form and submits", () => {
    cy.get("#name").should("be.visible").type("Test Book");
    cy.get("#author").should("be.visible").type("John Doe");
    cy.get("#description").should("be.visible").type("Lorem Ipsum blah");
    cy.get("#quantity").should("be.visible").type("10");
    cy.get("select").should("be.visible").select("Atlanta");
    cy.get("button[type='submit']").should("be.visible").click();
  });
});

describe("Create Duplicate Item adds to count", () => {
  it("Visits the Home Page", () => {
    cy.visit("http://localhost:3000");
  });
  it("Clicks New Item", () => {
    cy.contains("New Item").click();
  });
  it("Fills out the form and submits", () => {
    cy.get("#name").should("be.visible").type("Test Book");
    cy.get("#author").should("be.visible").type("John Doe");
    cy.get("#description").should("be.visible").type("Lorem Ipsum blah");
    cy.get("#quantity").should("be.visible").type("20");
    cy.get("select").should("be.visible").select("Atlanta");
    cy.get("button[type='submit']").should("be.visible").click();
  });
  it("Confirms item quantity added", () => {
    cy.visit("http://localhost:3000/city/Atlanta");
    cy.contains("Test Book").should("be.visible").parents("tr").contains("30");
  });
});

describe("Check Empty Item Submittal", () => {
  it("Visits the New Item Page", () => {
    cy.visit("http://localhost:3000/items/new");
  });

  it("Fills out part of the form and submits", () => {
    cy.get("#name").should("be.visible").type("Test Book 2");

    cy.get("button[type='submit']").should("be.visible").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("All entries must be filled and valid");
    });
  });
});

describe("Check Too Long Item Submittal", () => {
  it("Visits the New Item Page", () => {
    cy.visit("http://localhost:3000/items/new");
  });

  it("Fills out too long of a description and submits", () => {
    const longStr = "a".repeat(501);
    cy.get("#name").should("be.visible").type("Test Book 2");
    cy.get("#author").should("be.visible").type("John Doe");
    cy.get("#description").should("be.visible").type(longStr);
    cy.get("#quantity").should("be.visible").type("88");
    cy.get("select").should("be.visible").select("Atlanta");

    cy.get("button[type='submit']").should("be.visible").click();
    cy.on("window:alert", (str) => {
      expect(str).to.equal("All entries must be filled and valid");
    });
  });
});

describe("Deletes Test Item", () => {
  it("Visits the Atlanta Page", () => {
    cy.visit("http://localhost:3000/city/Atlanta");
  });

  it("Finds the Test Item and deletes it", () => {
    cy.contains("Test Book")
      .should("be.visible")
      .parents("tr")
      .contains("button", "Remove")
      .click();
    cy.contains("Test Book").should("not.exist");
  });
});
